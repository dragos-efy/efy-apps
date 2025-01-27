/*Storage*/ let  efy_sd = {}, $sd_save =()=>{}, alpha_textures = null;
try {
    $sd_save =()=>{localStorage.efy_sd = JSON.stringify(efy_sd)}
    if (localStorage.efy_sd){ efy_sd = JSON.parse(localStorage.efy_sd)}
    else {efy_sd.alpha_textures = true; $sd_save()}
} catch {}

let map = {}, score = 0, lives = 3, falling = false, jump_lock = 20, parallax_bg = true, bg_x = 0;

$ready('#efy_sbtheme', ()=>{

/*Temporary Fix*/ try { if (gamepad_maps){}} catch { gamepad_maps = {ok: ['', ''], yes: ['', ''], no: ['', '']} }

$root.classList.add('gamepad_scroll_force');

if (efy_sd.alpha_textures){
    $root.classList.add('shade_alpha_textures');
    alpha_textures = {checked: true};
}

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
    ['div', {efy_select: ''}, [
        ['input', {type: 'checkbox', id: 'shade_alpha_textures', ...alpha_textures}],
        ['label', {for: 'shade_alpha_textures'}, 'Alpha Textures']
    ]],
    ['hr'],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start'}, [['i', {efy_icon: 'play'}], ['p', 'Start']]],
        ['button', {id: 'back', onClick: 'window.history.go(-1);'}, [['i', {efy_icon: 'chevron_left'}], ['p', 'Back']]],
        ['button', {class: 'efy_quick_fullscreen fullscreen'}, [['i', {efy_icon: 'fullscreen'}], ['p', 'Fullscreen']]],
        ['button', {efy_sidebar_btn: ''}, [['i', {efy_icon: 'menu'}], ['p', 'Menu']]]
    ]]
]);

$event(start, 'input', ()=>{ const x = event.target;
    if (x.matches('#shade_alpha_textures')){
        $root.classList.toggle('shade_alpha_textures');
        efy_sd.alpha_textures = x.checked; $sd_save();
    }
});

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
    ['div', {id: 'player'}]
]);
$add('div', {class: 'status efy_trans_filter'}, [
    ['div', {class: 'efy_flex'}, [ ['i', {efy_icon: 'heart'}], ['div', {id: 'lives'}, '3'] ]],
    ['div', {class: 'efy_flex'}, [ ['i', {efy_icon: 'shade_score'}], ['div', {id: 'score'}, '0'] ]]
]);


const container = $('#gameContainer'), player = $('#player'),
scoreElement = $('#score'), livesElement = $('#lives'), solids = $all('.solid');

function level_add(map){
    const class_name_map = {
        solid: 'solid efy_trans_filter',
        solid2: 'solid solid2 efy_trans_filter',
        solid_roof: 'solid solid_roof efy_trans_filter',
        plant1: 'plant1',
        lights: 'light',
        lamps: 'lamp',
        points: 'point',
        enemies: 'enemy solid',
        messages: 'message',
        portal: 'portal'
    };
    for (const key in map) {
        map[key].replace(/  /g, ' ').replace(/, /g, ',').replace(/,/g, ',').replace(/\n/g, '').split(',').forEach(a =>{
            const xy = a.split(' ');
            const corner = xy[2] ? {corner: xy[2]} : null;
            const size = xy[3] ? `width: ${xy[3] * 40}rem; height: ${xy[4] * 40}rem` : '';
            const oklch = xy[5] ? `--oklch: ${xy[5].split('_').join(' ')};` : '';
            $add('div', {class: class_name_map[key], style: `translate: ${xy[0] * 40}rem ${xy[1] * -40}rem; ${size}; ${oklch}`,...corner}, '', container);
        });
    }
}

level_add(map)


if (!efy.text_zoom) efy.text_zoom = 1;
const level_width = $root.scrollWidth / efy.text_zoom, test = $('.solid');

let x, y;

const update_player_xy =(selector = player)=>{
    [x,y] = selector.style.translate.replaceAll('rem', '').split(' ');
    [x, y] = [parseInt(x, 10), parseInt(y, 10)];
};

$all('.enemy').forEach((enemy, i)=>{
  update_player_xy(enemy);
  const range = map.enemies.replaceAll(', ', ',').split(',')[i].split(' ')[5];
  const end_position = range ? Number(range) : 320;
  const animationDuration = end_position / 320 + 5;
  const animation = `@keyframes enemy${i} {100% {transform: translateX(${end_position}rem)}}`;
  $add('style', {class: 'animation'}, String(animation), $body);
  enemy.style.animation = `enemy${i} ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate`;
});


///////////////

let observer; const visible_solids = new Set();

const handle_intersect =(entries)=>{ entries.forEach(a => {
    a.isIntersecting ? visible_solids.add(a.target) : visible_solids.delete(a.target);
})},
observe =(selector)=>{
    observer = new IntersectionObserver(handle_intersect);
    $all(selector).forEach(element => observer.observe(element));
},
get_visible_solids =()=>{ return Array.from(visible_solids)};

['solid'].forEach(a => observe(`.${a}`));

///////////////


