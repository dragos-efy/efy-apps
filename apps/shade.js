let map = {};

$ready('#efy_sbtheme', ()=>{


const start = $add('div', {id: 'start_container', class: 'efy_trans_filter', efy_card: ''}, [
    ['h1', {}, 'SHADE · DEMO'],
    ['hr'],
    ['h6', {}, 'Rules'],
    ['hr'],
    ['li', {}, '• Find the portal & collect points to increase your score'],
    ['li', {}, '• Touching enemies kills you, so avoid them'],
    ['hr'],
    ['h6', {}, 'Controls'],
    ['hr'],
    ['li', {}, [
        ['p', {}, 'Move & Jump: '],
        ['i', {efy_icon: 'arrow_left'}], ['i', {efy_icon: 'arrow_down'}], ['i', {efy_icon: 'arrow'}], ['i', {efy_icon: 'arrow_up'}]
    ]],
    ['hr'],
    ['li', {}, [ ['p', {}, 'Reset: '], ['p', {class: 'key'}, 'R'] ]],
    ['hr'],
    ['li', {}, [ ['p', {}, 'Next Level: '], ['p', {class: 'key'}, 'N'] ]],
    ['hr'],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start'}, 'Start'],
        ['button', {class: 'efy_quick_fullscreen fullscreen efy_square_btn'}, [['i', {efy_icon: 'fullscreen'}]] ]
    ]]
]);

