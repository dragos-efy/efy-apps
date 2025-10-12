// LOCK SCREEN
$add('div', {id: 'lockScreen'}, [
  ['div', {id: 'lockCard', role: 'dialog', 'aria-modal': 'true', efy_card: ''}, [
    ['h2', 'EFY PASS - DEMO'],
    ['p', {class: 'muted'}, 'Encrypt local offline data \n(AES-256-GCM, PBKDF2, 100k iterations, SHA-256 salt)'],
    ['div', {id: 'unlockRow'}, [
      ['div', {class: 'input_private'}, [
        ['input', {id: 'unlockPassword', type: 'password', maxlength: '300', placeholder: 'App password (max 300 chars)'}],
        ['button', {id: 'toggleUnlock', title: 'Show / Hide'}, [['i', {efy_icon: 'circle2'}]]]
      ]],
      ['button', {id: 'unlockBtn', class: 'iconBtn primary'}, 'Unlock'],
      ['button', {class: 'tool', onclick: 'importData()'}, 'Import'],
      ['button', {class: 'tool warn', onclick: 'deleteDatabase()'}, 'Delete DB']
    ]],
    ['small', {class: 'note'}, 'Press Enter to submit']
  ]]
])

// APP
$add('div', {id: 'app'}, [
  ['div', {id: 'main'}, [
    ['aside', {id: 'sidebar', class: 'efy-glass'}, [
      ['div', {id: 'topBar'}, [
        ['button', {class: 'tool', onclick: 'newItem()'}, 'New'],
        ['button', {class: 'tool', onclick: 'exportData()'}, 'Export'],
        ['button', {class: 'tool', onclick: 'importData(); lock()'}, 'Import'],
        ['button', {class: 'tool', onclick: 'lock()'}, 'Lock'],
        ['button', {class: 'tool', onclick: 'changePassword()'}, 'Change Password'],
        ['button', {class: 'tool warn', onclick: 'deleteDatabase()'}, 'Delete DB']
      ]],
      ['div', {class: 'sectionTitle'}, 'Items'],
      ['div', {id: 'itemList'}],
      ['div', {id: 'storageInfo'}, 'Storage: calculating...']
    ]],
    ['main', {id: 'content'}, [
      ['div', {id: 'itemDetails'}, [['p', 'Select or create an item...']]]
    ]]
  ]]
])

$add('input', {id: 'fileInput', type: 'file', style: 'display:none', multiple: true})

$add('div', {id: 'popup', class: 'efy-glass'}, [
  ['div', {class: 'container'}, [
    ['button', {id: 'popupClose', onclick: 'closePopup()'}, 'X'],
    ['div', {id: 'popupContent'}]
  ]]
])

$add('footer', {id: 'debug'})


/* ======= Globals & initial state ======= */
const DB_NAME = "PasswordManagerDB_v1";
let db = null;
let currentKey = null;
let currentPasswordHash = null;
let activeTotpTimer = null;
let visibilityPrefs = {}; // persisted map of field->boolean (true = shown)
const DEFAULT_VISIBILITY = {
  name:true,password:false,email:false,phone:false,address:false,notes:false,tags:true,url:true,
  cardName:false,cardNumber:false,cardDate:false,cardCvv:false,totpSecret:false,totpDigits:true,totpPeriod:true,file:true
};
const FILE_TEXT_EXT = ["txt","md","css","js","html","json","sh"];

/* ======= IndexedDB helpers ======= */
function openDB(){
  return new Promise((res,rej)=>{
    const req = indexedDB.open(DB_NAME,1);
    req.onupgradeneeded = e=>{
      const d = e.target.result;
      if(!d.objectStoreNames.contains("items")) d.createObjectStore("items",{keyPath:"id",autoIncrement:true});
      if(!d.objectStoreNames.contains("settings")) d.createObjectStore("settings",{keyPath:"key"});
    };
    req.onsuccess = e => { db = e.target.result; res(); };
    req.onerror = e => rej(e);
  });
}
function tx(store, mode="readonly"){ return db.transaction(store, mode).objectStore(store); }
function saveSetting(key, value){
  return new Promise((res,rej)=>{
    const t = db.transaction("settings","readwrite");
    t.objectStore("settings").put({key, value});
    t.oncomplete = ()=> res();
    t.onerror = e => rej(e);
  });
}
function getSetting(key){
  return new Promise((res,rej)=>{
    const r = db.transaction("settings","readonly").objectStore("settings").get(key);
    r.onsuccess = ()=> res(r.result ? r.result.value : null);
    r.onerror = e => rej(e);
  });
}

