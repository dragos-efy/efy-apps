/*Storage*/ let  efy_pn = {}, $pn_save =()=>{}; try { if (localStorage.efy_pn){ efy_pn = JSON.parse(localStorage.efy_pn)} $pn_save =()=>{localStorage.efy_pn = JSON.stringify(efy_pn)}} catch {}

/*default data*/ let pn_defaults = ['[{"text": "Goal 1","priority":"high","date":"25/04/2023", "time": "30"}, {"text":"Goal 2","priority":"medium","date":"25/04/2023", "time": "150"}, {"text":"Goal 3","priority":"low","date":"25/04/2023", "time": "45"}, {"text":"Goal 4","priority":"normal","date":"29/06/2023", "time": "0"}, {"text":"Goal 5","priority":"normal","date":"25/04/2023", "time": "600", "done": "true"}]', '[{"text": "Note 1","description":"1","date":"25/04/2023"}, {"text":"Note 2","description":"2","date":"27/06/2023"}]', '[{"text": "EFY Site","url":"https://efy.ooo"}, {"text":"Music","url":"./music.html"}, {"text":"Money","url":"./money.html"}, {"text":"Github","url":"https://github.com/dragos-efy/efy"}]', '[{"text": "Personal"}, {"text": "Work"}, {"text": "Later"}, {"text": "Fun"}]']; 'goals notes links tags'.split(' ').map((a,i)=>{ if (localStorage[`efy_pn_${a}`] === undefined){ localStorage[`efy_pn_${a}`] = pn_defaults[i] }});

/*Variables*/ const pn_modal ={ toggle(){ $('.modal-overlay').classList.toggle('active'); $('.modal_grid #text').focus() } },
/*Convert Month Number to Name*/ month_name = {'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'},

format ={
  date(date){ const split = date.split('-'); return `${split[2]}/${split[1]}/${split[0]}`},
  currency(value){ value = (String(value).replace(/\D/g, '') / 100).toLocaleString('en-GB', {style: 'currency', currency: 'eur'}); const signal = Number(value) < 0 ? "-" : ""; return signal + value}
},

pn_storage = {
  get(a){ return JSON.parse(localStorage[`efy_pn_${a}`]) || []},
  set(a,b){ localStorage[`efy_pn_${a}`] = JSON.stringify(b)}
},

////

Note ={ all: pn_storage.get('notes'),
    add(a){ Note.all.push(a); App_notes.reload()},
    remove(index){ Note.all.splice(index, 1); App_notes.reload()}
},
Goal ={ all: pn_storage.get('goals'),
    add(a){ Goal.all.push(a); App_goals.reload()},
    remove(index){ Goal.all.splice(index, 1); App_goals.reload()}
},
Link ={ all: pn_storage.get('links'),
    add(a){ Link.all.push(a); App_links.reload()},
    remove(index){ Link.all.splice(index, 1); App_links.reload()}
},
Tag ={ all: pn_storage.get('tags'),
    add(a){ Tag.all.push(a); App_tags.reload()},
    remove(index){ Tag.all.splice(index, 1); App_tags.reload()}
},

////

pn_notes ={ add_note(note, index){ let now = 'pn_note_' + Date.now(), date = note.date.split('/'), month = month_name[date[1]];
    $add('details', {efy_searchable: '', 'data-value': index, id: now, pn_date: note.date}, [ $add('summary', [ $add('div', {class: 'title'}, [note.text]) ]),
        $add('div', {class: 'description'}, [ $add('textarea', {class: 'description2 efy_trans_filter_off efy_shadow_trans_off', readonly: ''}, [note.description]) ]),
        $add('div', {class: 'pn_tags'}, [
            $add('div', {class: 'date efy_shadow_trans'}, [ month +', '+ date[0] ]),
            $add('button', {class: 'copy efy_square_btn', onClick: `navigator.clipboard.writeText( $('#pn_notes [data-value="${index}"] .description2').value ); $notify(3, 'Copied', 'to clipboard')`}, [ $add('i', {efy_icon: 'copy'}) ]),
            $add('button', {class: 'pn_fs efy_square_btn', onClick: `$('#pn_notes [data-value="${index}"]').classList.toggle('pn_fs'); $('html').classList.toggle('pn_fs'); window.scrollTo(0,0)`}, [ $add('i', {efy_icon: 'fullscreen'}) ]),
            $add('button', {class: 'remove efy_square_btn', onClick: `Note.remove(${index})`}, [ $add('i', {efy_icon: 'remove'}) ])
        ])
    ], $('#pn_notes [efy_drag]'));
}, clear_notes(){ $('#pn_notes [efy_drag]').innerHTML = ''}},

