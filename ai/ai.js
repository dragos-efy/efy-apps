$add('div', {class: 'app'}, [
  ['aside', {class: 'sidebar efy-glass'}, [

    ['div', {class: 'nav'}, [
        ['button', {id: 'newChat', class: 'efy_square_btn'}, [['i', {efy_icon: 'plus'}], ['p', 'New']]],
        ['div', {class: 'buttons'}, [
            ['button', {id: 'search_toggle', class: 'efy_square_btn efy_color_trans', efy_toggle: '#search, .controls, .settings'}, [['i', {efy_icon: 'search'}]] ],
            ['button', {class: 'efy_square_btn efy_quick_fullscreen efy_color_trans'}, [['i', {efy_icon: 'fullscreen'}]] ],
            ['button', {efy_sidebar_btn: '', class: 'efy_square_btn efy_color_trans'}, [['i', {efy_icon: 'menu'}]] ]
        ]]
    ]],

    ['input', {id: 'search', class: 'search', placeholder: 'Search chats...'}],
    ['div', {class: 'chats', id: 'chatList'}],
    ['div', {class: 'controls'}, [
      ['button', {id: 'delAll'}, 'Delete all']
    ]],
    ['div', {class: 'settings'}, [
      ['div', {style: 'font-weight:700; margin-bottom:6rem'}, 'Provider'],
      ['select', {id: 'provider'}, [
        ['option', {value: 'lmstudio'}, 'LM Studio (local)'],
        ['option', {value: 'openai'}, 'OpenAI'],
        ['option', {value: 'anthropic'}, 'Anthropic'],
        ['option', {value: 'gemini'}, 'Gemini (via endpoint)']
      ]],
      ['div', {id: 'lm', style: 'display:block'}, [
        ['div', {class: 'small'}, 'URL'],
        ['input', {id: 'lmUrl', placeholder: 'http://localhost:1234'}]
      ]],
      ['div', {id: 'openai', style: 'display:none'}, [
        ['div', {class: 'small'}, 'OpenAI API key'],
        ['input', {id: 'openaiKey', placeholder: 'sk-...'}],
        ['div', {class: 'small', style: 'margin-top:6rem'}, 'Model'],
        ['input', {id: 'openaiModel', placeholder: 'gpt-4o-mini'}]
      ]],
      ['div', {id: 'anthropic', style: 'display:none'}, [
        ['div', {class: 'small'}, 'Anthropic API key'],
        ['input', {id: 'anthropicKey', placeholder: 'api_key'}],
        ['div', {class: 'small', style: 'margin-top:6rem'}, 'Model'],
        ['input', {id: 'anthropicModel', placeholder: 'claude-2.1'}]
      ]],
      ['div', {style: 'display:flex; gap:8rem; margin-top:8rem'}, [
        ['button', {id: 'save'}, 'Save'],
        ['button', {id: 'test'}, 'Test']
      ]],
      ['div', {id: 'status', class: 'small', style: 'margin-top: 8rem'}]
    ]]
  ]],
  ['main', {class: 'main'}, [
    ['div', {id: 'history', class: 'history'}, [
      ['div', {class: 'small'}, 'Select or create a chat.']
    ]],
    ['div', {class: 'control efy-glass'}, [
      ['textarea', {id: 'prompt', class: 'efy_card_filter_off efy_shadow_card_off efy_animations_off', placeholder: 'Message...'}],
      ['div', {class: 'actions'}, [
        ['div', {class: 'start'}, [
          ['div', {class: 'title_actions efy_card_filter'}, [
            ['button', {id: 'export_chat', class: 'efy_square_btn efy_shadow_button_off', title: 'Export'}, [['i', {efy_icon: 'arrow_down'}]] ],
            ['button', {id: 'reset_chat', class: 'efy_square_btn efy_shadow_button_off', title: 'Reset'}, [['i', {efy_icon: 'reload'}]] ],
            ['button', {id: 'delete_chat', class: 'efy_square_btn efy_shadow_button_off', title: 'Delete'}, [['i', {efy_icon: 'remove'}]] ],
            ['button', {id: 'rename', class: 'efy_square_btn efy_shadow_button_off', title: 'Rename'}, [['i', {efy_icon: 'menu2'}]] ],
          ]]
        ]],
          ['div', {class: 'title'}, [
            ['div', {id: 'title', style: 'font-weight:700'}, 'No chat'],
            ['div', {class: 'small', id: 'meta'}]
          ]],
        ['div', {class: 'end'}, [
          ['div', {class: 'title_actions efy_card_filter'}, [
            ['button', {id: 'add_file_chat', class: 'efy_square_btn efy_shadow_button_off', title: 'Add File'}, [['i', {efy_icon: 'plus'}]] ],
            ['button', {id: 'paste_chat', class: 'efy_square_btn efy_shadow_button_off', title: 'Paste'}, [['i', {efy_icon: 'paste'}]] ]
          ]],
          ['button', {id: 'send', class: 'send efy_square_btn'}, [['i', {efy_icon: 'arrow'}]]]
        ]]
      ]]
    ]]
  ]]
]);