/* ======= Crypto helpers ======= */
async function hashPassword(pass){
  const enc = new TextEncoder().encode(pass);
  return crypto.subtle.digest("SHA-256", enc);
}
async function deriveKey(password){
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name:"PBKDF2", salt: enc.encode("offline_pm_salt_v1"), iterations:150000, hash:"SHA-256" },
    baseKey,
    { name:"AES-GCM", length:256 },
    false,
    ["encrypt","decrypt"]
  );
}
async function encryptData(obj){
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(obj));
  const cipher = await crypto.subtle.encrypt({name:"AES-GCM", iv}, currentKey, data);
  return { iv:Array.from(iv), data:Array.from(new Uint8Array(cipher)) };
}
async function decryptData(encObj){
  const iv = new Uint8Array(encObj.iv);
  const data = new Uint8Array(encObj.data);
  const plain = await crypto.subtle.decrypt({name:"AES-GCM", iv}, currentKey, data);
  return JSON.parse(new TextDecoder().decode(plain));
}

/* ======= Storage operations ======= */
async function addItemPlain(item){
  const enc = await encryptData(item);
  return new Promise((res,rej)=>{
    const t = db.transaction("items","readwrite");
    t.objectStore("items").put(enc);
    t.oncomplete = ()=> { updateStorageUsage(); res(); };
    t.onerror = e => rej(e);
  });
}
function getAllRaw(){
  return new Promise((res,rej)=>{
    const req = db.transaction("items","readonly").objectStore("items").getAll();
    req.onsuccess = ()=> res(req.result || []);
    req.onerror = e => rej(e);
  });
}
async function getAllDecrypted(){
  const raws = await getAllRaw();
  const out = [];
  for(const r of raws){
    try{
      const data = await decryptData(r);
      out.push({ id: r.id, data });
    }catch(e){
      // decryption failed (wrong key) — skip
    }
  }
  return out;
}
function getRawById(id){
  return new Promise((res,rej)=>{
    const req = db.transaction("items","readonly").objectStore("items").get(Number(id));
    req.onsuccess = ()=> res(req.result);
    req.onerror = e => rej(e);
  });
}
function deleteItem(id){
  return new Promise((res,rej)=>{
    const t = db.transaction("items","readwrite");
    t.objectStore("items").delete(Number(id));
    t.oncomplete = ()=> { updateStorageUsage(); res(); };
    t.onerror = e => rej(e);
  });
}

/* ======= UI: item list rendering ======= */
async function renderItemList(){
  const list = $("#itemList");
  list.innerHTML = "";
  const raws = await getAllRaw();
  for(const r of raws){
    const div = document.createElement("div");
    div.className = "item";
    div.dataset.id = r.id;
    try{
      // attempt to decrypt name for display
      const dec = await decryptData(r);
      div.textContent = dec.name || "(no name)";
    }catch{
      div.textContent = "Locked item";
    }
    div.onclick = async ()=>{
      Array.from(list.children).forEach(c=>c.classList.remove("active"));
      div.classList.add("active");
      try{
        const dec = await decryptData(r);
        await selectItem(r.id, dec);
      }catch(err){
        alert("Cannot decrypt item with current key.");
      }
    };
    list.appendChild(div);
  }
  updateStorageUsage();
}

/* ======= Utilities ======= */
function el(id){ return document.getElementById(id); }
function formatDateISOtoLocal(iso){
  if(!iso) return "";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2,'0');
  const min = String(d.getMinutes()).padStart(2,'0');
  return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
}
function copyText(t){ navigator.clipboard.writeText(t || ""); }

/* ======= Visibility prefs (global show/hide per field) ======= */
async function loadVisibility(){
  const v = await getSetting("visibility");
  visibilityPrefs = v || {...DEFAULT_VISIBILITY};
}
async function saveVisibility(){ await saveSetting("visibility", visibilityPrefs); }
function applyVisibilityToDOM(){
  // inputs have data-field attribute
  $all("[data-field]").forEach(elm=>{
    const f = elm.dataset.field;
    const show = !!visibilityPrefs[f];
    if(elm.tagName === "INPUT" || elm.tagName === "TEXTAREA"){
      // for sensitive fields we toggle type password/text; for others leave as text but still toggle (user wanted to hide)
      const isSensitive = ["password","cardNumber","cardCvv","totpSecret","email","phone","address"].includes(f);
      if(isSensitive){
        elm.type = show ? "text" : "password";
      } else {
        elm.type = "text";
      }
    }
    // update associated toggle button text if present
    const parent = elm.closest(".row");
    if(parent){
      const btn = parent.querySelector(".toggleFieldVis");
      if(btn) btn.textContent = show ? "Hide" : "Show";
    }
  });
}

