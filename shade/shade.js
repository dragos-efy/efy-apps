let map = {}, score = 0, lives = 3, falling = false, jump_lock = 0;

$ready('#efy_sbtheme', ()=>{

$root.classList.add('gamepad_scroll_force');


const start = $add('div', {efy_tabs: 'controls', id: 'start_container', class: 'efy_trans_filter', efy_card: ''}, [
    ['h1', 'SHADE · DEMO'],
    ['hr'],
    ['div', {class: 'rules'}, [
        ['li', 'Find the portal & collect points to increase your score'],
        ['li', 'Touching enemies kills you, so avoid them'],
    ]],
    ['hr'],
    ['div', {class: 'efy_tabs'}, [
        ['input', {efy_tab: 'keyboard', type: 'radio', id: 'keyboard', efy_active: ''}],
        ['label', {for: 'keyboard'}, [['i', {efy_icon: 'dots'}], ['p', 'Keyboard']]],
        ['input', {efy_tab: 'gamepad', type: 'radio', id: 'gamepad'}],
        ['label', {for: 'gamepad'}, [['i', {efy_icon: 'gamepad'}], ['p', 'Gamepad']]],
        ['input', {efy_tab: 'touchscreen', type: 'radio', id: 'touchscreen'}],
        ['label', {for: 'touchscreen'}, [['i', {efy_icon: 'group'}], ['p', 'Touchscreen']]],
    ]],
    ['hr'],
    ['div', {efy_content: 'keyboard', efy_active: ''}, [
        ['li', [
            ['p', 'Move & Jump: '],
            ['i', {efy_icon: 'arrow_left'}], ['i', {efy_icon: 'arrow_down'}], ['i', {efy_icon: 'arrow'}], ['i', {efy_icon: 'arrow_up'}]
        ]],
        ['hr'],
        ['li', [ ['p', 'Reset: '], ['p', {class: 'key'}, 'R'] ]],
        ['hr'],
        ['li', [ ['p', 'Read: '], ['p', {class: 'key'}, 'Z'] ]],
    ]],
    ['div', {efy_content: 'gamepad'}, [
        ['li', [
            ['p', 'Move & Jump: '],
            ['i', {efy_icon: 'move'}], ['p', '/'], ['i', {efy_icon: 'gamepad_stick_l'}], ['p', '+'], ['i', {efy_icon: `gamepad_${gamepad_maps.ok[1]}`}]
        ]],
        ['hr'],
        ['li', [ ['p', 'Move Camera: '], ['i', {efy_icon: 'gamepad_stick_r'}] ]],
        ['hr'],
        ['li', [ ['p', 'Reset: '], ['i', {efy_icon: `gamepad_${gamepad_maps.yes[1]}`}] ]],
        ['hr'],
        ['li', [ ['p', 'Read: '], ['i', {efy_icon: `gamepad_${gamepad_maps.no[1]}`}] ]],
    ]],
    ['div', {efy_content: 'touchscreen'}],
    ['hr'],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start'}, [['i', {efy_icon: 'play'}], ['p', 'Start']]],
        ['button', {id: 'back', onClick: 'window.history.go(-1);'}, [['i', {efy_icon: 'chevron_left'}], ['p', 'Back']]],
        ['button', {class: 'efy_quick_fullscreen fullscreen'}, [['i', {efy_icon: 'fullscreen'}], ['p', 'Fullscreen']]],
        ['button', {efy_sidebar_btn: ''}, [['i', {efy_icon: 'menu'}], ['p', 'Menu']]]
    ]]
]);

let shade_audio = [];

['menu.webm', 'shade.webm', 'wind2.mp3', 'oof.mp3', 'coin.mp3'].map((a,i)=>{
    const name = a.split('.')[0];
    shade_audio[name] = new Audio(`./assets/${a}`);
    shade_audio[name].volume = efy_audio.volume
});
$event($body, 'click', ()=>{ $audio_play(shade_audio.menu, 'loop')}, {once: true});