const DB = 'local-chat-db', STORE='chats', SET='__settings__';
let idb;
function openDB(){return new Promise((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=e=>{const db=e.target.result; if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE,{keyPath:'id'})}; r.onsuccess=e=>{idb=e.target.result;res()}; r.onerror=e=>rej(e)});}
function tx(store,mode='readonly'){return idb.transaction(store,mode).objectStore(store);}
async function put(obj){return new Promise((r,j)=>{const rq=tx(STORE,'readwrite').put(obj); rq.onsuccess=()=>r(); rq.onerror=e=>j(e)});}
async function getAll(){return new Promise((r,j)=>{const rq=tx(STORE).getAll(); rq.onsuccess=()=>r(rq.result); rq.onerror=e=>j(e)});}
async function getOne(id){return new Promise((r,j)=>{const rq=tx(STORE).get(id); rq.onsuccess=()=>r(rq.result); rq.onerror=e=>j(e)});}
async function del(id){return new Promise((r,j)=>{const rq=tx(STORE,'readwrite').delete(id); rq.onsuccess=()=>r(); rq.onerror=e=>j(e)});}
async function clearAll(){return new Promise((r,j)=>{const rq=tx(STORE,'readwrite').clear(); rq.onsuccess=()=>r(); rq.onerror=e=>j(e)});}

/* State & UI refs */
let state={chats:[],cur:null,settings:{}};
const els = ['chatList','history','title','meta','prompt','send','newChat','delAll','search','provider','lmUrl','openaiKey','openaiModel','anthropicKey','anthropicModel','save','test','status','rename'].reduce((a,id)=>{a[id]=document.getElementById(id);return a},{});
els.prompt=$('#prompt'); els.send=$('#send'); els.newChat=$('#newChat'); els.delAll=$('#delAll'); els.chatList=$('#chatList'); els.history=$('#history'); els.title=$('#title'); els.meta=$('#meta');
const parts={lm:$('#lm'),openai:$('#openai'),anthropic:$('#anthropic')};

let audio = {};
'error pop ok ok2'.split(' ').forEach(x => {
  audio[x] = new Audio(`./efy/audio/${x}.webm`); audio[x].volume = 1
});

/* Utilities */
const uid =()=> crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
const mkChat =(t)=> ({
    id: uid(),title:t||'Chat',
    messages: [],
    created: Date.now(),
    updated: Date.now()
});

function renderList(q=''){
    els.chatList.innerHTML='';
    state.chats.filter(c=>c.title.toLowerCase().includes(q.toLowerCase())).forEach(c=>{
        const btn=document.createElement('div');
        btn.className='chat-btn'+(c.id===state.cur?' active':'');
        btn.onclick=()=>select(c.id);
        const t=document.createElement('div');
        t.textContent=c.title;
        t.style.flex='1';
        t.style.overflow='hidden';
        t.style.whiteSpace='nowrap';
        t.style.textOverflow='ellipsis';
        const del=document.createElement('button');
        del.textContent='×'; del.className='trash efy_card_filter_off';
        del.onclick=(e)=>{e.stopPropagation(); removeChat(c.id)};
        btn.appendChild(t); btn.appendChild(del);
        els.chatList.appendChild(btn)
    });
}

function renderCurrent(){
    const c=state.chats.find(x=>x.id===state.cur);
    if (!c){
        els.title.textContent = 'No chat'; els.meta.textContent='';
        els.history.innerHTML = '<div class="small">Select or create a chat.</div>';
        return;
    }
    els.title.textContent = c.title;
    els.meta.textContent = c.messages.length+' replies';
    els.history.innerHTML = '';
    c.messages.forEach(m =>{
        const d=document.createElement('div');
        d.className = 'message efy-glass ' + (m.role === 'user' ? 'user' : 'ai');
        d.textContent = m.content;
        els.history.appendChild(d);
    });
    els.history.scrollTop = els.history.scrollHeight;
}