/* ======= TOTP helpers (correct HMAC import) ======= */
function parseOtpAuth(raw){
  if(!raw) return null;
  const s = raw.trim();
  if(s.toLowerCase().startsWith("otpauth://")){
    try{
      const u = new URL(s);
      const params = new URLSearchParams(u.search);
      return {
        secret: params.get("secret"),
        digits: parseInt(params.get("digits")||"6",10),
        period: parseInt(params.get("period")||"30",10)
      };
    }catch(e){
      return null;
    }
  } else {
    return { secret: s };
  }
}
function base32ToUint8Array(base32){
  const alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  base32 = (base32||"").replace(/=+$/,"").toUpperCase().replace(/[^A-Z2-7]/g,"");
  let bits="";
  for(const ch of base32){
    const val = alphabet.indexOf(ch);
    if(val<0) continue;
    bits += val.toString(2).padStart(5,"0");
  }
  const bytes=[];
  for(let i=0;i+8<=bits.length;i+=8) bytes.push(parseInt(bits.substr(i,8),2));
  return new Uint8Array(bytes);
}
async function generateTOTP(secret, digits=6, period=30, now=Date.now()){
  if(!secret) return "";
  try{
    const keyBytes = base32ToUint8Array(secret);
    const counter = Math.floor(now/1000/period);
    const counterBuf = new ArrayBuffer(8);
    const view = new DataView(counterBuf);
    view.setUint32(4, counter);
    const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, { name:"HMAC", hash: { name:"SHA-1" } }, false, ["sign"]);
    const sig = await crypto.subtle.sign("HMAC", cryptoKey, counterBuf);
    const bytes = new Uint8Array(sig);
    const offset = bytes[bytes.length - 1] & 0xf;
    const bin = ((bytes[offset] & 0x7f) << 24) | ((bytes[offset+1] & 0xff) << 16) | ((bytes[offset+2] & 0xff) << 8) | (bytes[offset+3] & 0xff);
    const otp = (bin % Math.pow(10, digits)).toString().padStart(digits, '0');
    return otp;
  }catch(e){
    return "";
  }
}