// Gravity
setInterval(() => {
    falling = true;
    try {
        get_visible_solids().forEach(solid =>{
            if ((checkCollision(player, solid)) === true){ falling = false; jump_lock = 0}
        })
        $all('.portal').forEach(portal =>{ if ((checkCollision(player, portal)) === true){
            shade_audio.shade.pause();
            confetti.currentTime = 0; confetti.play(); player.remove(); portal.remove();
            $notify('short', 'Congrats 🎉', 'You won!');
        }})
    } catch {}
    updatePlayerPosition();
}, 5); // Adjust the interval for smoother or faster falling

// Player movement

let keys = {};

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'r': resetLevel(); break;
        case 'n' : $add('script', {class: 'shade_level', src: './shade/level2.js'}); break;
        case 'ArrowLeft': event.preventDefault(); break;
        case 'ArrowRight': event.preventDefault(); break;
        case 'ArrowUp': event.preventDefault(); $audio_play(shade_audio.wind2); break;
        case 'ArrowDown': event.preventDefault(); break;
    }
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    delete keys[event.key];
    jump_lock = 5; falling = true;
});

let enemy_touch_time = 0;


function updatePlayerPosition() {
    update_player_xy();

    /*Gravity Down*/ if (falling && jump_lock <= 30) y += 5;

    if (keys['ArrowLeft']) {
        if (x >= 0){ x -= 2; falling = true; $root.scrollBy(-2 / efy.text_zoom, 0)}
    }
    if (keys['ArrowRight']){
        if (x < level_width - player.offsetWidth){
            x += 2; falling = true;
            if (x > (level_width + player.offsetWidth - $root.offsetWidth)){
                $root.scrollBy(2 / efy.text_zoom, 0);
            }
        }
    }
    if (keys['ArrowUp']) {
        if (jump_lock < 30) {y -= 10; jump_lock++;}
        if (y > 0){ y = 0} // Prevent Off-Screen
    }
    if (keys['ArrowDown']){ y = (y > 0) ? 0 : y + 2}

    try { $all('.point').forEach(point =>{
        if ((checkCollision(player, point)) === true) increaseScore(point) })
    } catch {}
    try { $all('.enemy').forEach(enemy =>{
        if (checkCollision(player, enemy) === true){
            if (enemy_touch_time === 30){
                enemy_touch(enemy); enemy_touch_time = 0;
                $audio_play(shade_audio.oof);
                x += 100; y -= 60;
            }
            else { enemy_touch_time++}
        }
    })} catch {}

    player.style.translate = `${x}rem ${y}rem`;
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
    player.style.translate = '20rem -600rem';
    score = 0; scoreElement.textContent = score;
    $root.scrollTo(0, 0);
}

function checkCollision(a1, a2){
    const x1 = a1.getBoundingClientRect();
    const x2 = a2.getBoundingClientRect();
    // Check Overlap
    if (x1.left <= x2.right && x1.right >= x2.left && x1.top <= x2.bottom && x1.bottom >= x2.top){
        return true; falling = false;
    } else { return false}
}

resetLevel();

restore_gamepad_maps =()=>{
    gamepad_maps.functions = 'shade';
    gamepad_maps.speed_buttons = 0.005;
    gamepad_maps.speed_stick_l = 0.01;
    gamepad_maps.global_before =()=> update_player_xy();
    gamepad_maps.global_after =()=>{ player.style.translate = `${x}rem ${y}rem`};
    gamepad_maps.ok[2] =()=>{ if (jump_lock <= 20) {y -= 20; jump_lock++}};
    gamepad_maps.l_down =()=>{ if (y <= 0) y += 8};
    gamepad_maps.l_left =()=>{
        if (x >= 0){
            x -= 8; falling = true;
            $root.scrollBy(-8 / efy.text_zoom, 0);
            if (parallax_bg && bg_x < 0){ bg_x += 8; $css_prop(`---sh-bg-offset-x`, bg_x + 'rem')}
        }
    };
    gamepad_maps.l_right =()=>{
        if ((x < level_width - player.offsetWidth)){ x += 8; falling = true}
        if (x > 400 && (x < level_width - player.offsetWidth)){
            $root.scrollBy(8 / efy.text_zoom, 0);
            if (parallax_bg && bg_x > -400){ bg_x -= 8; $css_prop(`---sh-bg-offset-x`, bg_x + 'rem')}
        }
    };
    gamepad_maps.r_left =()=>{ if (bg_x <= 0){
        bg_x += 8; $root.scrollBy(-16, 0);
        if (parallax_bg) $css_prop(`---sh-bg-offset-x`, bg_x + 'rem')
    }}
    gamepad_maps.r_right =()=>{ if (-1 * bg_x < level_width){
        bg_x -= 8; $root.scrollBy(16, 0);
        if (parallax_bg) $css_prop(`---sh-bg-offset-x`, bg_x + 'rem')
    }}
    gamepad_maps.down[2] =()=>{ gamepad_maps.l_down()};
    gamepad_maps.left[2] =()=>{ gamepad_maps.l_left()};
    gamepad_maps.right[2] =()=>{ gamepad_maps.l_right()};
    gamepad_maps.yes[2] =()=>{ resetLevel()}
}; restore_gamepad_maps();

} });

$add('script', {class: 'shade_level', src: './shade/level1.js'});

});

});