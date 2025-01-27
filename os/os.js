/*Storage*/ let  efy_os = {}, $os_save =()=>{};
try { if (localStorage.efy_os){ efy_os = JSON.parse(localStorage.efy_os)} $os_save =()=>{localStorage.efy_os = JSON.stringify(efy_os)}} catch {/**/}

$ready('#efy_sbtheme', ()=>{

let apps_dom = [];
Object.keys(apps_list).forEach(key =>{ apps_dom.push(
  ['a', {efy_card: `./index.html${apps_list[key][0]}`, class: 'efy_trans_filter_off'}, [
    ['i', {efy_icon: apps_list[key][1], class: 'efy_color'}],
    ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, key]]]
  ]]
)});

$add('div', {os_app: ''}, [
  /*Apps*/ ['div', {efy_frames: '', efy_drag: ''}],
  /*Add App Form*/ ['div', {efy_content: 'links', class: 'pn_links_form efy_hide_i', efy_card: ''}, [
    ['form', {action: '#'}, [ ['div', {class: 'modal_grid'}, [ ['div', {class: 'grid'}, [
      ['div', {class: 'input-group'}, [
        ['label', {for: 'text', efy_lang: 'name', class: 'efy_trans_filter'}],
        ['input', {type: 'text', id: 'text', name: 'text'}]
      ]],
      ['div', {class: 'input-group'}, [
        ['label', {for: 'url', class: 'efy_trans_filter'}, 'URL'],
        ['input', {type: 'url', id: 'url', name: 'url'}]
      ]],
      ['div', {class: 'input-group'}, [
        ['label', {for: 'category', efy_lang: 'tags', class: 'efy_trans_filter'}],
        ['input', {type: 'text', id: 'category', name: 'category', placeholder: 'coming soon...', disabled: ''}]
    ]]]]]]]]]],
    /*Apps*/ ['div', {os_drawer: '', class: 'efy_hide_i efy_trans_filter', efy_card: ''}, [ ['div', {class: 'apps'}, [
      ...apps_dom,
      ['a', {efy_card: '', class: 'add_app soon efy_trans_filter_off'}, [
        ['i', {efy_icon: 'plus', class: 'efy_color_trans'}],
        ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Add App']]]
      ]]
    ]]]],
  /*Dock*/ ['div', {os_bar: '', class: 'efy_trans_filter efy_shadow_trans'}, [
    ['div', {class: 'os_buttons'}, [
      ['div', [ ['div', {efy_clock: ''}] ]],
    ]],
    ['div', {class: 'os_buttons'}, [ ['div', {efy_select: 'margin0'}, [
        ['button', {class: 'efy_square_btn', title: 'Apps', efy_toggle: '[efy_frames], [os_drawer]', style: 'display: flex; align-items: center; place-content: center'}, [ ['i', {efy_icon: 'dots', style: 'font-size: 18rem'}] ]],
        ['input', {id: 'os_drag_toggle', type: 'checkbox'}], ['label', {for: 'os_drag_toggle', class: 'efy_square_btn', title: 'Move'}, [ ['i', {efy_icon: 'move'}] ]],
        ['input', {id: 'os_remove', type: 'checkbox'}], ['label', {for: 'os_remove', class: 'efy_square_btn', title: 'Remove', efy_audio_mute: 'ok'}, [['i', {efy_icon: 'remove'}]]]
      ]] ]],
    ['div', {class: 'os_buttons'}, [
      ['button', {class: 'os_fullscreen efy_square_btn', title: 'Fullscreen', efy_audio_mute: 'ok'}, [ ['i', {efy_icon: 'fullscreen'}] ]],
      ['button', {class: 'os_menu efy_square_btn', efy_sidebar_btn: '', title: 'Menu'}, [ ['i', {efy_icon: 'menu'}] ]]
    ]]
]]], $body);

/*Sidebar Menu*/ $add('details', {id: 'os_sidebar'}, [
  ['summary', [['i', {efy_icon: 'dots'}], ['p', 'OS'], ['mark', {efy_lang: 'alpha'}]]],
    ['div', {efy_tabs: 'ms_menu', efy_select: ''}, [
      ['div', {class: 'efy_tabs'}, [
        ['input', {type:'radio', id: 'os_tab_grid', efy_tab: 'grid', efy_active: ''}],
        ['label', {for: 'os_tab_grid', efy_lang: 'grid'}],
        ['input', {type:'radio', id: 'os_tab_effects', efy_tab: 'effects'}],
        ['label', {for: 'os_tab_effects', efy_lang: 'effects'}],
        ['input', {type:'radio', id: 'os_tab_tags', efy_tab: 'tags'}],
        ['label', {for: 'os_tab_tags', efy_lang: 'tags'}]
      ]],
    ['div', {efy_content: 'effects', efy_select: '', id: 'ms_sidebar_speed'}, [
       ['div', {efy_lang: 'soon'}, '...']
    ]],
    ['div', {efy_content: 'grid', efy_select: 'margin0', id: 'bar_position', efy_active: ''}, [
      ['p', {efy_lang: 'bar_position', style: 'margin-top: 0'}], ['div', [
        ['input', {type: 'radio', id: 'bar_position_bottom', name: 'bar_position', checked: ''}], ['label', {for: 'bar_position_bottom', efy_lang: 'down', style: 'display: flex; align-items: center; width: fit-content'}],
        ['input', {type: 'radio', id: 'bar_position_top', name: 'bar_position'}], ['label', {for: 'bar_position_top', efy_lang: 'up', style: 'display: flex; align-items: center; width: fit-content'}],
        ['input', {type: 'radio', id: 'bar_position_left', name: 'bar_position'}], ['label', {for: 'bar_position_left', efy_lang: 'left', style: 'display: flex; align-items: center; width: fit-content'}],
        ['input', {type: 'radio', id: 'bar_position_right', name: 'bar_position'}], ['label', {for: 'bar_position_right', efy_lang: 'right', style: 'display: flex; align-items: center; width: fit-content'}]
      ]],
      ['p', {efy_lang: 'gap'}], ['div', [
        ['input', {type: 'radio', id: 'grid_gap_default', name: 'grid_gap', checked: ''}], ['label', {for: 'grid_gap_default', efy_lang: 'default'}],
        ['input', {type: 'radio', id: 'grid_gap_small', name: 'grid_gap'}], ['label', {for: 'grid_gap_small'}, 'Small'],
        ['input', {type: 'radio', id: 'grid_gap_none', name: 'grid_gap'}], ['label', {for: 'grid_gap_none'}, 'None']
      ]]
    ]],
    ['div', {efy_content: 'tags', efy_select: '', id: 'items'}, [
      ['div', {efy_lang: 'soon'}, '...']
    ]]
  ]]
], $('#efy_sbtheme'), 'beforebegin');