pn_goals ={ add_goal(goal, index){ let now = 'pn_goal_' + Date.now(), date = goal.date.split('/'), month = month_name[date[1]], this_details = `#pn_goals [data-value="${index}"]`; /* if (goal.done == 'true'){ where = $('#pn_goals [efy_drag]')} */

    $add('details', {efy_searchable: '', 'data-value': index, id: now, pn_date: goal.date, pn_done: goal.done, /*remove when firefox supports :has*/ pn_has: goal.priority}, [ $add('summary', [$add('div', {pn_priority: goal.priority}), $add('div', {class: 'title'}, [goal.text]), $add('div', {class: 'time'}, [$sec_time(goal.time)])]),
        $add('div', {class: 'description'}, [$add('div', {efy_timer: `${now},${goal.time},reverse` })]),
        $add('div', {class: 'pn_tags'}, [
            $add('div', {class: 'date efy_shadow_trans'}, [ month +', '+ date[0] ]),
            $add('button', {efy_start: '', title: 'Start or Pause', class: 'pseudo efy_square_btn', onClick: `$('${this_details} [efy_start].pseudo').toggleAttribute('efy_active'); $('${this_details} [efy_timer] [efy_start]').dispatchEvent(new Event('click', { 'bubbles': true }))`}),
            $add('button', {efy_reset: '', title: 'Reset', class: 'pseudo efy_square_btn', onClick: `$('${this_details} [efy_start].pseudo').toggleAttribute('efy_active'); $('${this_details} [efy_timer] [efy_reset]').dispatchEvent(new Event('click', { 'bubbles': true }))`}),
            $add('button', {class: 'done_btn efy_square_btn', efy_audio_mute: 'ok', onClick: `let x = $('${this_details}'); if (x.getAttribute('pn_done') == 'true'){ x.setAttribute('pn_done', 'false')}
                else { let y = $('#pn_confetti'); y.currentTime = 0; y.play(); x.toggleAttribute('open'); x.setAttribute('pn_done', 'true');
                    x.classList.remove('pn_fs'); $('html').classList.remove('pn_fs'); $('${this_details} [efy_timer] [efy_start]').dispatchEvent(new Event('click', { 'bubbles': true }))
            }`}, [ $add('i', {efy_icon: 'check'}) ]),
            $add('button', {class: 'pn_fs efy_square_btn', efy_audio_mute: 'ok', onClick: `let x = $('${this_details}'), y = $$(x, '[efy_start].pseudo');
                $$(x, '[efy_timer] [efy_start]').hasAttribute('efy_active') ? y.setAttribute('efy_active', '') : y.removeAttribute('efy_active');
                x.classList.toggle('pn_fs'); x.classList.toggle('efy_sidebar_width'); $('html').classList.toggle('pn_fs'); window.scrollTo(0,0)`
            }, [ $add('i', {efy_icon: 'fullscreen'}) ]),
            $add('button', {class: 'remove efy_square_btn', onClick: `Goal.remove(${index}); $('html').classList.remove('pn_fs')`}, [ $add('i', {efy_icon: 'remove'}) ])
        ])
    ], $('#pn_goals [efy_drag]'));
}, clear_goals(){ $('#pn_goals [efy_drag]').innerHTML = ''}},

pn_links ={ add_link(a, index){
    $add('a', {href: a.url, target: '_blank', efy_searchable: '', 'data-value': index, efy_card: ''}, [ $add('p', {class: 'title'}, [a.text]),
        $add('div', {class: 'url'}, [a.url]),
        $add('div', {class: 'pn_tags'}, [
            $add('button', {class: 'remove efy_square_btn', onClick: `Link.remove(${index})`}, [ $add('i', {efy_icon: 'remove'}) ])
        ])
    ], $('#pn_links [efy_drag]'));
}, clear_links(){ $('#pn_links [efy_drag]').innerHTML = ''}},

