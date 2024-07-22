$ready('#efy_sbtheme', ()=>{

const gamepads_selector = $add('div', {id: 'gamepads'}), gamepads_by_index = {};

function add_gamepad(gamepad){
  const map = $add('div', {class: 'map'}, [
    ['div', {class: 'info'}, [
      ['div', [['div', {class: 'index'}], ['div', {class: 'id'}]]],
      ['div', [['div', {class: 'label'}, 'connected:'], ['span', {class: 'connected'}]]],
      ['div', [['div', {class: 'label'}, 'mapping:'], ['span', {class: 'mapping'}]]]
    ]],
    ['div', {class: 'inputs'}, [['div', {class: 'axes'}], ['div', {class: 'buttons'}]]]
  ], gamepads_selector);

  const axes = [], buttons = [],
  axes_selector = $$(map, '.axes'), buttons_selector = $$(map, '.buttons');

  for (let ndx = 0; ndx < gamepad.axes.length; ndx += 2){
    const div = $add('div', {class: 'circle'}, [
      ['div', {class: 'grid'}, [
        ['div', {class: 'horizontal'}],
        ['div', {class: 'vertical'}],
        ['div', {class: 'axis'}],
      ]],
      ['p', {class: 'text'}, '0'],
    ], axes_selector);

    axes.push({axis: $$(div, '.axis'), value: $$(div, '.text')});
  }

  for (let ndx = 0; ndx < gamepad.buttons.length; ++ndx){
    const div = $add('div', {class: 'button efy_trans_filter'}, [
      ['p', {class: 'index'}, '0'], ['hr'], ['p', {class: 'value'}, '0.00']
    ], buttons_selector);

    $$(div, '.index').textContent = ndx;
    buttons.push({circle: div, value: $$(div, '.value')});
  }

  gamepads_by_index[gamepad.index] = {
    gamepad, map, axes, buttons,
    index: $$(map, '.index'), id: $$(map, '.id'),
    mapping: $$(map, '.mapping'), connected: $$(map, '.connected')
  };

  $add('div', {class: 'vibration', efy_select: ''}, [
    ['div', {efy_lang: 'vibration', efy_range_text: 'Intensity'}, [
      ['input', {type: 'range', id: 'vibration_intensity', min: 0.02, max: 1, step: 0.01, value: 0.5}]
    ]],
    ['div', {efy_lang: 'time', efy_range_text: 'Time'}, [
      ['input', {type: 'range', id: 'vibration_duration', min: 0.05, max: 5, step: 0.05, value: 3}]
    ]]
  ], map);

  vibration_fn();
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

function connect_gamepad(e){ add_gamepad_if_new(e.gamepad); $notify('short', 'Connected', '')}
function disconnect_gamepad(e){ remove_gamepad(e.gamepad); $notify('short', 'Disconnected', '')}

const keys = ['index', 'id', 'connected', 'mapping', /*'timestamp'*/];
function process_gamepad(info){
  const {map, gamepad, axes, buttons} = info, lines = [`gamepad  : ${gamepad.index}`];
  for (const key of keys){ info[key].textContent = gamepad[key]}
  axes.forEach(({axis, value}, ndx)=>{
    const off = ndx * 2;
    axis.style.left = `calc(${gamepad.axes[off].toFixed(2) * 50}% + 50% - 6rem)`;
    axis.style.top = `calc(${gamepad.axes[off + 1].toFixed(2) * 50}% + 50% - 6rem)`;
    value.textContent = `${gamepad.axes[off].toFixed(2).padStart(5)},${gamepad.axes[off + 1].toFixed(2).padStart(5)}`;
  });
  buttons.forEach(({circle, value}, ndx)=>{
    const button = gamepad.buttons[ndx];
    circle.classList.toggle('active', button.pressed);
    value.textContent = `${button.value.toFixed(2)}`;
  });

  let last_execution_time = 0;

  function run_buttons(){
    const current_time = Date.now();
    if (current_time - last_execution_time >= 1000){ // Check if at least 1 second has passed since the last execution
      if (gamepad.buttons[0].pressed){ next_focus(); last_execution_time = current_time} //B
      //DPad
      if (gamepad.buttons[12].pressed){ next_focus(-1); last_execution_time = current_time} //Up
      if (gamepad.buttons[13].pressed){ next_focus(1); last_execution_time = current_time} //Down
      //Left Stick
      if (gamepad.axes[1] < -0.3){ next_focus(-1); last_execution_time = current_time} //Up
      if (gamepad.axes[1] > 0.3){next_focus(1); last_execution_time = current_time} //Down
      if (gamepad.axes[0] < -0.3){ next_focus('left'); last_execution_time = current_time} //Left
      if (gamepad.axes[0] > 0.3){next_focus('right'); last_execution_time = current_time} //Right
    }
  }; run_buttons();
}

function next_focus(x = 'click'){ //next or prev
  const focusable = Array.from($all("a, button, input, select, textarea, summary, [tabindex], [contenteditable]"))
    .filter(function($e){ // Exclude disabled elements & those with a negative tabindex
      return !$e.disabled && ($e.getAttribute("tabindex") === null || parseInt($e.getAttribute("tabindex")) >= 0);
    }).sort(function($a, $b){ // Sort by tabIndex, with 0 and -1 treated differently
      const index = [($a.tabIndex === 0) ? Infinity : $a.tabIndex, ($b.tabIndex === 0) ? Infinity : $b.tabIndex];
      return index[0] - index[1];
    });

  // Find the current active element and its index
  const active_element = document.active_element, active_index = focusable.indexOf(active_element);
  // Focus next / prev element
  const current = focusable[(active_index) % focusable.length];

  try { const nextElement = focusable[(active_index + x) % focusable.length], up_down = (x == -1) || (x == 1);

    if (current.matches('[type=range]') || current.matches('[type=number]')){
      if (x == 'left'){ current.stepDown(); current.dispatchEvent(new Event('input', {bubbles: true}))}
      else if (x == 'right'){ current.stepUp(); current.dispatchEvent(new Event('input', {bubbles: true}))}
      else if (up_down){ nextElement.focus()}
    }
    else if (current.matches('summary')){ console.log('details')
      if (x == 'click'){ current.parentElement.open = !current.parentElement.open}
      else if (up_down){ nextElement.parentElement.setAttribute('tabindex', '-1'); nextElement.parentElement.focus()}
    } else {
      if (x == 'click'){ current.click()}
      else if (up_down){ nextElement.focus()}
    }

} catch {}}


function add_new_gamepads(){ const gamepads = navigator.getGamepads();
  for (let i = 0; i < gamepads.length; i++){
    const gamepad = gamepads[i];
    if (gamepad) add_gamepad_if_new(gamepad);
}}

$event(window, 'gamepadconnected', connect_gamepad);
$event(window, 'gamepaddisconnected', disconnect_gamepad);


let last_execution_time = Date.now();

function process(){
  const now = Date.now();
  if (now - last_execution_time >= 10){ // Every 10 frames
    add_new_gamepads();
    Object.values(gamepads_by_index).forEach(process_gamepad);
    last_execution_time = now;
  }
  requestAnimationFrame(process);
}
requestAnimationFrame(process);


/*Vibration*/ const vibration_fn =()=>{

  function test_gamepad_vibration(intensity, duration){
    const gamepad = navigator.getGamepads()[0]; // 1st Gamepad
    if (gamepad && gamepad.vibrationActuator){
      gamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0, duration: duration * 1000, // miliseconds
        weakMagnitude: intensity, strongMagnitude: intensity,
      });
  }}

  $event($('#vibration_intensity'), 'input', ()=>{
    const intensity = event.target.value, duration = $('#vibration_duration').value;
    test_gamepad_vibration(intensity, duration)
  });

  $event($('#vibration_duration'), 'input', ()=>{
    const duration = event.target.value, intensity = $('#vibration_intensity').value;
    test_gamepad_vibration(intensity, duration)
  });

};

});