/* ======= File helpers (store as {name,type,data:Array}) ======= */
function fileObjectFromFile(file){
  return new Promise((res)=>{
    const reader = new FileReader();
    reader.onload = ()=> {
      const arr = new Uint8Array(reader.result);
      res({ name: file.name, type: file.type || (file.name.split('.').pop()||''), data: Array.from(arr) });
    };
    reader.readAsArrayBuffer(file);
  });
}
function blobURLFromFileObj(f){
  return URL.createObjectURL(new Blob([new Uint8Array(f.data)], { type: f.type || "application/octet-stream" }));
}
function isTextFile(f){
  const ext = (f.name.split('.').pop()||"").toLowerCase();
  return FILE_TEXT_EXT.includes(ext);
}
function renderFileEntry(fileObj, index, filesArray, container){
  const row = document.createElement("div");
  row.style.display="flex"; row.style.gap="8px"; row.style.alignItems="center"; row.style.marginBottom="6px";
  const nameDiv = document.createElement("div"); nameDiv.className="fileLabel"; nameDiv.textContent = fileObj.name;
  row.appendChild(nameDiv);

  // preview for images
  if((fileObj.type || "").startsWith("image/")){
    const img = document.createElement("img"); img.src = blobURLFromFileObj(fileObj);
    img.style.maxWidth="56px"; img.style.cursor="pointer"; img.onclick = ()=> showPopup(`<img src="${img.src}" style="max-width:100%;height:auto">`);
    row.appendChild(img);
  } else if((fileObj.type || "").startsWith("video/")){
    const btn = document.createElement("button"); btn.textContent = "Play";
    btn.onclick = ()=> showPopup(`<video controls src="${blobURLFromFileObj(fileObj)}" style="max-width:100%;height:auto"></video>`);
    row.appendChild(btn);
  } else if((fileObj.type || "").startsWith("audio/")){
    const audio = document.createElement("audio"); audio.controls = true; audio.src = blobURLFromFileObj(fileObj); audio.style.maxWidth="240px";
    row.appendChild(audio);
  } else if(isTextFile(fileObj)){
    const btn = document.createElement("button"); btn.textContent = "Open";
    btn.onclick = ()=> {
      const txt = new TextDecoder().decode(new Uint8Array(fileObj.data));
      showPopup(`<pre class="codeView">${escapeHtml(txt)}</pre>`);
    };
    row.appendChild(btn);
  }

  const dl = document.createElement("button"); dl.textContent = "Download"; dl.onclick = ()=> {
    const a = document.createElement("a");
    a.href = blobURLFromFileObj(fileObj);
    a.download = fileObj.name;
    a.click();
  };
  const rm = document.createElement("button"); rm.textContent = "Remove"; rm.onclick = ()=>{
    filesArray.splice(index,1);
    container.removeChild(row);
    // re-render indexes
    while(container.firstChild) container.removeChild(container.firstChild);
    filesArray.forEach((f,i)=>renderFileEntry(f,i,filesArray,container));
  };
  row.appendChild(dl); row.appendChild(rm);
  container.appendChild(row);
}
function escapeHtml(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function showPopup(innerHtml){ $("#popupContent").innerHTML = innerHtml; $("#popup").style.display = "flex"; }
function closePopup(){ $("#popup").style.display = "none"; $("#popupContent").innerHTML = ""; }

/* ======= Item view & editing ======= */
function makeLabeledField(labelText, fieldKey, opts={}){
  // opts: {type, textarea, value, sensitive}
  const row = document.createElement("div"); row.className = "row";
  const label = document.createElement("label"); label.textContent = labelText;
  const input = opts.textarea ? document.createElement("textarea") : document.createElement("input");
  input.dataset.field = fieldKey;
  input.style.minWidth = "0";
  if(!opts.textarea){
    input.type = opts.type || "text";
  }
  input.value = opts.value || "";
  const controls = document.createElement("div"); controls.className = "fieldControls";
  const copyBtn = document.createElement("button"); copyBtn.className="smallBtn"; copyBtn.textContent="Copy";
  copyBtn.onclick = ()=> copyText(input.value);
  controls.appendChild(copyBtn);

  if(opts.sensitive){
    const toggle = document.createElement("button"); toggle.className="smallBtn toggleFieldVis";
    toggle.textContent = (visibilityPrefs[fieldKey] ? "Hide" : "Show");
    toggle.onclick = ()=> {
      visibilityPrefs[fieldKey] = !visibilityPrefs[fieldKey];
      saveVisibility();
      applyVisibilityToDOM();
    };
    controls.insertBefore(toggle, copyBtn);
  }

  row.appendChild(label);
  row.appendChild(input);
  row.appendChild(controls);
  return { row, input, controls };
}

async function selectItem(id, data){
  // clear existing totp timer
  if(activeTotpTimer) { clearInterval(activeTotpTimer); activeTotpTimer = null; }
  currentItemId = id;
  const c = $("#itemDetails");
  c.innerHTML = "";

  // top: title + copy all
  const top = document.createElement("div"); top.className = "topButtons";
  const title = document.createElement("div"); title.textContent = data.name || "(no name)"; title.style.fontSize="18px"; title.style.fontWeight="600";
  top.appendChild(title);
  const copyAllBtn = document.createElement("button"); copyAllBtn.className="tool copyAll"; copyAllBtn.textContent="Copy All Fields";
  copyAllBtn.onclick = ()=> {
    const lines = [];
    for(const key of Object.keys(data)){
      if(key==="fileData" || key==="files") continue;
      lines.push(`${key}: ${data[key]}`);
    }
    copyText(lines.join("\n"));
  };
  top.appendChild(copyAllBtn);
  c.appendChild(top);

  // fields
  const nameFld = makeLabeledField("Name","name",{type:"text", value:data.name});
  const passwordFld = makeLabeledField("Password","password",{type:"password", value:data.password, sensitive:true});
  const urlFld = makeLabeledField("URL","url",{type:"text", value:data.url});
  const tagsFld = makeLabeledField("Tags","tags",{type:"text", value:data.tags});
  const notesFld = makeLabeledField("Notes","notes",{textarea:true, value:data.notes});
  const emailFld = makeLabeledField("Email","email",{type:"text", value:data.email, sensitive:true});
  const phoneFld = makeLabeledField("Phone","phone",{type:"text", value:data.phone, sensitive:true});
  const addressFld = makeLabeledField("Address","address",{textarea:true, value:data.address, sensitive:true});
  c.appendChild(nameFld.row);
  c.appendChild(passwordFld.row);
  c.appendChild(urlFld.row);
  c.appendChild(tagsFld.row);
  c.appendChild(notesFld.row);
  c.appendChild(emailFld.row);
  c.appendChild(phoneFld.row);
  c.appendChild(addressFld.row);

  // Card fields
  const cardNameFld = makeLabeledField("Card Name","cardName",{type:"text", value:data.cardName});
  const cardNumberFld = makeLabeledField("Card Number","cardNumber",{type:"password", value:data.cardNumber, sensitive:true});
  const cardDateFld = makeLabeledField("Card Date","cardDate",{type:"month", value:data.cardDate});
  const cardCvvFld = makeLabeledField("CVV","cardCvv",{type:"password", value:data.cardCvv, sensitive:true});
  c.appendChild(document.createElement("hr"));
  c.appendChild(cardNameFld.row);
  c.appendChild(cardNumberFld.row);
  c.appendChild(cardDateFld.row);
  c.appendChild(cardCvvFld.row);

  // Files - multiple
  c.appendChild(document.createElement("hr"));
  const fileTitle = document.createElement("div"); fileTitle.className="sectionTitle"; fileTitle.textContent="Files";
  c.appendChild(fileTitle);
  const files = data.files || [];
  const filesContainer = document.createElement("div");
  filesContainer.style.display="flex"; filesContainer.style.flexDirection="column";
  files.forEach((f,i)=>renderFileEntry(f,i,files,filesContainer));
  c.appendChild(filesContainer);

  const fileInput = document.createElement("input"); fileInput.type="file"; fileInput.multiple = true;
  fileInput.onchange = async (ev)=>{
    for(const f of ev.target.files){
      const fo = await fileObjectFromFile(f);
      files.push(fo);
    }
    // re-render
    filesContainer.innerHTML = "";
    files.forEach((f,i)=>renderFileEntry(f,i,files,filesContainer));
  };
  c.appendChild(fileInput);
  const downloadAllBtn = document.createElement("button"); downloadAllBtn.textContent="Download All"; downloadAllBtn.className="smallBtn";
  downloadAllBtn.onclick = ()=> {
    files.forEach(f=>{ const a=document.createElement("a"); a.href = blobURLFromFileObj(f); a.download = f.name; a.click(); });
  };
  c.appendChild(downloadAllBtn);

  // TOTP
  c.appendChild(document.createElement("hr"));
  const totpTitle = document.createElement("div"); totpTitle.className="sectionTitle"; totpTitle.textContent="TOTP (One-time codes)";
  c.appendChild(totpTitle);
  const totpSecretFld = makeLabeledField("TOTP Secret / URI","totpSecret",{type:"text", value:data.totpSecret, sensitive:true});
  const totpDigitsFld = makeLabeledField("Digits","totpDigits",{type:"number", value:data.totpDigits || 6});
  const totpPeriodFld = makeLabeledField("Period (sec)","totpPeriod",{type:"number", value:data.totpPeriod || 30});
  c.appendChild(totpSecretFld.row);
  c.appendChild(totpDigitsFld.row);
  c.appendChild(totpPeriodFld.row);

  const totpRow = document.createElement("div"); totpRow.className="row";
  const totpLabel = document.createElement("label"); totpLabel.textContent = "Current Code";
  const totpBox = document.createElement("div"); totpBox.style.display="flex"; totpBox.style.alignItems="center"; totpBox.style.gap="8px";
  const totpCodeSpan = document.createElement("div"); totpCodeSpan.style.fontFamily="monospace"; totpCodeSpan.style.fontSize="20px";
  const totpCopy = document.createElement("button"); totpCopy.className="smallBtn"; totpCopy.textContent="Copy"; totpCopy.onclick = ()=> copyText(totpCodeSpan.textContent);
  totpBox.appendChild(totpCodeSpan); totpBox.appendChild(totpCopy);
  totpRow.appendChild(totpLabel); totpRow.appendChild(totpBox);
  c.appendChild(totpRow);

  // created
  const createdRow = document.createElement("div"); createdRow.className="row";
  const createdLabel = document.createElement("label"); createdLabel.textContent = "Created";
  const createdVal = document.createElement("div"); createdVal.textContent = formatDateISOtoLocal(data.created || new Date().toISOString()); createdVal.className="muted";
  createdRow.appendChild(createdLabel); createdRow.appendChild(createdVal);
  c.appendChild(createdRow);

  // actions
  const actions = document.createElement("div"); actions.id="actions";
  const saveBtn = document.createElement("button"); saveBtn.className="tool primary"; saveBtn.textContent="Save";
  const delBtn = document.createElement("button"); delBtn.className="tool warn"; delBtn.textContent="Delete";
  const dupBtn = document.createElement("button"); dupBtn.className="tool"; dupBtn.textContent="Duplicate";
  const copyAll = document.createElement("button"); copyAll.className="tool"; copyAll.textContent="Copy All";
  actions.appendChild(saveBtn); actions.appendChild(delBtn); actions.appendChild(dupBtn); actions.appendChild(copyAll);
  c.appendChild(actions);

  // apply visibility buttons initial text
  applyVisibilityToDOM();

  // TOTP updater (only while selected)
  async function updateTOTP(){
    const raw = totpSecretFld.input.value.trim();
    let parsed = parseOtpAuth(raw) || { secret: raw, digits: Number(totpDigitsFld.input.value||6), period: Number(totpPeriodFld.input.value||30) };
    if(parsed && parsed.secret){
      const code = await generateTOTP(parsed.secret, parsed.digits||6, parsed.period||30);
      totpCodeSpan.textContent = code || "(invalid)";
    } else {
      totpCodeSpan.textContent = "(no secret)";
    }
  }
  updateTOTP();
  if(activeTotpTimer) clearInterval(activeTotpTimer);
  activeTotpTimer = setInterval(updateTOTP, 1000);

  // Save
  saveBtn.onclick = async ()=>{
    const updated = {
      name: nameFld.input.value,
      password: passwordFld.input.value,
      url: urlFld.input.value,
      tags: tagsFld.input.value,
      notes: notesFld.input.value,
      email: emailFld.input.value,
      phone: phoneFld.input.value,
      address: addressFld.input.value,
      cardName: cardNameFld.input.value,
      cardNumber: cardNumberFld.input.value,
      cardDate: cardDateFld.input.value,
      cardCvv: cardCvvFld.input.value,
      totpSecret: totpSecretFld.input.value,
      totpDigits: Number(totpDigitsFld.input.value||6),
      totpPeriod: Number(totpPeriodFld.input.value||30),
      files,
      created: data.created || new Date().toISOString()
    };
    const enc = await encryptData(updated);
    enc.id = id;
    const t = db.transaction("items","readwrite");
    t.objectStore("items").put(enc);
    t.oncomplete = ()=> {
      renderItemList(); updateStorageUsage();
      $notify('short', 'Saved', null, null, 'check');
    };
  };

  // Delete
  delBtn.onclick = async ()=>{
    if(!confirm("Delete this item?")) return;
    await deleteItem(id);
    c.innerHTML = "<div class='muted'>Item deleted.</div>";
    renderItemList();
  };

  // Duplicate
  dupBtn.onclick = async ()=>{
    const clone = JSON.parse(JSON.stringify({
      name: nameFld.input.value,
      password: passwordFld.input.value,
      url: urlFld.input.value,
      tags: tagsFld.input.value,
      notes: notesFld.input.value,
      email: emailFld.input.value,
      phone: phoneFld.input.value,
      address: addressFld.input.value,
      cardName: cardNameFld.input.value,
      cardNumber: cardNumberFld.input.value,
      cardDate: cardDateFld.input.value,
      cardCvv: cardCvvFld.input.value,
      totpSecret: totpSecretFld.input.value,
      totpDigits: Number(totpDigitsFld.input.value||6),
      totpPeriod: Number(totpPeriodFld.input.value||30),
      files: files.map(f=>({ name:f.name,type:f.type,data:Array.from(f.data) })),
      created: new Date().toISOString()
    }));
    await addItemPlain(clone);
    renderItemList();
    alert("Duplicated");
  };

  copyAll.onclick = ()=> {
    const arr = [
      `Name: ${nameFld.input.value}`,
      `Password: ${passwordFld.input.value}`,
      `URL: ${urlFld.input.value}`,
      `Email: ${emailFld.input.value}`,
      `Phone: ${phoneFld.input.value}`,
      `Address: ${addressFld.input.value}`,
      `Tags: ${tagsFld.input.value}`,
      `Notes: ${notesFld.input.value}`
    ];
    copyText(arr.join("\n"));
  };
}

/* ======= Create new item (blank form) ======= */
function newItem(){
  if(activeTotpTimer){ clearInterval(activeTotpTimer); activeTotpTimer = null; }
  const blank = {
    name: "", password:"", url:"", tags:"", notes:"", email:"", phone:"", address:"",
    cardName:"", cardNumber:"", cardDate:"", cardCvv:"", totpSecret:"", totpDigits:6, totpPeriod:30,
    files: [], created: new Date().toISOString()
  };
  // Use selectItem with id null to show form and then save logic will add new item
  currentItemId = null;
  const c = $("#itemDetails");
  c.innerHTML = "";

  const top = document.createElement("div"); top.className="topButtons";
  const title = document.createElement("div"); title.textContent = "Create New Item"; title.style.fontSize="18px"; title.style.fontWeight="600";
  top.appendChild(title);
  c.appendChild(top);

  // Reuse same field creation
  const nameFld = makeLabeledField("Name","name",{type:"text", value:blank.name});
  const passwordFld = makeLabeledField("Password","password",{type:"password", value:blank.password, sensitive:true});
  const urlFld = makeLabeledField("URL","url",{type:"text", value:blank.url});
  const tagsFld = makeLabeledField("Tags","tags",{type:"text", value:blank.tags});
  const notesFld = makeLabeledField("Notes","notes",{textarea:true, value:blank.notes});
  const emailFld = makeLabeledField("Email","email",{type:"text", value:blank.email, sensitive:true});
  const phoneFld = makeLabeledField("Phone","phone",{type:"text", value:blank.phone, sensitive:true});
  const addressFld = makeLabeledField("Address","address",{textarea:true, value:blank.address});
  c.appendChild(nameFld.row); c.appendChild(passwordFld.row); c.appendChild(urlFld.row); c.appendChild(tagsFld.row);
  c.appendChild(notesFld.row); c.appendChild(emailFld.row); c.appendChild(phoneFld.row); c.appendChild(addressFld.row);

  const cardNameFld = makeLabeledField("Card Name","cardName",{type:"text", value:""});
  const cardNumberFld = makeLabeledField("Card Number","cardNumber",{type:"password", value:"", sensitive:true});
  const cardDateFld = makeLabeledField("Card Date","cardDate",{type:"month", value:""});
  const cardCvvFld = makeLabeledField("CVV","cardCvv",{type:"password", value:"", sensitive:true});
  c.appendChild(document.createElement("hr"));
  c.appendChild(cardNameFld.row); c.appendChild(cardNumberFld.row); c.appendChild(cardDateFld.row); c.appendChild(cardCvvFld.row);

  // Files multiple
  c.appendChild(document.createElement("hr"));
  const fileTitle = document.createElement("div"); fileTitle.className="sectionTitle"; fileTitle.textContent="Files";
  c.appendChild(fileTitle);
  const files = [];
  const filesContainer = document.createElement("div"); filesContainer.style.display="flex"; filesContainer.style.flexDirection="column";
  c.appendChild(filesContainer);
  const fileInput = document.createElement("input"); fileInput.type="file"; fileInput.multiple = true;
  fileInput.onchange = async (ev)=>{
    for(const f of ev.target.files){
      const fo = await fileObjectFromFile(f);
      files.push(fo);
    }
    filesContainer.innerHTML = "";
    files.forEach((f,i)=>renderFileEntry(f,i,files,filesContainer));
  };
  c.appendChild(fileInput);

  // TOTP
  c.appendChild(document.createElement("hr"));
  const totpSecretFld = makeLabeledField("TOTP Secret / URI","totpSecret",{type:"text", value:"", sensitive:true});
  const totpDigitsFld = makeLabeledField("Digits","totpDigits",{type:"number", value:6});
  const totpPeriodFld = makeLabeledField("Period (sec)","totpPeriod",{type:"number", value:30});
  c.appendChild(totpSecretFld.row); c.appendChild(totpDigitsFld.row); c.appendChild(totpPeriodFld.row);
  const totpRow = document.createElement("div"); totpRow.className="row";
  const totpLabel = document.createElement("label"); totpLabel.textContent = "Current Code";
  const totpBox = document.createElement("div"); totpBox.style.display="flex"; totpBox.style.alignItems="center"; totpBox.style.gap="8px";
  const totpCodeSpan = document.createElement("div"); totpCodeSpan.style.fontFamily="monospace"; totpCodeSpan.style.fontSize="20px";
  const totpCopy = document.createElement("button"); totpCopy.className="smallBtn"; totpCopy.textContent="Copy"; totpCopy.onclick = ()=> copyText(totpCodeSpan.textContent);
  totpBox.appendChild(totpCodeSpan); totpBox.appendChild(totpCopy);
  totpRow.appendChild(totpLabel); totpRow.appendChild(totpBox);
  c.appendChild(totpRow);

  // created
  const createdRow = document.createElement("div"); createdRow.className="row";
  const createdLabel = document.createElement("label"); createdLabel.textContent = "Created";
  const createdVal = document.createElement("div"); createdVal.textContent = formatDateISOtoLocal(blank.created); createdVal.className="muted";
  createdRow.appendChild(createdLabel); createdRow.appendChild(createdVal);
  c.appendChild(createdRow);

  // actions
  const actions = document.createElement("div"); actions.id="actions";
  const createBtn = document.createElement("button"); createBtn.className="tool primary"; createBtn.textContent="Create";
  const cancelBtn = document.createElement("button"); cancelBtn.className="tool"; cancelBtn.textContent="Cancel";
  actions.appendChild(createBtn); actions.appendChild(cancelBtn);
  c.appendChild(actions);

  // totp update
  async function updateNewTOTP(){ const p = parseOtpAuth(totpSecretFld.input.value) || { secret: totpSecretFld.input.value, digits: Number(totpDigitsFld.input.value||6), period: Number(totpPeriodFld.input.value||30) }; const code = await generateTOTP(p.secret, p.digits||6, p.period||30); totpCodeSpan.textContent = code || "(invalid)"; }
  updateNewTOTP();
  const newTotpTimer = setInterval(updateNewTOTP, 1000);

  cancelBtn.onclick = ()=>{ clearInterval(newTotpTimer); c.innerHTML = "<div class='muted'>Creation cancelled.</div>"; }
  createBtn.onclick = async ()=>{
    clearInterval(newTotpTimer);
    const obj = {
      name: nameFld.input.value,
      password: passwordFld.input.value,
      url: urlFld.input.value,
      tags: tagsFld.input.value,
      notes: notesFld.input.value,
      email: emailFld.input.value,
      phone: phoneFld.input.value,
      address: addressFld.input.value,
      cardName: cardNameFld.input.value,
      cardNumber: cardNumberFld.input.value,
      cardDate: cardDateFld.input.value,
      cardCvv: cardCvvFld.input.value,
      totpSecret: totpSecretFld.input.value,
      totpDigits: Number(totpDigitsFld.input.value||6),
      totpPeriod: Number(totpPeriodFld.input.value||30),
      files: files.map(f=>({ name:f.name,type:f.type,data:Array.from(f.data) })),
      created: new Date().toISOString()
    };
    await addItemPlain(obj);
    renderItemList();
    c.innerHTML = "<div class='muted'>Item created.</div>";
  };
}

/* ======= Storage usage estimation ======= */
async function updateStorageUsage(){
  try{
    const raws = await getAllRaw();
    let total = 0;
    for(const r of raws) total += JSON.stringify(r).length;
    // attempt to add decrypted file sizes
    for(const r of raws){
      try{
        const dec = await decryptData(r);
        if(dec.files && Array.isArray(dec.files)){
          for(const f of dec.files) if(f.data) total += f.data.length;
        }
      }catch(e){}
    }
    const mb = total / (1024*1024);
    $("#storageInfo").textContent = `Storage: ${mb.toFixed(2)} MB`;
  }catch(e){
    $("#storageInfo").textContent = `Storage: (error)`;
  }
}

/* ======= Import / Export / DB replace ======= */
async function exportData(){
  const raws = await getAllRaw();
  const blob = new Blob([JSON.stringify(raws)], { type:"application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pm_export.enc.json";
  a.click();
}
function importData(){
  const inp = $("#fileInput");
  inp.onchange = async (ev)=>{
    const f = ev.target.files[0];
    if(!f) return;
    const text = await f.text();
    let parsed;
    try{ parsed = JSON.parse(text); }catch(e){ alert("Invalid import file"); return; }
    if(!Array.isArray(parsed)) { alert("Import file format invalid"); return; }
    db.close();
    const del = indexedDB.deleteDatabase(DB_NAME);
    del.onsuccess = async ()=>{
      await openDB();
      const t = db.transaction("items","readwrite");
      const store = t.objectStore("items");
      for(const it of parsed) store.put(it);
      t.oncomplete = ()=>{ renderItemList(); updateStorageUsage(); alert("Imported and database replaced."); };
    };
    del.onerror = ()=> alert("Failed to replace DB during import.");
  };
  inp.click();
}

/* ======= Delete DB ======= */
function deleteDatabase(){
  if(!confirm("Permanently delete the local database? This cannot be undone.")) return;
  db.close();
  const req = indexedDB.deleteDatabase(DB_NAME);
  req.onsuccess = ()=> { alert("Database deleted. Reloading."); location.reload(); };
  req.onerror = ()=> alert("Failed to delete database.");
}

/* ======= Lock/unlock & change password ======= */
async function unlock(){
  const pass = $("#unlockPassword").value || "";
  if(pass.length === 0) { alert("Enter a password."); return; }
  const hash = await hashPassword(pass);
  let stored = await getSetting("passwordHash");
  if(!stored){
    await saveSetting("passwordHash", Array.from(new Uint8Array(hash)));
    stored = Array.from(new Uint8Array(hash));
  }
  if(JSON.stringify(stored) === JSON.stringify(Array.from(new Uint8Array(hash)))){
    currentKey = await deriveKey(pass);
    currentPasswordHash = stored;
    await loadVisibility();
    $("#lockScreen").style.display = "none";
    $("#app").style.display = "block";
    await renderItemList();
    await updateStorageUsage();
  } else {
    alert("Wrong password");
  }
}
function lock(){
  currentKey = null;
  if(activeTotpTimer){ clearInterval(activeTotpTimer); activeTotpTimer = null; }
  $("#unlockPassword").value = "";
  $("#lockScreen").style.display = "flex";
  $("#app").style.display = "none";
}

/* Re-encrypt items with new password */
async function changePassword(){
  const newPass = prompt("Enter new password (leave blank to cancel):");
  if(!newPass) return;
  const newKey = await deriveKey(newPass);
  const raws = await getAllRaw();
  for(const r of raws){
    try{
      const dec = await decryptData(r); // decrypt with old key
      // encrypt with new key: use temp crypto operations
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const data = new TextEncoder().encode(JSON.stringify(dec));
      const encBuf = await crypto.subtle.encrypt({ name:"AES-GCM", iv }, newKey, data);
      const encObj = { iv:Array.from(iv), data:Array.from(new Uint8Array(encBuf)), id: r.id };
      // put back
      await new Promise((res,rej)=>{
        const t = db.transaction("items","readwrite");
        t.objectStore("items").put(encObj);
        t.oncomplete = ()=> res();
        t.onerror = e => rej(e);
      });
    }catch(e){
      // can't decrypt this item (skip)
    }
  }
  const newHash = await hashPassword(newPass);
  await saveSetting("passwordHash", Array.from(new Uint8Array(newHash)));
  currentKey = await deriveKey(newPass);
  await saveVisibility();
  await renderItemList();
  alert("Password changed.");
}

/* ======= Misc UI wiring ======= */
$("#unlockBtn").addEventListener("click", unlock);
$('#toggleUnlock').addEventListener("click", ()=>{
  const inp = $("#unlockPassword");
  if (inp.type === "password"){
    inp.type = "text"; $('#toggleUnlock i').setAttribute('efy_icon', 'circle');
  }
  else {
    inp.type = "password"; $('#toggleUnlock i').setAttribute('efy_icon', 'circle2');
  }
});
$("#unlockPassword").addEventListener("keydown", (e)=>{ if(e.key === "Enter") unlock(); });

/* ======= Init ======= */
(async function init(){
  await openDB();
  // load visibility prefs (if any)
  await loadVisibility();
  // show storage usage (will update after unlocking)
  updateStorageUsage();
})();

$wait(5, ()=>{
  $add('div', {class: 'card', efy_card: ''}, [
    ['div', {class: 'visa_logo'}, [
      ['div', {class: 'chip'}]
    ]],
    ['div', {class: 'visa_info'}, [
      ['div', {class: 'chip'}],
      ['p', '4586 7985 9271 6388']
    ]],
    ['div', {class: 'visa_crinfo'}, [
      ['p', '02/12'],
      ['p', 'Cool Name']
    ]]
  ], $('[data-field="cardName"]').closest('.row'), 'beforebegin');
});