$add('div', {id: 'controls', efy_card: ''}, [
    ['div', {efy_lang: 'size', efy_range_text: 'Size'}, [
        ['input', {id: 'size_slider', type: 'range', min: '20', max: '50', value: '30', step: '1'}]
    ]],
    ['div', {efy_lang: 'speed', efy_range_text: 'Speed'}, [
        ['input', {id: 'speed_slider', type: 'range', min: '1', max: '20', value: '10', step: '1'}]
    ]],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start_button', class: ''}, [['i', {efy_icon: 'play'}], ['p', 'Start']]],
        ['button', {efy_sidebar_btn: '', class: ''}, [['i', {efy_icon: 'menu'}], ['p', 'Menu']]]
    ]]
]);
$add('div', {id: 'game_container', class: 'efy-glass'}, [
    ['div', {id: 'game'}]
]);

$add('div', {id: 'scores', efy_card: ''}, [
    ['div', {class: 'score_div', title: 'Score'}, [['i', {efy_icon: 'circle2'}], ['span', {id: 'score'}, '0']]],
    ['div', {class: 'lives_div', title: 'Lives'}, [['i', {efy_icon: 'heart'}], ['span', {id: 'lives'}, '3']]]
]);

/////////////

const game = $('#game'), score_display = $('#score'), livesDisplay = $('#lives'),
size_slider = $('#size_slider'), speed_slider = $('#speed_slider'), controls = $('#controls'),
start_button = $('#start_button');

let [gameActive, gamePaused] = [false, false],
gridSize = 30, speed = 100/*ms*/, gameInterval,
snake = [{ x: 15, y: 15 }], direction = { x: 0, y: 0 },
apple = {}, bombs = [], score = 0, lives = 3;

function createGrid(size) {
    game.innerHTML = '';
    game.style.gridTemplateColumns = `repeat(${size}, 20px)`;
    game.style.gridTemplateRows = `repeat(${size}, 20px)`;
    for (let i = 0; i < size * size; i++) {
        $add('div', {class: 'empty'}, null, game)
    }
    placeApple(); placeBombs(); drawSnake();
}

function placeApple() {
    do {
        apple = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    } while (snake.some(s => s.x === apple.x && s.y === apple.y) || bombs.some(b => b.x === apple.x && b.y === apple.y));
}

function placeBombs() {
    bombs = [];
    for (let i = 0; i < 5; i++) {
        let bomb;
        do {
            bomb = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
        } while (bomb.x === apple.x && bomb.y === apple.y || snake.some(s => s.x === bomb.x && s.y === bomb.y));
        bombs.push(bomb);
    }
}

function drawSnake() {
    const cells = $all('#game div');
    cells.forEach(cell => cell.className = 'empty');

    const head = snake[0];
    const headIndex = head.y * gridSize + head.x;
    cells[headIndex].classList.add('snake', 'head', head.direction);

    const tail = snake[snake.length - 1];
    const tailIndex = tail.y * gridSize + tail.x;
    cells[tailIndex].classList.add('snake', 'tail', tail.direction);

    // Rest of the snake
    for (let i = 1; i < snake.length - 1; i++) {
        const segment = snake[i];
        const index = segment.y * gridSize + segment.x;
        cells[index].classList.add('snake');
    }

    const appleIndex = apple.y * gridSize + apple.x;
    cells[appleIndex].classList.add('apple');

    bombs.forEach(bomb => {
        const bombIndex = bomb.y * gridSize + bomb.x;
        cells[bombIndex].classList.add('bomb');
    });
}

function moveSnake() {
    if (gamePaused) return; // Don't move if game paused

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some(s => s.x === head.x && s.y === head.y)) {
        loseLife();
        return;
    }

    head.direction = direction.x === 1 ? 'right' : direction.x === -1 ? 'left' : direction.y === 1 ? 'down' : 'up';
    snake.unshift(head);

    const tail = snake[snake.length - 1];
    if (snake.length > 1) {
        tail.direction = snake[snake.length - 2].direction; // Tail direction based on the 2nd last segment
    }

    if (head.x === apple.x && head.y === apple.y) {
        score++; score_display.textContent = score; placeApple();
    }
    else if (bombs.some(b => b.x === head.x && b.y === head.y)) {
        loseLife(); bombs = bombs.filter(b => !(b.x === head.x && b.y === head.y));
    }
    else { snake.pop()}
    drawSnake();
}

function loseLife() {
    lives--;
    livesDisplay.textContent = lives;
    if (lives <= 0) {
        clearInterval(gameInterval);
        controls.style.display = 'flex'; // Show controls again
        game.style.display = 'none'; // Hide game
        gameActive = false; // Reset game active
    }
}

function resetGame() {
    snake = [
        { x: 10, y: 10, direction: 'right' }, // Head
        { x: 9, y: 10, direction: 'right' }  // Tail
    ];
    direction = { x: 1, y: 0 }; // Start moving to the right
    score = 0;
    lives = 3;
    score_display.textContent = score;
    livesDisplay.textContent = lives;
    createGrid(gridSize);
}

function startGame() {
    controls.style.display = 'none'; // Hide controls
    game.style.display = 'grid'; // Show game
    gameActive = true; // Set game active
    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, speed);
}

$event(size_slider, 'input', ()=>{
    gridSize = parseInt(size_slider.value);
    createGrid(gridSize);
});

$event(speed_slider, 'input', ()=>{
    speed = 1000 / speed_slider.value; // Convert to milliseconds
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = setInterval(moveSnake, speed);
    }
});

$event(start_button, 'click', ()=>{
    resetGame(); startGame();
});

$event(document, 'keydown', (event)=>{
    if (!gameActive) return; // Do nothing if game not active

    if (event.key === 'p' || event.key === 'P') {
        gamePaused = !gamePaused; // Toggle pause
        if (gamePaused) {
            clearInterval(gameInterval); // Stop the game
        } else {
            gameInterval = setInterval(moveSnake, speed); // Resume the game
        }
        return; // Exit after pause
    }

    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 }; // Prevent reversing
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 }; // Prevent reversing
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 }; // Prevent reversing
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 }; // Prevent reversing
            break;
    }
    if (direction.x !== 0 || direction.y !== 0) {
        startGame(); // key starts the game
    }
});

createGrid(gridSize); // Initialize Grid