pn_tags ={ add_tag(a, index){
    $add('div', {efy_searchable: '', efy_card: ''}, [ $add('p', {class: 'title'}, [a.text]),
        $add('div', {class: 'pn_tags'}, [
            $add('button', {class: 'remove efy_square_btn', onClick: `Tag.remove(${index})`}, [ $add('i', {efy_icon: 'remove'}) ])
        ])
    ], $('#pn_tags [efy_drag]'));
}, clear_tags(){ $('#pn_tags [efy_drag]').innerHTML = ''}},

////

pn_form_goals =()=>{ let x = '.pn_goals_form #', y = '.pn_goals_form .', a = $(x+'text'), b = $(x+'priority input:checked'), c = $(x+'date'), d1 = $(y+'hour'), d2 = $(y+'minute'), d3 = $(y+'second'), aa = a.value, bb = b.id, cc = format.date(c.value), dd = String(Math.floor((Number(d1.value) * 3600) + (Number(d2.value) * 60) + Number(d3.value)));
    try { if (aa.trim() === '' || bb.trim() === '' || cc.trim() === '' || cc.trim() === 'undefined/undefined/' || dd.trim() == ''){ $notify(3, 'Missed Required Fields', 'Fill in the rest')}
        else { Goal.add({ text: aa, priority: bb, date: cc, time: dd }); a.value = ''; $(x+'priority #normal').checked = 'true', c.value = '', d3.value = ''; pn_modal.toggle()}
} catch (error){ console.log(error.message)}},

pn_form_notes =()=>{ let x = '.pn_notes_form #', a = $(x+'text'), b = $(x+'description'), c = $(x+'date'), aa = a.value, bb = b.value, cc = format.date(c.value);
    try { if (aa.trim() === '' || bb.trim() === '' || cc.trim() === '' || cc.trim() === 'undefined/undefined/'){ $notify(3, 'Missed Required Fields', 'Fill in the rest')}
        else { Note.add({ text: aa, description: bb, date: cc }); a.value = ''; b.value = '', c.value = '', d1.value = '', d2.value = '', d3.value = ''; pn_modal.toggle()}
} catch (error){ console.log(error.message)}},

pn_form_links =()=>{ let x = '.pn_links_form #', a = $(x+'text'), b = $(x+'url'), aa = a.value, bb = b.value;
    try { if (aa.trim() === '' || bb.trim() === ''){ $notify(3, 'Missed Required Fields', 'Fill in the rest')}
        else { Link.add({ text: aa, url: bb }); a.value = ''; b.value = ''; pn_modal.toggle()}
} catch (error){ console.log(error.message)}},

pn_form_tags =()=>{ let x = '.pn_tags_form #', a = $(x+'text'), aa = a.value;
    try { if (aa.trim() === ''){ $notify(3, 'Missed Required Fields', 'Fill in the rest')}
        else { Tag.add({text: aa}); a.value = ''; pn_modal.toggle()}
} catch (error){ console.log(error.message)}},

////

App_notes ={
    start(){ Note.all.forEach(pn_notes.add_note); pn_storage.set('notes', Note.all); $('#pn_notes .header mark').textContent = $all('#pn_notes [efy_drag] > *').length},
    reload(){ pn_notes.clear_notes(); App_notes.start()}
},
App_goals ={
    start(){ Goal.all.forEach(pn_goals.add_goal); pn_storage.set('goals', Goal.all); $('#pn_goals .header mark').textContent = $all('#pn_goals [efy_drag] > *').length},
    reload(){ pn_goals.clear_goals(); App_goals.start()}
},
App_links ={
    start(){ Link.all.forEach(pn_links.add_link); pn_storage.set('links', Link.all); $('#pn_links .header mark').textContent = $all('#pn_links [efy_drag] > *').length},
    reload(){ pn_links.clear_links(); App_links.start()}
},
App_tags ={
    start(){ Tag.all.forEach(pn_tags.add_tag); pn_storage.set('tags', Tag.all); $('#pn_tags .header mark').textContent = $all('#pn_tags [efy_drag] > *').length},
    reload(){ pn_tags.clear_tags(); App_tags.start()}
};
App_goals.start(); App_notes.start(); App_links.start(); App_tags.start();




