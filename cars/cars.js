$ready('#efy_sbtheme', ()=>{

/*Temporary Fix*/ try { if (gamepad_maps){}} catch { gamepad_maps = {ok: ['', ''], yes: ['', '']} }

const start = $add('div', {efy_tabs: 'controls', id: 'start_container', class: 'efy_trans_filter', efy_card: ''}, [
    ['h1', 'CARS · DEMO'],
    ['hr'],
    ['h2', {class: 'game_over efy_hide_i'}],
    ['hr'],
    ['div', {class: 'rules'}, [
        ['li', 'Avoid crashing into cars'],
        ['li', 'Collect points to increase your score'],
        ['li', 'Survive for as long as you can'],
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
            ['p', 'Move: '],
            ['i', {efy_icon: 'arrow_left'}], ['i', {efy_icon: 'arrow_down'}], ['i', {efy_icon: 'arrow'}], ['i', {efy_icon: 'arrow_up'}]
        ]],
        ['hr'],
        ['li', [ ['p', 'Reset: '], ['p', {class: 'key'}, 'R'] ]],
    ]],
    ['div', {efy_content: 'gamepad'}, [
        ['li', [
            ['p', 'Move: '],
            ['i', {efy_icon: 'move'}], ['p', '/'], ['i', {efy_icon: 'gamepad_stick_l'}], ['p', '+'], ['i', {efy_icon: `gamepad_${gamepad_maps.ok[1]}`}]
        ]],
        ['hr'],
        ['li', [ ['p', 'Move Camera: '], ['i', {efy_icon: 'gamepad_stick_r'}] ]],
        ['hr'],
        ['li', [ ['p', 'Reset: '], ['i', {efy_icon: `gamepad_${gamepad_maps.yes[1]}`}] ]]
    ]],
    ['div', {efy_content: 'touchscreen'}],
    ['hr'],
    ['div', {efy_range_text: 'Speed', efy_lang: 'speed'}, [
        ['input', {type: 'range', id: 'cs_speed', min: '1', max: '25', step: '1', value: '7'}]
    ]],
    ['hr'],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start'}, [['i', {efy_icon: 'play'}], ['p', 'Start']]],
        ['button', {id: 'back', onClick: 'window.history.go(-1);'}, [['i', {efy_icon: 'chevron_left'}], ['p', 'Back']]],
        ['button', {class: 'efy_quick_fullscreen fullscreen'}, [['i', {efy_icon: 'fullscreen'}], ['p', 'Fullscreen']]],
        ['button', {efy_sidebar_btn: ''}, [['i', {efy_icon: 'menu'}], ['p', 'Menu']]]
    ]]
]);

const speed = $('#cs_speed');
let player = { speed: 7, score: 0 };
speed.addEventListener('input', (e)=> {
    player.speed = Number(e.target.value);
    console.log(player.speed);
});

$event($$(start, '#start'), 'click', ()=>{
    start.classList.add('efy_hide_i');
    $('.game_over').classList.add('efy_hide_i');

const game_container = $add('div', {class: 'carGame'}, [
    ['div', {class: 'score efy_trans_filter'}, 'Score: 0'],
    ['div', {class: 'gameArea efy_trans_filter'}]
]);

const score = $('.score'), startScreen = $('#start'), gameArea = $('.gameArea');

let cars_audio = [];

['shade.webm', 'coin.mp3'].map((a,i)=>{
    const name = a.split('.')[0];
    cars_audio[name] = new Audio(`./assets/${a}`);
    cars_audio[name].volume = efy_audio.volume
});

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

    // gameArea.classList.remove('hide');
    gameArea.innerHTML = "";

    player.start = true;
    // $audio_play(cars_audio.shade, 'loop');
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(let i=0; i<5; i++){
        let roadLineElement = document.createElement('div');
        roadLineElement.setAttribute('class', 'roadLines');
        roadLineElement.y = (i*150);
        roadLineElement.style.top = roadLineElement.y + "px";
        gameArea.appendChild(roadLineElement);
    }

    let carElement = $add('i', {efy_icon: 'car', class: 'car'}, [], gameArea);

    player.x = carElement.offsetLeft;
    player.y = carElement.offsetTop  ;

    for(let i=0; i<3; i++){
        const top = ((i+1) * 350) * - 1;
        let enemyCar = $add('i', {
            efy_icon: 'car', class: 'enemyCar', style:
            `top: ${top}px; left: ${Math.floor(Math.random() * 350)}px; background-clip: text;`
        }, [], gameArea);
        enemyCar.y = top;
    }

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0"+ String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

function onCollision(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top >  bRect.bottom) || (aRect.bottom <  bRect.top) ||
        (aRect.right <  bRect.left) || (aRect.left >  bRect.right)); 
}

function onGameOver() {
    player.start = false;
    cars_audio.shade.pause();
    $audio_play(efy_audio.error);
    game_container.remove();
    start.classList.remove('efy_hide_i');
    startScreen.focus();
    $('.game_over').innerHTML = "Game Over! Final Score: " + player.score;
    $('.game_over').classList.remove('efy_hide_i');
}

function moveRoadLines(){
    let roadLines = $all('.roadLines');
    roadLines.forEach((item)=> {
        if(item.y >= 700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function moveEnemyCars(carElement){
    let enemyCars = $all('.enemyCar');
    enemyCars.forEach((item)=> {

        if (onCollision(carElement, item)) { onGameOver()}
        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
} 

function gamePlay() {
    let carElement = $('.car');
    let road = gameArea.getBoundingClientRect();

    if(player.start){
        moveRoadLines();
        moveEnemyCars(carElement);
            
        if(keys.ArrowUp && player.y > (road.top + 70)) player.y -= player.speed;
        if(keys.ArrowDown && player.y < (road.bottom - 85)) player.y += player.speed;
        if(keys.ArrowLeft && player.x > 0) player.x -= player.speed;
        if(keys.ArrowRight && player.x < (road.width - 70)) player.x += player.speed;

        carElement.style.top = player.y + "px";
        carElement.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);

        player.score++;
        const ps = player.score - 1;
        score.innerHTML = 'Score: ' + ps;          
    }
}

const keys_prevent =(e)=>{
    if (keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight) e.preventDefault();
};

document.addEventListener('keydown', (e)=>{ keys_prevent(e); keys[e.key] = true});
document.addEventListener('keyup', (e)=>{ keys_prevent(e); keys[e.key] = false});

});

});