$all('[os_drawer] [efy_card]').forEach(a =>{ let b = $$(a, '.name').textContent.replaceAll(' ', '_').toLowerCase(), c = a.getAttribute('efy_card');  if (a.classList[0] != 'add_app'){ a.setAttribute('efy_toggle', '[efy_frames], [os_drawer]')}; a.setAttribute('role', 'button');
    $event(a, 'click', ()=>{ if (c !== ''){ if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)}
      let index = Number($all('[efy_frame]').length);
      $add('div', {efy_frame: b, 'data-value': index, style: `order: ${index}`, class: 'efy_app efy_trans_filter'}, [
        ['iframe', {src: c, allowfullscreen: 'true', loading: 'lazy', sandbox: 'allow-scripts allow-same-origin'}],
      ], $('[efy_frames]'))
} else { $notify('short', 'Not available yet!', 'It should be released soon...')}})});


/*Restore Preferences*/
if (efy_os.bar_position){ let a = efy_os.bar_position; $('[os_app]').setAttribute('os_app', a); $(`#bar_position_${a}`).checked = true}
if (efy_os.grid_gap){ let a = efy_os.grid_gap; $('[os_app]').setAttribute('os_grid_gap', a); $(`#grid_gap_${a}`).checked = true}

/*Bar Position*/ 'top bottom left right'.split(' ').map(a=>{ $event($(`#bar_position_${a}`), 'click', ()=>{
  $('[os_app]').setAttribute('os_app', a); efy_os.bar_position = a; $os_save()
})});
/*Grid Gap*/ 'default small none'.split(' ').map(a=>{ $event($(`#grid_gap_${a}`), 'click', ()=>{
  $('[os_app]').setAttribute('os_grid_gap', a); efy_os.grid_gap = a; $os_save()
})});


/*Fullscreen*/ $event($('.os_fullscreen'), 'click', ()=>{
    if (document.fullscreenElement){ document.exitFullscreen()} else {document.documentElement.requestFullscreen()};
    if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)}
});
/*Close Apps*/ $all('#os_remove').forEach(a=>{ $event(a, 'change', ()=>{ let b = $all('[efy_frames] [efy_frame]');
  if (b.length == 0){ a.checked = false}
  else if (b.length == 1){ let c = b[0]; c.classList.add('efy_anim_remove'); $wait($css_prop('---anim_speed') * 0.05, ()=>{ c.remove(); if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)} }); a.checked = false}
  else {
    if (a.checked){ $('[efy_frames]').classList.add('remove')}
    else { $('[efy_frames]').classList.remove('remove')}
  }
})});

$event($('[efy_frames]'), 'click', ()=>{ let a = event.target;
    if (a.matches('[efy_frames].remove [efy_frame]')){ let c = $all('[efy_frames] [efy_frame]').length;
      a.classList.add('efy_anim_remove'); $wait($css_prop('---anim_speed') * 0.05, ()=>{ a.remove(); if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)}});
      if (c <= 2){ $('[efy_frames]').classList.remove('remove'); $('#os_remove').checked = false}
    columns()}
}); /*Close Apps - End*/

/*Get App Columns*/ const columns =()=>{ let a = window.getComputedStyle($('[efy_frames]')).getPropertyValue("grid-template-columns").split(' ').length; console.log(a)}


/*Drag*/ function efy_drag(list){
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
    let c = currentElement.style.order, t = targetElement.style.order;
    currentElement.style.order = t; targetElement.style.order = c;
    if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)}
  } catch (err){} }
};

if ($('#os_drag_toggle').checked){ $$all(list, chld).forEach((a)=>{ a.draggable = true;
    $event(a, 'dragstart', dragStart, false); $event(a, 'dragover', dragOver, false); $event(a, 'drop', drop, false);
    $event(a, 'touchstart', dragStart, {passive: false}); $event(a, 'touchmove', drop, {passive: false});
})}
else { $$all(list, chld).forEach((a)=>{ a.draggable = false;
    $event_rm(a, 'dragstart', dragStart); $event_rm(a, 'dragover', dragOver); $event_rm(a, 'drop', drop);
    $event_rm(a, 'touchstart', dragStart); $event_rm(a, 'touchmove', drop);
})}

}; const atb_all =(a,b,c)=>{ a.forEach(d => d.setAttribute(b,c))};

$event($('#os_drag_toggle'), 'change', (a) => { let b = $all('[efy_frames][efy_drag]'); efy_drag($('[efy_frames][efy_drag]'));
    if (a.target.checked){ atb_all(b, 'efy_drag', 'on'); $notify('short', 'Move - ON', 'You can order apps now') }
    else { atb_all(b, 'efy_drag', '')}
});


}, 1);