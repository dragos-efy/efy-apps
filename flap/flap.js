$add('div', {id: 'game-container'});
$add('div', {id: 'score', efy_card: ''}, [['p', '0']]);
$add('div', {id: 'start-screen', efy_card: ''}, [
    ['h1', 'FLAP - DEMO'],
    ['div', {efy_lang: 'speed', efy_range_text: 'Speed'}, [
        ['input', {id: 'speed_slider', type: 'range', min: '1', max: '30', value: '10', step: '1'}]
    ]],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start_button', class: ''}, [['i', {efy_icon: 'play'}], ['p', 'Start']]],
        ['button', {class: 'efy_quick_fullscreen fullscreen'}, [['i', {efy_icon: 'fullscreen'}], ['p', 'Fullscreen']]],
        ['button', {efy_sidebar_btn: '', class: ''}, [['i', {efy_icon: 'menu'}], ['p', 'Menu']]]
    ]]
]);

const confetti = $add('video', {id: 'confetti', src: './assets/confetti.webm'});

const container = $('#game-container'), startScreen = $('#start-screen'),
start_button = $('#start_button'), scoreDisplay = $('#score p'),
speedSlider = $('#speed_slider');

let player, gameInterval, score = 0, gameSpeed, isGameRunning = false,
obstacle_width = 0, previous_width = 0, procedural = 0, player_rotate = 0, scale = 1;

const random_nr =(min, max, decimals = false)=>{
    const nr = Math.random() * (max - min) + min;
    return decimals ? nr.toFixed(2) : Math.floor(nr);
}

let audio = {};
'error'.split(' ').forEach(x => {
  audio[x] = new Audio(`./efy/audio/${x}.webm`); audio[x].volume = 1
});

'flap yay'.split(' ').forEach(x => {
  audio[x] = new Audio(`./assets/${x}.mp3`); audio[x].volume = 1
});

function createPlayer(){
    player = document.createElement('div');
    player.id = 'player';
    player.style.left = '0';
    player.style.top = '0';
    player.style.transform = `translateX(60rem) translateY(-20%) rotate(0deg) scale(${scale})`;
    container.appendChild(player);
}

function createObstacle(){
    const gapHeight = 320; // Total space for player to move
    const totalHeight = container.clientHeight;
    previous_width = obstacle_width;
    obstacle_width = random_nr(20, 300), right = (-1 * obstacle_width) + 'rem';

    // console.log(obstacle_width, previous_width, right);

    // Bottom obstacle
    const bottomObstacleHeight = Math.random() * (totalHeight - gapHeight) / 2;
    const bottomObstacle = document.createElement('div');
    bottomObstacle.classList.add('obstacle', 'bottom', 'efy-glass', 'efy_card_filter');
    bottomObstacle.style.height = `${bottomObstacleHeight}rem`;
    bottomObstacle.style.width = `${obstacle_width}rem`;
    bottomObstacle.style.right = right;
    bottomObstacle.style.bottom = '0';
    container.appendChild(bottomObstacle);

    // Top obstacle
    const topObstacleHeight = totalHeight - bottomObstacleHeight - gapHeight;
    const topObstacle = document.createElement('div');
    topObstacle.classList.add('obstacle', 'top', 'efy-glass', 'efy_card_filter');
    topObstacle.style.height = `${topObstacleHeight}rem`;
    topObstacle.style.width = `${obstacle_width}rem`;
    topObstacle.style.right = right;
    topObstacle.style.top = '0';
    container.appendChild(topObstacle);
}

function moveObstacles() {
    const obstacles = $all('.obstacle');
    obstacles.forEach((obs, i)=>{
        const currentPos = parseInt(obs.style.right || 0);
        obs.style.right = `${currentPos + gameSpeed}rem`;
        if (currentPos > container.clientWidth) obs.remove();
    });
}


function checkCollision(){
    if (!player) return;

    const playerRect = player.getBoundingClientRect();
    const obstacles = document.querySelectorAll('.obstacle');

    obstacles.forEach(obs => {
        const obsRect = obs.getBoundingClientRect();
        if (!(playerRect.right < obsRect.left ||
                playerRect.left > obsRect.right ||
                playerRect.bottom < obsRect.top ||
                playerRect.top > obsRect.bottom)) {
            endGame();
        }
    });

    if (playerRect.bottom >= container.clientHeight) {
        endGame();
    }
}

function jump(e){
    const transform_fn =()=>{
        let top = parseInt(player.style.transform.split('translateY(')[1].split(')')[0].replace('rem', ''));
        player_rotate = player_rotate >= 360 ? 0 : player_rotate - 45;
        player.style.transform = `translateX(60rem) translateY(${Math.max(0, parseInt(top - (70 - gameSpeed) / 1))}rem) rotate(${player_rotate}deg) scale(${scale})`;
    };
    if (e.code === 'Space' && isGameRunning) {
        scale = 1.3; transform_fn();
        $wait(.1, ()=>{ scale = 1 });
        $audio_play(audio.flap);
        audio.flap.playbackRate = random_nr(0.9, 1.1, true); audio.flap.preservesPitch = false;
        if ('webkitPreservesPitch' in audio.flap){ audio.flap.webkitPreservesPitch = false}
    }
}

function gravity(){
    if (!player) return;
    let top = parseInt(player.style.transform.split('translateY(')[1].split(')')[0].replace('rem', ''));
    if (top === '-20%') top = 0;
    player.style.transform = `translateX(60rem) translateY(${top + (gameSpeed / 2)}rem) rotate(${player_rotate}deg) scale(${scale})`;
    console.log(top);
}

function startGame(){
    // Reset game state
    isGameRunning = true;
    startScreen.classList.add('efy_hide_i');

    // Set game speed from slider
    gameSpeed = parseInt(speedSlider.value);

    score = 0; createPlayer(); createObstacle();

    document.addEventListener('keydown', jump);


    // Start game loop
    gameInterval = setInterval(() => {
        procedural ++; score++;
        gravity(); moveObstacles(); checkCollision();

        scoreDisplay.textContent = score;
        if (score % 500 === 0){
            $audio_play(audio.yay);
            confetti.currentTime = 0; confetti.play(); confetti.volume = 0;
        }

        // Procedurally generate obstacles
        if (procedural > 0 && procedural >= obstacle_width / random_nr(1, 9)){
            procedural = 0; createObstacle();
        }
        // console.log(procedural, obstacle_width);
    }, 25);
}

function endGame(){
    isGameRunning = false; obstacle_width = 0; procedural = 0;
    clearInterval(gameInterval);
    document.removeEventListener('keydown', jump);
    container.innerHTML = '';
    startScreen.classList.remove('efy_hide_i');
    scoreDisplay.textContent = 0;
    $audio_play(audio.error)
    player_rotate = 0;
}

$event(speedSlider, 'input', ()=>{
    if (isGameRunning) { gameSpeed = parseInt(speedSlider.value)}
});

$event(start_button, 'click', startGame);