$event($$(start, 'button'), 'click', ()=>{ start.remove();
const confetti = $add('video', {id: 'confetti', src: './apps/assets/confetti.webm'});


/*Level File Loaded*/ $ready('.shade_level', (shade_level)=>{ shade_level.onload =()=>{


try { $all('#gameContainer, .status, .animation, .shade_level').forEach(x => x.remove())} catch {}

$add('div', {id: 'gameContainer'}, [
    ['div', {id: 'player'}], ['div', {id: 'player_view'}],
    ['div', {id: 'enemy', style: 'left: 300px; bottom: 0px'}],
]);
$add('div', {class: 'status efy_trans_filter'}, [
    ['div', {class: 'efy_flex'}, [ ['i', {efy_icon: 'heart'}], ['div', {id: 'lives'}, '3'] ]],
    ['div', {class: 'efy_flex'}, [ ['i', {efy_icon: 'shade_score'}], ['div', {id: 'score'}, '0'] ]]
]);


const container = $('#gameContainer'), player = $('#player'), player_view = $('#player_view'),
scoreElement = $('#score'), livesElement = $('#lives'), solids = $all('.solid');
let score = 0, lives = 3, falling = false, jump_lock = 0;

function level_add(map){
    const classNameMap = {solids: 'solid efy_trans_filter', points: 'point', enemies: 'enemy solid', portal: 'portal'};
    for (const key in map) {
        map[key].replace(/  /g, ' ').replace(/, /g, ',').replace(/,/g, ',').replace(/\n/g, '').split(',').forEach(a =>{
            const xy = a.split(' ');
            const corner = xy[2] ? {corner: xy[2]} : null;
            const size = xy[3] ? `width: ${xy[3] * 40}rem; height: ${xy[4] * 40}rem` : '';
            $add('div', {class: classNameMap[key], style: `left: ${xy[0] * 40}px; bottom: ${xy[1] * 40}px; ${size}`,...corner}, '', container);
        });
    }
}

level_add(map)


const level_width = $root.scrollWidth, test = $('.solid');

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
        player.style.bottom = (playerBottom - 5) + 'px';
    } else { falling = false}
}

let enemy_range = 0;

$all('.enemy').forEach((enemy, i)=>{
  const initialLeftPosition = parseInt(enemy.style.left, 10);
  const animationDuration = 10 + i; // Duration of the animation in milliseconds

  // Calculate the ending position
  const endingPosition = initialLeftPosition + 300 + (i * 250);

  // Define the animation
  const animation = `@keyframes enemy${i} {
    0%, 100% {left: ${initialLeftPosition}px;}
    50% {left: ${endingPosition}px;}
  }`;

  $add('style', {class: 'animation'}, String(animation), $body);

  // Apply the animation to the div
  enemy.style.animation = `enemy${i} ${animationDuration}s infinite, point 3s infinite`;
});

// Gravity
setInterval(() => {
    falling = true;
    try {
        $all('.solid').forEach(solid =>{ if ((checkCollision(player, solid)) === true) falling = false })
        $all('.portal').forEach(portal =>{ if ((checkCollision(player, portal)) === true){
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
        case 'n' : $add('script', {class: 'shade_level', src: './apps/shade/level2.js'}); break;
        case 'ArrowLeft': event.preventDefault(); break;
        case 'ArrowRight': event.preventDefault(); break;
        case 'ArrowUp': event.preventDefault(); break;
        case 'ArrowDown': event.preventDefault(); break;
    }
    keysPressed[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
    jump_lock = 5; falling = true;
});

function updatePlayerPosition2() {
    let newX = parseInt(player.style.left);
    let newY = parseInt(player.style.bottom);

    if (keysPressed['ArrowLeft']) {
        if (newX >= 0){ newX -= 2; falling = true; $root.scrollBy(-2, 0)}
    }

    if (keysPressed['ArrowRight']){
        if ((newX < level_width - player.offsetWidth)){ newX += 2; falling = true}
        if (
            (newX > (level_width + player.offsetWidth - $root.offsetWidth)) &&
            (newX < level_width - player.offsetWidth)
        ) {$root.scrollBy(2, 0)}
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
        if ((checkCollision(player, enemy)) === true) enemy_touch(enemy) })
    } catch {}

    if (newY < 0) newY = 0; // Prevent moving off-screen

    player.style.left = newX + 'px';
    player.style.bottom = newY + 'px';

    player_view.style.left = `calc(${newX}px - 100%)`;
    player_view.style.bottom = newY + 'px';
    player_view.style.width = '200%';
}


function increaseScore(point){
    try { score++; scoreElement.textContent = score; point.remove(); vibration_fn()}
    catch {}
}

function enemy_touch(){
    try { lives--; livesElement.textContent = lives; vibration_fn(1, 0.1)}
    catch {}
}

function resetLevel(){
    player.style.left = '20px'; player.style.bottom = '600px';
    score = 0; scoreElement.textContent = score;
    $root.scrollTo(0, 0);
}

function checkCollision(a1, a2){
    const x1 = a1.getBoundingClientRect();
    const x2 = a2.getBoundingClientRect();
    // Check Overlap
    if (x1.left <= x2.right && x1.right >= x2.left && x1.top <= x2.bottom && x1.bottom >= x2.top){
        return true; falling = false;
    } else { return false; player.style.bottom = (playerBottom - 5) + 'px'}
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

function connect_gamepad(e){ add_gamepad_if_new(e.gamepad); $notify('short', 'Connected', '')}
function disconnect_gamepad(e){ remove_gamepad(e.gamepad); $notify('short', 'Disconnected', '')}

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
             if (newX >= 0){ newX -= 4; falling = true; $root.scrollBy(-4, 0)}
             last_execution_time = current_time
         }
         /*Right*/ if (gamepad.axes[0] > 0.3){
             if ((newX < level_width - player.offsetWidth)){ newX += 4; falling = true}
             if (
                 (newX > (level_width + player.offsetWidth - $root.offsetWidth)) &&
                 (newX < level_width - player.offsetWidth)
             ){ $root.scrollBy(4, 0)}
             last_execution_time = current_time
         }
         /*ZR Button*/ if (gamepad.buttons[7].pressed){
             if (jump_lock <= 30) {newY += 20; jump_lock++;}
             if (newY < 0){ newY = 0} // Prevent moving off-screen
             last_execution_time = current_time
         } else {
             jump_lock = 5; falling = true;
        }

         ////////////

         if (newY < 0) newY = 0; // Prevent moving off-screen

         player.style.left = newX + 'px';
         player.style.bottom = newY + 'px';

         player_view.style.left = `calc(${newX}px - 100%)`;
         player_view.style.bottom = newY + 'px';
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
  if (now - last_execution_time >= 10){ // Every 10 frames
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


} });

$add('script', {class: 'shade_level', src: './apps/shade/level1.js'});

console.log('test')

});

});