$event($$(start, 'button'), 'click', ()=>{ start.remove();

process_stick_left =()=>{};

shade_audio.menu.pause(); $audio_play(shade_audio.shade, 'loop');
const confetti = $add('video', {id: 'confetti', src: './assets/confetti.webm'});


/*Level File Loaded*/ $ready('.shade_level', (shade_level)=>{ shade_level.onload =()=>{


try { $all('#gameContainer, .status, .animation, .shade_level').forEach(x => x.remove())} catch {}

$add('div', {id: 'gameContainer', class: 'gamepad_scroll'}, [
    ['div', {id: 'player'}], ['div', {id: 'player_view'}],
    ['div', {id: 'enemy', style: 'left: 300rem; bottom: 0rem'}],
]);
$add('div', {class: 'status efy_trans_filter'}, [
    ['div', {class: 'efy_flex'}, [ ['i', {efy_icon: 'heart'}], ['div', {id: 'lives'}, '3'] ]],
    ['div', {class: 'efy_flex'}, [ ['i', {efy_icon: 'shade_score'}], ['div', {id: 'score'}, '0'] ]]
]);


const container = $('#gameContainer'), player = $('#player'), player_view = $('#player_view'),
scoreElement = $('#score'), livesElement = $('#lives'), solids = $all('.solid');

function level_add(map){
    const class_name_map = {solids: 'solid efy_trans_filter', points: 'point', enemies: 'enemy solid', messages: 'message', portal: 'portal'};
    for (const key in map) {
        map[key].replace(/  /g, ' ').replace(/, /g, ',').replace(/,/g, ',').replace(/\n/g, '').split(',').forEach(a =>{
            const xy = a.split(' ');
            const corner = xy[2] ? {corner: xy[2]} : null;
            const size = xy[3] ? `width: ${xy[3] * 40}rem; height: ${xy[4] * 40}rem` : '';
            $add('div', {class: class_name_map[key], style: `left: ${xy[0] * 40}rem; bottom: ${xy[1] * 40}rem; ${size}`,...corner}, '', container);
        });
    }
}

level_add(map)


if (!efy.text_zoom) efy.text_zoom = 1;

const level_width = $root.scrollWidth / efy.text_zoom, test = $('.solid');

// Update player position based on gravity
function updatePlayerPosition() {
    if (!falling) return;
    const playerBottom = parseInt(player.style.bottom);
    const playerTop = playerBottom + player.offsetHeight;
    const playerLeft = parseInt(player.style.left);
    const playerRight = playerLeft + player.offsetWidth;

    // Check for collision with solid objects
    let collisionDetected = false;
    solids.forEach(solid => {
        const solidBottom = parseInt(solid.style.bottom);
        const solidTop = solidBottom + solid.offsetHeight;
        const solidLeft = parseInt(solid.style.left);
        const solidRight = solidLeft + solid.offsetWidth;
    });

    if (!collisionDetected) {
        player.style.bottom = (playerBottom - 5) + 'rem';
    } else { falling = false}
}

$all('.enemy').forEach((enemy, i)=>{
  const initialLeftPosition = parseInt(enemy.style.left, 10);
  const animationDuration = 10 + i; // milliseconds

  const range = map.enemies.replaceAll(', ', ',').split(',')[i].split(' ')[5];

  // Calculate the ending position
  const endingPosition = initialLeftPosition + (range ? Number(range) : 320);

  // Define the animation
  const animation = `@keyframes enemy${i} {
    0%, 100% {left: ${initialLeftPosition}rem;}
    50% {left: ${endingPosition}rem;}
  }`;

  $add('style', {class: 'animation'}, String(animation), $body);

  // Apply the animation to the div
  enemy.style.animation = `enemy${i} ${animationDuration}s infinite, point 3s infinite`;
});

// Gravity
setInterval(() => {
    falling = true;
    try {
        $all('.solid').forEach(solid =>{
            if ((checkCollision(player, solid)) === true){ falling = false; jump_lock = 0}
        })
        $all('.portal').forEach(portal =>{ if ((checkCollision(player, portal)) === true){
            shade_audio.shade.pause();
            confetti.currentTime = 0; confetti.play(); player.remove(); portal.remove();
            $notify('short', 'Congrats 🎉', 'You won!');
        }})
    } catch {}
    updatePlayerPosition();
    updatePlayerPosition2();
    // enemies();
}, 5); // Adjust the interval for smoother or faster falling

// Player movement

let keysPressed = {};

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'r': resetLevel(); break;
        case 'n' : $add('script', {class: 'shade_level', src: './shade/level2.js'}); break;
        case 'ArrowLeft': event.preventDefault(); break;
        case 'ArrowRight': event.preventDefault(); break;
        case 'ArrowUp': event.preventDefault(); $audio_play(shade_audio.wind2); break;
        case 'ArrowDown': event.preventDefault(); break;
    }
    keysPressed[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
    jump_lock = 5; falling = true;
});

let enemy_touch_time = 0;

function updatePlayerPosition2() {
    let [newX, newY] = [parseInt(player.style.left), parseInt(player.style.bottom)];

    if (keysPressed['ArrowLeft']) {
        if (newX >= 0){ newX -= 2; falling = true; $root.scrollBy(-2 / efy.text_zoom, 0)}
    }

    if (keysPressed['ArrowRight']){
        if ((newX < level_width - player.offsetWidth)){ newX += 2; falling = true}
        if (
            (newX > (level_width + player.offsetWidth - $root.offsetWidth)) &&
            (newX < level_width - player.offsetWidth)
        ) {$root.scrollBy(2 / efy.text_zoom, 0)}
    }

    if (keysPressed['ArrowUp']) {
        if (jump_lock <= 30) {newY += 10; jump_lock++;}
        if (newY < 0){ newY = 0} // Prevent moving off-screen
    }
    if (keysPressed['ArrowDown']) {
        if (newY < 0){ newY = 0} // Prevent moving off-screen
        else {newY -= 2}
    }

    try { $all('.point').forEach(point =>{
        if ((checkCollision(player, point)) === true) increaseScore(point) })
    } catch {}
    try { $all('.enemy').forEach(enemy =>{
        if (checkCollision(player, enemy) === true){
            if (enemy_touch_time === 30){
                enemy_touch(enemy); enemy_touch_time = 0; $audio_play(shade_audio.oof);
                newX += 100; player.style.left = newX + 'rem'; player_view.style.left = `calc(${newX}rem - 100%)`;
                newY += 60; player.style.botttom = newX + 'rem'; player_view.style.botttom = `calc(${newX}rem - 100%)`;
            }
            else { enemy_touch_time++}
        }
    })} catch {}

    if (newY < 0) newY = 0; // Prevent moving off-screen

    player.style.left = newX + 'rem';
    player.style.bottom = newY + 'rem';

    player_view.style.left = `calc(${newX}rem - 100%)`;
    player_view.style.bottom = newY + 'rem';
    player_view.style.width = '200%';
}


function increaseScore(point){
    try { score++; scoreElement.textContent = score; point.remove(); $audio_play(shade_audio.coin); vibration_fn()}
    catch {}
}

function enemy_touch(){
    try { lives--; livesElement.textContent = lives; vibration_fn(1, 0.1)}
    catch {}
}

function resetLevel(){
    player.style.left = '20rem'; player.style.bottom = '600rem';
    score = 0; scoreElement.textContent = score;
    $root.scrollTo(0, 0);
}

function checkCollision(a1, a2){
    const x1 = a1.getBoundingClientRect();
    const x2 = a2.getBoundingClientRect();
    // Check Overlap
    if (x1.left <= x2.right && x1.right >= x2.left && x1.top <= x2.bottom && x1.bottom >= x2.top){
        return true; falling = false;
    } else { return false; player.style.bottom = (playerBottom - 5) + 'rem'}
}

resetLevel();


const gamepads_selector = $add('div', {id: 'gamepads'}), gamepads_by_index = {};

function add_gamepad(gamepad){
  const axes = [], buttons = [];
  gamepads_by_index[gamepad.index] = {gamepad, map, axes, buttons};
}

function remove_gamepad(gamepad){
  const info = gamepads_by_index[gamepad.index];
  if (info){
    delete gamepads_by_index[gamepad.index];
}}

function add_gamepad_if_new(gamepad){
  const info = gamepads_by_index[gamepad.index];
  info ? info.gamepad = gamepad : add_gamepad(gamepad);
}

function connect_gamepad(e){ add_gamepad_if_new(e.gamepad)}
function disconnect_gamepad(e){ remove_gamepad(e.gamepad)}

const keys = ['index', 'id', 'connected', 'mapping', /*'timestamp'*/];
function process_gamepad(info){
  const {map, gamepad, axes, buttons} = info, lines = [`gamepad  : ${gamepad.index}`];
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

         ///////////////

         let newX = parseInt(player.style.left);
         let newY = parseInt(player.style.bottom);

         ///////////////

         // if (gamepad.buttons[0].pressed){ last_execution_time = current_time} //B

         //Left Stick

         /*Left*/ if (gamepad.axes[0] < -0.3){
             if (newX >= 0){ newX -= 4; falling = true; $root.scrollBy(-4 / efy.text_zoom, 0)}
             last_execution_time = current_time
         }
         /*Right*/ if (gamepad.axes[0] > 0.3){
             if ((newX < level_width - player.offsetWidth)){ newX += 4; falling = true}
             if (
                 (newX > (level_width + player.offsetWidth - $root.offsetWidth)) &&
                 (newX < level_width - player.offsetWidth)
             ){ $root.scrollBy(4 / efy.text_zoom, 0)}
             last_execution_time = current_time
         }
         /*Down*/ if (gamepad.axes[1] > 0.3){ console.log('down');
             if (newY >= 0){ newY -= 4; $root.scrollBy(-4 / efy.text_zoom, 0)}
             last_execution_time = current_time
         }
         // /*Ok Button*/ if (!gamepad.buttons[1].pressed){ jump_lock = 5; falling = true}

         ////////////

         if (newY < 0) newY = 0; // Prevent moving off-screen

         player.style.left = newX + 'rem';
         player.style.bottom = newY + 'rem';

         player_view.style.left = `calc(${newX}rem - 100%)`;
         player_view.style.bottom = newY + 'rem';
         player_view.style.width = '200%';

    }
  }; run_buttons();
}


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
  if (now - last_execution_time >= 1){ // Every 1 frame
    add_new_gamepads();
    Object.values(gamepads_by_index).forEach(process_gamepad);
    last_execution_time = now;
  }
  requestAnimationFrame(process);
}
requestAnimationFrame(process);


/*Vibration*/ const vibration_fn =(intensity = 0.02, duration = 0.05)=>{
    const gamepad = navigator.getGamepads()[0]; // 1st Gamepad
    if (gamepad && gamepad.vibrationActuator){
      gamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0, duration: duration * 1000, // miliseconds
        weakMagnitude: intensity, strongMagnitude: intensity,
      });
    }
};

restore_gamepad_maps =()=>{
    gamepad_maps.functions = 'shade';
    gamepad_maps.speed = 0.005;
    gamepad_maps.ok[2] =()=>{
        let newY = parseInt(player.style.bottom);
        if (jump_lock <= 20) {newY += 20; jump_lock++}
        if (newY < 0) newY = 0; // Prevent moving off-screen
        player.style.bottom = newY + 'rem';
        player_view.style.bottom = newY + 'rem';
        player_view.style.width = '200%';
    };
    gamepad_maps.yes[2] =()=>{ resetLevel()}
}; restore_gamepad_maps();

} });

$add('script', {class: 'shade_level', src: './shade/level1.js'});

console.log('shade: fully loaded');

});

});