$ready('#efy_sbtheme', ()=>{

const no = ['.','.'];

const mappings = {
  'Nintendo Switch': {
    axes: '0, 1, 2, 3',
    buttons: {
      back: [0, 'b'],
      ok: [1, 'a'],
      yes: [2, 'y'],
      no: [3, 'x'],
      l1: [4, 'l'],
      r1: [5, 'r'],
      l2: [6, 'zl'],
      r2: [7, 'zr'],
      extra: [8, 'minus'],
      menu: [9, 'plus'],
      l_ok: [10, 'l_ok'],
      r_ok: [11, 'r_ok'],
      up: [12, 'up'],
      down: [13, 'down'],
      left: [14, 'left'],
      right: [15, 'right'],
      home: [16, 'home'],
      capture: [17, 'circle']
    }
  },
  'Playstation': {
    axes: '0, 1, 2, 3',
    buttons: {
      back: [0, 'x'],
      ok: [1, 'circle'],
      yes: [2, 'square'],
      no: [3, 'triangle'],
      l1: [4, 'l1'],
      r1: [5, 'r1'],
      l2: [6, 'l2'],
      r2: [7, 'r2'],
      extra: [8, 'menu3'],
      menu: [9, 'menu'],
      l_ok: [10, 'l_ok'],
      r_ok: [11, 'r_ok'],
      up: [12, 'up'],
      down: [13, 'down'],
      left: [14, 'left'],
      right: [15, 'right'],
      home: [16, 'home'],
      capture: no
    }
  },
  'Xbox': {
    axes: '0, 1, 2, 3',
    buttons: {
      back: [1, 'b'],
      ok: [0, 'a'],
      yes: [3, 'y'],
      no: [2, 'x'],
      l1: [4, 'lb'],
      r1: [5, 'rb'],
      l2: [6, 'lt'],
      r2: [7, 'rt'],
      extra: [8, 'extra_xbox'],
      menu: [9, 'menu'],
      l_ok: [10, 'l_ok'],
      r_ok: [11, 'r_ok'],
      up: [12, 'up'],
      down: [13, 'down'],
      left: [14, 'left'],
      right: [15, 'right'],
      home: [16, 'home'],
      capture: no
    }
  },
  'Wiimote - Firefox': {
    axes: 'testing...',
    buttons: {
      back: [1, 'b'],
      ok: [0, 'a'],
      yes: [21, '1'],
      no: [22, '2'],
      l1: no, r1: no, l2: no, r2: no,
      extra: [24, 'minus'],
      menu: [23, 'plus'],
      r_ok: no, l_ok: no,
      up: [17, 'up'],
      down: [20, 'down'],
      left: [18, 'left'],
      right: [19, 'right'],
      home: [16, 'home'],
      capture: no
    }
  },
  'Wiimote - Chromium': {
    axes: '',
    buttons: {
      back: [1, 'b'],
      ok: [0, 'a'],
      yes: [5, '1'],
      no: [6, '2'],
      l1: no, r1: no, l2: no, r2: no,
      extra: [4, 'minus'],
      menu: [3, 'plus'],
      r_ok: no, l_ok: no, up: no, down: no, left: no, right: no,
      home: [2, 'home'],
      capture: no
    }
  }
};

// efy.gamepads.mapping = 'playstation';
// efy.gamepads.action = mappings.

let contents = [], tabs = [];

['Gamepads', 'Mappings'].map(name =>{
    const tab = name.toLowerCase(), details = (tab === 'html') ? null : {efy_details: ''};
    tabs.push(
        ['input', {id: `gp_left_${tab}`, type: 'radio', efy_tab: tab, name: 'gp_left'}],
        ['label', {for: `gp_left_${tab}`, class: 'efy_card_filter_off'}, name]
    );
    contents.push(['div', {efy_content: tab, class: 'gamepad_scroll efy_card_filter_off', ...details}]);
});

$add('div', {id: 'efy_gamepads_app', efy_search: 'details, #efy_gamepads_app [efy_searchable]'}, [
    ['div', {efy_tabs: 'gp', class: 'gp_nav efy_shadow_card_off'}, [
        ['div', {class: 'gp_nav_div'}, [
            ['div', {class: 'gp_left efy_button_text_off'}, tabs],
            ['div', {class: 'gp_left efy_button_text_off'}, [
                ['div', {class: 'gp_right'}, [
                    ['label', {class: 'gp_search'}, [
                        ['i', {efy_icon: 'search'}],
                        ['input', {type: 'text', efy_search_input: '', placeholder: 'Search...', name: 'gp_search_input'}]
                    ]],
                    ['button', {efy_sidebar_btn: '', class: 'efy_square_btn', title: 'Menu'}, [['i', {efy_icon: 'menu'}]]]
                ]]
            ]]
        ]], ...contents
    ]]
]);


$add('div', {efy_card:'', class: 'empty'}, [
  ['h5', 'Connect Gamepads'],
  ['hr'],
  ['ol', [
    ['li', 'Turn on your gamepad'],
    ['li', 'Make sure it\'s paired & detected by your device (PC, phone, laptop, etc)'],
    ['li', 'Press any button']
  ]]
], $('[efy_content=gamepads]'));

$all('[efy_tab=gamepads], [efy_content=gamepads]').forEach(x => x.toggleAttribute('efy_active'));

const table = $('[efy_content=mappings]');

$add('div', {class: 'map', efy_card: ''}, [], table);


'EFY axes back ok yes no l1 r1 l2 r2 extra menu l_ok r_ok up down left right home capture'.split(' ').map(x =>{
  $add('div', {}, x, $$(table, '.map'));
});

Object.keys(mappings).map(mapping =>{

  const map = mappings[mapping],
  sticks = (map.axes === '') ? null : ['p', {class: 'sticks'}, [['i', {efy_icon: 'gamepad_stick_l'}], ['i', {efy_icon: 'gamepad_stick_r'}]]];
  const container = $add('div', {class: 'map', efy_card: ''}, [
    ['div', mapping],
    ['div', {}, [
      sticks,
      ['p', String(map.axes)]
    ]]
  ], table);

  values = Object.values(map.buttons);

  Object.keys(map.buttons).map((button, j) =>{
    let [index, name] = values[j], single_character = (name.length === 1) ? ' single' : '';
    if (('.').includes(name)){ name = [['p', '']]; index = ''}
    else { name = [['i', {efy_icon: 'gamepad_' + name}]]}
    $add('div', {}, [ ['p', name], ['p', String(index)] ], container);
  });
});

$add('button', {class: 'scroll_btn'}, '', table);



const gamepads_selector = $('[efy_content=gamepads]'), gamepads_by_index = {};

function add_gamepad(gamepad){
  const map = $add('div', {class: 'map', efy_card: ''}, [
    ['div', {class: 'info'}, [
      ['div', {class: 'efy_shadow_card'}, [['div', {class: 'index'}], ['div', {class: 'id'}]]],
      ['div', {class: 'efy_shadow_card'}, [['div', {class: 'label'}, 'connected:'], ['span', {class: 'connected'}]]],
      ['div', {class: 'efy_shadow_card'}, [['div', {class: 'label'}, 'mapping:'], ['span', {class: 'mapping'}]]]
    ]],
    ['div', {class: 'inputs'}, [['div', {class: 'axes'}], ['div', {class: 'buttons'}]]]
  ], gamepads_selector);

  const axes = [], buttons = [], axes_selector = $$(map, '.axes'), buttons_selector = $$(map, '.buttons');

  for (let ndx = 0; ndx < gamepad.axes.length; ndx += 2){
    const div = $add('div', {class: 'circle efy_shadow_card'}, [
      ['div', {class: 'grid'}, [
        ['div', {class: 'horizontal'}], ['div', {class: 'vertical'}], ['div', {class: 'axis'}],
      ]],
      ['p', {class: 'text'}, '0'],
    ], axes_selector);

    axes.push({axis: $$(div, '.axis'), value: $$(div, '.text')});
  }

  for (let ndx = 0; ndx < gamepad.buttons.length; ++ndx){
    const div = $add('div', {class: 'button efy_shadow_card'}, [
      ['p', {class: 'index'}, '0'], ['hr'], ['p', {class: 'value'}, '0.00']
    ], buttons_selector);

    $$(div, '.index').textContent = ndx;
    buttons.push({circle: div, value: $$(div, '.value')});
  }

  gamepads_by_index[gamepad.index] = {
    gamepad, map, axes, buttons,
    index: $$(map, '.index'), id: $$(map, '.id'), mapping: $$(map, '.mapping'), connected: $$(map, '.connected')
  };

  if (gamepad.vibrationActuator){ const index = gamepad.index;
    $add('div', {class: 'vibration', efy_select: ''}, [
      ['div', {efy_lang: 'vibration', efy_range_text: 'Intensity'}, [
        ['input', {type: 'range', id: `vibration_intensity_${index}`, min: 0.02, max: 1, step: 0.02, value: 0.5}]
      ]],
      ['div', {efy_lang: 'time', efy_range_text: 'Time'}, [
        ['input', {type: 'range', id: `vibration_duration_${index}`, min: 0.05, max: 5, step: 0.05, value: 3}]
      ]]
    ], map);
    vibration_fn();
  }
}

function remove_gamepad(gamepad){
  const info = gamepads_by_index[gamepad.index];
  if (info){
    delete gamepads_by_index[gamepad.index];
    info.map.parentElement.removeChild(info.map);
}}

function add_gamepad_if_new(gamepad){
  const info = gamepads_by_index[gamepad.index];
  info ? info.gamepad = gamepad : add_gamepad(gamepad);
}

function connect_gamepad(e){ add_gamepad_if_new(e.gamepad)}
function disconnect_gamepad(e){ remove_gamepad(e.gamepad)}

const keys = ['index', 'id', 'connected', 'mapping', /*'timestamp'*/];

function process_gamepad(info){
  const {map, gamepad, axes, buttons} = info, lines = [`gamepad  : ${gamepad.index}`],
  multiply = gamepad.id.includes('Nintendo Wii Remote') ? 1 : 2;

  for (const key of keys){ info[key].textContent = gamepad[key]}
  axes.forEach(({axis, value}, ndx)=>{
    const off = ndx * multiply;
    axis.style.left = `calc(${gamepad.axes[off].toFixed(2) * 50}% + 50% - 6rem)`;
    axis.style.top = `calc(${gamepad.axes[off + 1].toFixed(2) * 50}% + 50% - 6rem)`;
    value.textContent = `${gamepad.axes[off].toFixed(2).padStart(5)},${gamepad.axes[off + 1].toFixed(2).padStart(5)}`;
  });
  buttons.forEach(({circle, value}, ndx)=>{
    const button = gamepad.buttons[ndx];
    circle.classList.toggle('active', button.pressed);
    value.textContent = `${button.value.toFixed(2)}`;
  });

  /////////
/*
  // DevTools console tab
  window.axis0Max = 0;
  window.axis1Max = 0;
  window.axis2Max = 0;

  // Conditional breakpoint
  window.axis0Max = Math.max(window.axis0Max, Math.abs(gamepad.axes[0])); window.axis1Max = Math.max(window.axis1Max, Math.abs(gamepad.axes[1])); window.axis2Max = Math.max(window.axis2Max, Math.abs(gamepad.axes[2])); false

  // DevTools console tab
  console.table([window.axis0Max, window.axis1Max, window.axis2Max])
*/
  //////////////

}

function add_new_gamepads(){ const gamepads = navigator.getGamepads();
  for (let i = 0; i < gamepads.length; i++){
    const gamepad = gamepads[i];
    if (gamepad) add_gamepad_if_new(gamepad);
}}

$event(window, 'gamepadconnected', connect_gamepad);
$event(window, 'gamepaddisconnected', disconnect_gamepad);


function process(){
    add_new_gamepads();
    Object.values(gamepads_by_index).forEach(process_gamepad);
    $wait(.01, ()=> requestAnimationFrame(process));
}
requestAnimationFrame(process);


function test_gamepad_vibration(intensity, duration, index){
  const gamepad = navigator.getGamepads()[index];
  if (gamepad && gamepad.vibrationActuator){
    gamepad.vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0, duration: duration * 1000, // miliseconds
      weakMagnitude: intensity, strongMagnitude: intensity,
    });
}}

/*Vibration*/ const vibration_fn =()=>{

  $event(document, 'input', (event)=>{ const x = event.target;

    if (x.matches('.map input:not(.efy_range_text_p)')){
      const index = Number(x.id.replace('intensity_', '').replace('duration_', '').replace('vibration_', '')),
      intensity = $(`#vibration_intensity_${index}`).value,
      duration = $(`#vibration_duration_${index}`).value;
      console.log(index);

      test_gamepad_vibration(intensity, duration, index);
    }

  });

};

});