/*Add menu when ready*/ $ready('#efy_sbtheme', ()=>{

$add('details', {id: 'pn_settings', class: 'eos_menu'}, [
  $add('summary', [$add('i', {efy_icon: 'edit'}), $add('p', 'Planner'), $add('mark', {efy_lang: 'alpha'})]),
        $add('div', {efy_tabs: 'pn_menu', efy_select: ''}, [
            ['div', {class: 'efy_tabs'}, [
                ['input', {type:'radio', id: 'pn_tab_theme', efy_tab: 'theme', efy_active: ''}],
                ['label', {for: 'pn_tab_theme', efy_lang: 'theme'}],
                ['input', {type:'radio', id: 'pn_tab_backup', efy_tab: 'backup'}],
                ['label', {for: 'pn_tab_backup', efy_lang: 'backup'}],
                ['input', {type:'radio', id: 'pn_tab_tags', efy_tab: 'tags'}],
                ['label', {for: 'pn_tab_tags', efy_lang: 'tags'}]
            ]],
            $add('div', {efy_content: 'backup', efy_select: '', id: 'pn_backup'}, [
                $add('a', {role: 'button', class: 'pn_localstorage_export', efy_lang: 'save'}, [$add('i', {efy_icon: 'arrow_down'})]),
                $add('label', {efy_upload: 'pn_localstorage_import, .json'}),
                $add('button', {class: 'pn_localstorage_reset', efy_lang: 'reset'}, [$add('i', {efy_icon: 'reload'})]),
            ]),
            $add('div', {efy_content: 'theme', efy_select: '', id: 'pn_theme', efy_active: ''}, [
                $add('input', {type: 'checkbox', name: 'pn_priority_custom', id: 'pn_priority_custom'}),
                $add('label', {for: 'pn_priority_custom', efy_lang: 'inside_goal'})
            ]),
            $add('div', {efy_content: 'tags', efy_select: '', id: 'pn_tags'}, [
                $add('div', {efy_lang: 'coming_soon'})
            ]),
        ])
], $('#efy_sbtheme'), 'beforebegin');


$wait(2, ()=>{
    /*Export Settings*/ $event($('.pn_localstorage_export'), 'click', ()=>{ let e = $('.pn_localstorage_export'), s =(a)=>{ return localStorage[`efy_pn_${a}`].replaceAll('  ', '').replaceAll(',"', ', "').replaceAll('"},', '"},\n').replaceAll('":', '": ')}, f = s('goals'), g = s('notes'), h = s('links'), final = `${f}\n\n${g}\n\n${h}`;
    e.href = URL.createObjectURL(new Blob([final], {type: 'application/json'})); e.setAttribute('download', 'efy_planner.json') });

    /*Import Settings*/ let efy_ls_import = $('#pn_localstorage_import'); $event(efy_ls_import, 'change', ()=>{ let file = efy_ls_import.files[0], read = new FileReader();
	read.onload =()=>{ let obj = read.result.split('\n\n');
        ['goals', 'notes', 'links'].map((a, i)=>{ localStorage[`efy_pn_${a}`] = obj[i] }); location.reload()
    }; read.readAsText(file)});

    /*Reset Settings*/ $all(".pn_localstorage_reset").forEach(x =>{ x.onclick =()=>{ Object.entries(localStorage).forEach(([k])=>{ if (k.includes('efy_pn')){ localStorage.removeItem(k)}}); location.reload()}});
});

/*Search*/ $add('label', {class: 'pn_search', title: 'Search'}, [
    $add('i', {efy_icon: 'search'}), $add('input', {id: 'pn_search', type: 'text', placeholder: 'Search...', efy_search_input:''})
], $('.pn_nav .pn_toggles.pn_right'), 'afterbegin');
$body.setAttribute('efy_search',':is(#pn_goals, #pn_notes, #pn_links) [efy_drag] > *:not(.efy_ignore_search)');

/*Submit*/ $event($('.pn_submit'), 'click', ()=>{ let a = $('[efy_tabs=pn_form] [efy_tab][efy_active]').getAttribute('efy_tab');
    if (a == 'goals'){ pn_form_goals()} else if (a == 'notes'){ pn_form_notes()} else if (a == 'links'){ pn_form_links()} else if (a == 'tags'){ pn_form_tags()} else {$notify(3, "Can't submit it", 'Try a different approach')}
});


////// Planner

function efy_drag(list){
let currentElement = '', initialX = 0, initialY = 0, x, y, chld = '*:not(.efy_no_drag, [efy_drag] > * > *, [efy_drag] [efy_drag_cursor])';

const isTouchDevice =()=>{ try { event.touches[0].clientX; return true} catch (e){ return false}},

getPosition =(value)=>{ let elementIndex;

  $$all(list, chld).forEach((element, index)=>{
    let elementValue = element.getAttribute("data-value");
    if (value == elementValue){ elementIndex = index}
  });
  return elementIndex;
},

dragStart =(e)=>{
  /*Target from pointer*/ if (isTouchDevice()){ initialX = e.touches[0].clientX; initialY = e.touches[0].clientY} else {initialX = e.clientX; initialY = e.clientY};
  currentElement = e.target; try { e.dataTransfer.setDragImage($('[efy_drag_cursor]'), 0, 0)} catch {/*Fix this*/}
},

dragOver =(e)=>{ e.preventDefault();
  /*Target from pointer*/ if (isTouchDevice()){ x = e.touches[0].clientX; y = e.touches[0].clientY} else {x = e.clientX; y = e.clientY}; targetElement = document.elementFromPoint(x, y);
  /*Active Class*/ $$all(list, '*').forEach(a => {a.classList.remove('active')}); targetElement.classList.add("active");
},

drop =(e)=>{ e.preventDefault();
  /*Target from pointer*/ if (isTouchDevice()){ x = e.touches[0].clientX; y = e.touches[0].clientY} else {x = e.clientX; y = e.clientY}; targetElement = document.elementFromPoint(x, y);

  /*Active Class*/ $$all(list, '*').forEach(a => {a.classList.remove('active')}); targetElement.classList.add("active"); $wait(0.3, ()=>{ targetElement.classList.remove("active") });

  let currentValue = currentElement.getAttribute("data-value"), targetValue = targetElement.getAttribute("data-value");
  /*Get index of current & target*/ let [currentPosition, targetPosition] = [getPosition(currentValue), getPosition(targetValue)]; initialX = x; initialY = y;

  if (list.contains(targetElement) && (list != targetElement) && (targetElement != currentElement) && currentElement.hasAttribute('data-value') && targetElement.hasAttribute('data-value') && (list.getAttribute('efy_drag') == 'on')){ try {
    if (currentPosition < targetPosition){ targetElement.insertAdjacentElement("afterend", currentElement)}
    else {targetElement.insertAdjacentElement("beforebegin", currentElement)}
  } catch (err){} }
};

if ($('#pn_drag_toggle').checked){ $$all(list, chld).forEach((a)=>{ a.draggable = true;
    $event(a, 'dragstart', dragStart, false); $event(a, 'dragover', dragOver, false); $event(a, 'drop', drop, false);
    $event(a, 'touchstart', dragStart, {passive: false}); $event(a, 'touchmove', drop, {passive: false});
})}
else { $$all(list, chld).forEach((a)=>{ a.draggable = false;
    $event_rm(a, 'dragstart', dragStart); $event_rm(a, 'dragover', dragOver); $event_rm(a, 'drop', drop);
    $event_rm(a, 'touchstart', dragStart); $event_rm(a, 'touchmove', drop);
})}

};


/*Save, Edit & Drag*/ const atb_all =(a,b,c)=>{ a.forEach(d => d.setAttribute(b,c))},
$pn_save_edits =()=>{ let goals = [], notes = [], links = [];
    /*Goals*/ $all('#pn_goals details').forEach(a =>{
        let b = $$(a, '.title').textContent, c = $$(a, '[pn_priority]').getAttribute('pn_priority'), d = a.getAttribute('pn_date'), e = $$(a, '.description [efy_timer]').getAttribute('efy_timer').split(','), f = a.getAttribute('pn_done');
        goals.push({"text": b, "priority": c, "date": d, "time": e[1], "done": f})
    }); localStorage[`efy_pn_goals`] = JSON.stringify(goals);

    /*Notes*/ $all('#pn_notes details').forEach(a =>{
        let b = $$(a, '.title').textContent, c = $$(a, '.description2').value/*.replaceAll('</div><div>', '\n').replaceAll('<div>', '\n').replaceAll('</div>', '').replaceAll('<br>', '')*/, d = a.getAttribute('pn_date');
        notes.push({"text": b, "description": c, "date": d})
    }); localStorage[`efy_pn_notes`] = JSON.stringify(notes);

    /*Links*/ $all('#pn_links a').forEach(a =>{ let b = $$(a, '.title').textContent, c = $$(a, '.url').textContent;
        links.push({"text": b, "url": c})
    }); localStorage[`efy_pn_links`] = JSON.stringify(links);
};

/*Drag*/ $event($('#pn_drag_toggle'), 'change', (a) => { let b = $all(':is(#pn_goals, #pn_notes, #pn_links, #pn_tags) [efy_drag]');
    'goal note link tag'.split(' ').forEach(c => efy_drag($(`#pn_${c}s [efy_drag]`)) );
    if (a.target.checked){ atb_all(b, 'efy_drag', 'on'); $notify(2, 'Move - ON', 'You can order items now'); let x = $('#pn_edit_toggle'); x.checked = false; x.dispatchEvent(new Event('change', { 'bubbles': true })) }
    else { atb_all(b, 'efy_drag', ''); $pn_save_edits(); }
});

/*Edit*/ $event($('#pn_edit_toggle'), 'change', (a) => { let b = $all(':is(#pn_goals, #pn_notes, #pn_links) :is(.title, .url)'), c = []; $all('#pn_links .url').forEach(a => c.push({url: a.textContent}));
    if (a.target.checked){ atb_all(b, 'contenteditable', 'true'); let x = $('#pn_drag_toggle'); x.checked = false; x.dispatchEvent(new Event('change', { 'bubbles': true }));
        $all('#pn_links a').forEach(a=>{ a.removeAttribute('href'); a.removeAttribute('target')});
        $all('#pn_notes .description2').forEach(a=>{ a.removeAttribute('readonly')})
        $all('#pn_links .pn_tags').forEach(x => x.classList.add('active'))
    }
    else { atb_all(b, 'contenteditable', 'false'); $pn_save_edits();
        $all('#pn_links a').forEach((a,i)=>{ a.href = c[i].url; a.target = '_blank' });
        $all('#pn_notes .description2').forEach(a=>{ a.setAttribute('readonly', '')})
        $all('#pn_links .pn_tags').forEach(x => x.classList.remove('active'))
    }
});

/*Done Goals*/ $all('#pn_goals details .done_btn').forEach(a =>{ $event(a, 'click', $pn_save_edits) });

/*Custom Colors*/ for (let i=1; i <= 3; i++){ let a = `priority_${i}`, b = `[efy_color*="${a}"]`, c = `pn_${a}`;
    if (efy_pn[a]){ $root.style.setProperty(`--${c}`, efy_pn[a])}
}
$event($('#pn_priority_custom'), 'change', (a)=>{ $('#pn_goals').classList.toggle('priority_color'); efy_pn.priority_match = a.target.checked; $pn_save() });
if (efy_pn.priority_match == true){ $('#pn_goals').classList.add('priority_color'); $('#pn_priority_custom').checked = true}

/*Auto Resize*/ $ready('#pn_notes .description2', (a)=>{ a.style.height = 0; a.style.height = (a.scrollHeight + 1) + 'rem';
    $event(a, 'input', ()=>{ if (a.classList.contains('pn_fs')){ a.style.height = 0; a.style.height = (a.scrollHeight + 1) + 'rem'}})
});
$all('#pn_notes details').forEach(a =>{ let b = $$(a, '.description2'), c = $$(a, '.pn_fs'); const fn =()=>{ b.style.height = 0; b.style.height = (b.scrollHeight + 1) + 'rem'};
    $event(a, 'toggle', fn); $event(c, 'click', fn)
});

/*Fullscreen Grids*/ $all('.pn_full').forEach(a=>{ $event(a, 'click', ()=>{ $all(':is(#pn_goals, #pn_notes, #pn_links) [efy_drag]').forEach(b=> b.classList.toggle('pn_full_on')) })});

/* Hash Isolated Parts*/ ['goals', 'notes', 'links'].map(a=>{
    if (location.hash == `#${a}`){ $(`#pn_${a} .pn_full`).dispatchEvent(new Event('click', { 'bubbles': true }))}
})


$ready('button.pn_fs', (a)=>{ $event(a, 'click', ()=>{ if (efy.audio_status == 'on' ){ $audio_play(efy_audio.wind)}})});


}, 1);