/* CRUD */
async function load(){ await openDB(); const all=await getAll(); state.chats=all.filter(a=>a.id!==SET); state.settings=(all.find(a=>a.id===SET)||{}); if(!state.chats.length){ const c=mkChat('Welcome'); c.messages.push({role:'ai',content:'Welcome. Save provider settings to connect a model.'}); await put(c); state.chats=[c]; } state.cur=state.chats[0].id; populateSettings(); renderList(); renderCurrent(); }
async function addChat(){ const c=mkChat('Chat '+(state.chats.length+1)); state.chats.push(c); await put(c); renderList(); select(c.id); }
async function removeChat(id){ if(state.cur===id) state.cur=null; await del(id); state.chats=state.chats.filter(x=>x.id!==id); renderList(); renderCurrent(); }
async function deleteAll(){ if(!confirm('Delete all chats?')) return; await clearAll(); state.chats=[]; state.cur=null; await load(); }
async function select(id){ state.cur=id; renderList(); renderCurrent(); }
async function rename(){ const c=state.chats.find(x=>x.id===state.cur); if(!c) return alert('No chat'); const v=prompt('Rename',c.title); if(v==null) return; c.title=v; c.updated=Date.now(); await put(c); renderList(); renderCurrent(); }

/* Settings UI */
function populateSettings(){ const s=state.settings||{}; $('#provider').value=s.provider||'lmstudio'; $('#lmUrl').value=s.lmUrl||'http://localhost:1234'; $('#openaiKey').value=s.openaiKey||''; $('#openaiModel').value=s.openaiModel||'gpt-4o-mini'; $('#anthropicKey').value=s.anthropicKey||''; $('#anthropicModel').value=s.anthropicModel||'claude-2.1'; toggleParts(); }
function toggleParts(){ const p=$('#provider').value; parts.lm.style.display=p==='lmstudio'?'block':'none'; parts.openai.style.display=p==='openai'?'block':'none'; parts.anthropic.style.display=p==='anthropic'?'block':'none'; }

/* Save settings */
async function saveSettings(){ const s={id:SET,provider:$('#provider').value,lmUrl:$('#lmUrl').value,openaiKey:$('#openaiKey').value,openaiModel:$('#openaiModel').value,anthropicKey:$('#anthropicKey').value,anthropicModel:$('#anthropicModel').value}; state.settings=s; await put(s); els.status.textContent='Saved'; setTimeout(()=>els.status.textContent='',2000); }

/* Test connection (simple) */
async function testConn(){ els.status.textContent='Testing...'; const s=state.settings||{}; try{ if(s.provider==='lmstudio'){ const url=(s.lmUrl||$('#lmUrl').value).replace(/\/$/,'')+'/v1/models'; const r=await fetch(url); if(!r.ok) throw new Error(await r.text()); els.status.textContent='LM Studio reachable'; return;} if(s.provider==='openai'){ if(!s.openaiKey) throw new Error('Missing key'); const r=await fetch('https://api.openai.com/v1/models',{headers:{Authorization:'Bearer '+s.openaiKey}}); if(!r.ok) throw new Error(await r.text()); els.status.textContent='OpenAI key valid'; return;} if(s.provider==='anthropic'){ if(!s.anthropicKey) throw new Error('Missing key'); const r=await fetch('https://api.anthropic.com/v1/models',{headers:{'x-api-key':s.anthropicKey}}); if(!r.ok) throw new Error(await r.text()); els.status.textContent='Anthropic key valid'; return;} els.status.textContent='Unknown provider'; }catch(e){ els.status.textContent='Failed: '+(e.message||e); }}

/* Streaming helpers: parse text/event-stream chunks like "data: {...}\n\n" */
async function streamFetch(url, opts, onChunk){
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(await res.text());
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf='';
  while (true){
    const {value, done} = await reader.read();
    if (done) break;
    buf += decoder.decode(value, {stream:true});
    let parts = buf.split('\n\n');
    buf = parts.pop();
    for (let p of parts){
      if (!p.trim()) continue;
      // lines may be "data: ..." repeated
      const lines = p.split(/\r?\n/).map(l=>l.replace(/^data:\s*/,''));
      for (let line of lines){
        if (line==='[DONE]') return;
        try{ const parsed = JSON.parse(line); onChunk(parsed); }catch(_){ onChunk(line); }
      }
    }
  }
  if (buf.trim()){
    try{ onChunk(JSON.parse(buf)); }catch(_){ onChunk(buf); }
  }
}

/* Build messages array from chat (recent) */
function recentMessages(chat, max=12){ return (chat.messages||[]).slice(-max).map(m=>({role: m.role==='user'?'user':'assistant', content:m.content})); }

