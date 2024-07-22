/*Storage*/ let  efy_os = {}, $os_save =()=>{};
try { if (localStorage.efy_os){ efy_os = JSON.parse(localStorage.efy_os)} $os_save =()=>{localStorage.efy_os = JSON.stringify(efy_os)}} catch {/**/}

$ready('#efy_sbtheme', ()=>{

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
      ['a', {efy_card: 'https://efy.piped.pages.dev', class: 'efy_trans_filter_off'}, [ ['div', {class: 'logo'}, [
        $ns("svg", {'viewBox': '0 0 508 819', class: 'piped_logo'}, [
          $ns('path', {d: 'm0.4 27.8c0 0 7.3-5.4 20.3-12.7 7.3-3.1 16.4-6.4 26.8-9.3 10.9-2.2 23.1-4 35.6-4.9 12.8 0 25.8 0.8 38 2.4 12.1 2.4 23.3 5.6 32.7 8.9 18.2 8.5 29.6 15.6 29.6 15.6v749.9h-183z'}),
          $ns('path', {d: 'm242.1 163.5c0 0 0-9.7-0.1-22.3-0.2-5.6-0.4-11.9-0.6-18.2-0.2-6.3-0.4-13-0.6-19.9-0.1-7.4-0.1-15.5 0-23.8 0.3-9.3 0.7-19 1.2-28.2 1.3-21.2 2.6-37.7 2.6-37.7 0 0 14.6-1.2 39.3-1.4 5.9 0.4 12.4 1 19.4 1.8 6.9 0.9 14.3 2 22.1 3.5q11.3 2.9 23.4 7.1c8 2.8 16.3 6 24.7 9.7q12 6.5 24.1 14.5 12.1 8 24 17.6 11.3 10.3 22.1 22.1c6.8 8.2 13.4 16.8 19.7 25.9q8.9 14.1 16.8 29.3c4.8 10.4 9.2 21 13.2 32 3.5 11.1 6.6 22.4 9.2 33.9 2.1 11.6 3.7 23.3 4.8 35q1 17.6 0.3 35c-0.9 11.6-2.4 23-4.4 34.2q-0.9 4.1-1.9 8.2-1 4.1-2.1 8.1-1.2 4.1-2.4 8.1-1.2 4-2.5 8-1.5 3.8-3 7.6-1.6 3.8-3.3 7.5-1.6 3.8-3.4 7.4-1.7 3.7-3.6 7.4-2 3.4-4 6.8-2.1 3.4-4.2 6.7-2.2 3.4-4.4 6.6-2.3 3.3-4.6 6.5-2.4 3-4.9 6-2.5 2.9-5.1 5.8-2.6 2.8-5.2 5.6-2.7 2.8-5.4 5.6-2.9 2.4-5.8 4.8-2.9 2.4-5.9 4.7-3 2.3-6 4.6-3.1 2.2-6.2 4.4c-8.1 5.6-16.3 10.8-24.6 15.4-8.9 4-17.8 7.6-26.5 10.7-8.8 3.1-17.3 5.8-25.7 8.1-8.7 1.7-17.2 3.2-25.1 4.4-8 1.1-15.5 2-22.4 2.6-14.5 0.4-26.2 0.5-34.2 0.4-8 0-12.4-0.2-12.4-0.2 0 0 0.3-9.6 0.8-23.1 0.1-6.4 0.3-13.8 0.5-21.6 0.1-7.8 0.1-16.3 0.1-25.1-0.1-9.2-0.2-19-0.5-28.8-0.3-10.5-0.7-21.1-1.2-30.8-1.1-21.5-2.1-37.5-2.1-37.5 0 0 6.9 0.4 18.6 0.5 5.5-0.2 12.1-0.7 19.3-1.6 7-1.3 14.4-3 22-5.3 7.1-2.7 14.3-6.1 21.2-10.1q4.9-3.2 9.4-7 4.3-3.8 8.2-8.2 3.5-4.4 6.6-9.2 2.7-4.9 4.8-10.2 1.8-5.3 3-10.7 0.8-5.6 0.9-11.2-0.2-5.6-1.1-11.2-1.3-5.6-3.2-11-2.2-5.4-5-10.5-3.2-5.1-6.9-9.8-4-4.6-8.4-8.8-4.6-4.1-9.6-7.7c-7.2-4.5-14.5-8.4-21.9-11.7-7.8-2.9-15.5-5.2-22.6-7-7.5-1.5-14.3-2.5-20-3.2-12.1-0.9-19.3-1.1-19.3-1.1z'}),
          $ns('path', {d: 'm92 819c-50.9 0-92-16.5-92-37 0-20.5 41.1-37 92-37 50.9 0 92 16.5 92 37 0 20.5-41.1 37-92 37z'}),
          $ns('path', {d: 'm248.4 165c-22.5 0-40.7-34.1-40.7-76.3 0-42.1 18.2-76.2 40.7-76.2 22.4 0 40.6 34.1 40.6 76.3 0 42.1-18.2 76.2-40.6 76.2z'}),
          $ns('path', {d: 'm249.9 486c-22.5 0-40.6-37.5-40.6-84 0-46.5 18.1-84 40.6-84 22.5 0 40.6 37.6 40.6 84 0 46.5-18.1 84-40.6 84z'})
        ])
      ]],
        ['div', {class: 'column_flex'}, [['div', {class: 'name'}, 'Piped']]]
      ]],
      ['a', {efy_card: './media.html', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'audio', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Media']]]]],
      ['a', {efy_card: './planner.html', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'edit', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Planner']]]]],
      ['a', {efy_card: './money.html', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'group', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Money']]]]],
      ['a', {efy_card: './calculator.html', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'remove', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Calculator']]]]],
      ['a', {efy_card: './recorder.html', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'circle', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Recorder']]]]],
      ['a', {efy_card: './converter.html', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'reload', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Converter']]]]],
      ['a', {efy_card: './pong.html', class: 'soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'circle', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Pong']]]]],
      ['a', {efy_card: './weather.html', class: 'soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'sun', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Weather']]]]],
      ['a', {efy_card: './xo.html', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'remove', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'X & O']]]]],
      ['a', {efy_card: './gamepads.html', class: 'soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'group', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Gamepads']]]]],
      ['a', {efy_card: '', class: 'soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'menu', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Text']]]]],
      ['a', {efy_card: './themes.html', class: 'soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'heart', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Themes']]]]],
      ['a', {efy_card: '', class: 'soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'globe', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Injector']]]]],
      ['a', {efy_card: '', class: 'soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'key', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Passwords']]]]],
      ['a', {efy_card: './planner.html#goals', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'check', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Goals']]]]],
      ['a', {efy_card: './planner.html#notes', class: 'efy_trans_filter_off'}, [ ['i', {efy_icon: 'menu', class: 'efy_color'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Notes']]]]],
      ['a', {efy_card: '', class: 'add_app soon efy_trans_filter_off'}, [ ['i', {efy_icon: 'plus', class: 'efy_color_trans'}], ['div', {class: 'column_flex'}, [ ['div', {class: 'name'}, 'Add App']]]]]
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
  else if (b.length == 1){ let c = b[0]; c.classList.add('efy_anim_remove'); $wait($css_prop('--efy_anim_speed') * 0.05, ()=>{ c.remove(); if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)} }); a.checked = false}
  else {
    if (a.checked){ $('[efy_frames]').classList.add('remove')}
    else { $('[efy_frames]').classList.remove('remove')}
  }
})});

$event($('[efy_frames]'), 'click', ()=>{ let a = event.target;
    if (a.matches('[efy_frames].remove [efy_frame]')){ let c = $all('[efy_frames] [efy_frame]').length;
      a.classList.add('efy_anim_remove'); $wait($css_prop('--efy_anim_speed') * 0.05, ()=>{ a.remove(); if (efy.audio_status == 'on'){ $audio_play(efy_audio.wind)}});
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