/* sendToAI: supports streaming for LM Studio and OpenAI (stream: true) */
async function sendToAI(prompt, chat, onStreamChunk){
  const s = state.settings || {};
  const provider = s.provider || 'lmstudio';
  const messages = recentMessages(chat); messages.push({role:'user', content: prompt});

  if (provider==='lmstudio'){
    const base = (s.lmUrl||$('#lmUrl').value).replace(/\/$/,'');
    const url = base + '/v1/chat/completions';
    const body = {model:'default', messages, temperature:0.7, max_tokens:1024, stream:true};
    // LM Studio OpenAI-like streaming returns text/event-stream with data: JSON chunks
    await streamFetch(url, {method:'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)}, (chunk)=>{
      // chunk is the server object; OpenAI-like chunk often has choices[0].delta.content
      if (chunk.choices && chunk.choices[0]){
        const delta = chunk.choices[0].delta || chunk.choices[0].message || {};
        const txt = delta.content || delta;
        if (typeof txt === 'string') onStreamChunk(txt);
      } else if (chunk.output && typeof chunk.output==='string') onStreamChunk(chunk.output);
    });
    return; // streaming handled via callback
  }

  if (provider==='openai'){
    if (!s.openaiKey) throw new Error('Missing OpenAI key');
    const url='https://api.openai.com/v1/chat/completions';
    const body={model: s.openaiModel||'gpt-4o-mini', messages, temperature:0.7, max_tokens:1024, stream:true};
    await streamFetch(url, {method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+s.openaiKey}, body:JSON.stringify(body)}, (chunk)=>{
      if (chunk.choices && chunk.choices[0]){
        const delta = chunk.choices[0].delta || {};
        if (delta.content) onStreamChunk(delta.content);
      }
    });
    return;
  }

  if (provider==='anthropic'){
    // Anthropic streaming varies. For simplicity use non-streaming completion here.
    if (!s.anthropicKey) throw new Error('Missing Anthropic key');
    const model = s.anthropicModel||'claude-2.1';
    let promptText='';
    for (const m of messages) promptText += (m.role==='user'?'\n\nHuman: ':'\n\nAssistant: ') + m.content;
    promptText += '\n\nAssistant:';
    const resp = await fetch('https://api.anthropic.com/v1/complete', {method:'POST', headers:{'Content-Type':'application/json','x-api-key':s.anthropicKey}, body:JSON.stringify({model, prompt:promptText, max_tokens:512, temperature:0.7, stop_sequences:['\n\nHuman:']})});
    if (!resp.ok) throw new Error(await resp.text());
    const data = await resp.json();
    return data.completion || data.output || JSON.stringify(data);
  }

  // fallback local reply
  await new Promise(r=>setTimeout(r,500));
  return "Local fallback reply: "+prompt.slice(0,200);
}

/* send flow with streaming support */
let inProgress=false;
async function onSend(){
  if (inProgress) return;
  $audio_play(audio.ok);
  const text = els.prompt.value.trim(); if(!text) return;
  const chat = state.chats.find(x=>x.id===state.cur); if(!chat){ alert('Select or create a chat'); return;}
  chat.messages.push({role:'user',content:text,ts:Date.now()}); chat.updated=Date.now(); await put(chat); renderList(); renderCurrent(); els.prompt.value='';

  // add AI placeholder message and keep a reference
  const aiMsg = {role:'ai',content:'',ts:Date.now(),streaming:true}; chat.messages.push(aiMsg); await put(chat); renderCurrent();

  inProgress=true;
  try{
    // streaming path: accumulate tokens and update message
    let acc='';
    const onChunk = (tok)=>{
      acc += tok;
      aiMsg.content = acc;
      // update only the last message in UI for perf
      const messages = els.history.querySelectorAll('.message'); // last is our AI
      if(messages.length) messages[messages.length-1].textContent = acc;
      // also update DB occasionally (throttle)
    };
    const res = await Promise.race([
      (async ()=>{ await sendToAI(text, chat, onChunk); return 'stream_done'; })(),
      new Promise((r)=>setTimeout(()=>r('timeout'),120000)) // 2 min timeout
    ]);
    if (res==='timeout') throw new Error('Time out');
    aiMsg.streaming=false; aiMsg.ts=Date.now(); await put(chat);
    renderCurrent();
    $audio_play(audio.ok2);
  }catch(e){
    aiMsg.content = 'Error: '+(e.message||e); await put(chat); renderCurrent();
    $audio_play(audio.error);
  }finally{ inProgress=false; }
}

/* wire events */
$('#provider').addEventListener('change', toggleParts);
$('#save').addEventListener('click', saveSettings);
$('#test').addEventListener('click', async ()=>{ await saveSettings(); await testConn(); });
els.newChat.addEventListener('click', addChat);
els.delAll.addEventListener('click', deleteAll);
els.send.addEventListener('click', onSend);
els.prompt.addEventListener('keydown',(e)=>{ if((e.ctrlKey||e.metaKey)&&e.key==='Enter') onSend(); });
$('#search').addEventListener('input',(e)=>renderList(e.target.value));
$('#rename').addEventListener('click',rename);

/* initialize */
load();