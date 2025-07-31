$ready('#efy_sbtheme', ()=>{

const start = $add('div', {id: 'start_container', class: 'efy_card_filter', efy_card: ''}, [
    ['h1', 'INVADERS · DEMO'],
    ['hr'],
    ['h6', 'Rules'],
    ['hr'],
    ['div', {class: 'rules'}, [
        ['li', 'Shoot your enemies & don\'t let them pass'],
        ['li', 'Touching enemies kills you, so avoid them'],
    ]],
    ['hr'],
    ['h6', 'Controls'],
    ['hr'],
    ['li', [
        ['p', 'Move: '],
        ['i', {efy_icon: 'arrow_left'}], ['i', {efy_icon: 'arrow_up'}], ['i', {efy_icon: 'arrow'}], ['i', {efy_icon: 'arrow_down'}]
    ]],
    ['hr'],
    ['li', [ ['p', 'Shoot: '], ['p', {class: 'key space'}, 'Space'] ]],
    ['hr'],
    ['li', [ ['p', 'Reset: '], ['p', {class: 'key'}, 'R'] ]],
    ['hr'],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start'}, 'Start'],
        ['button', {class: 'efy_quick_fullscreen fullscreen efy_square_btn'}, [['i', {efy_icon: 'fullscreen'}]] ]
    ]]
]);

$event($$(start, 'button'), 'click', ()=>{ start.remove();
const confetti = $add('video', {id: 'confetti', src: './assets/confetti.webm'});

let grid_size = Math.min(window.innerWidth, window.innerHeight) + 'rem';
$css_prop('---grid_size', grid_size);

$add('div', {class: 'nav'}, [
    ['div', {class: 'results efy_square_btn efy_card_filter', efy_card: ''}, '0'],
    ['button', {class: 'efy_square_btn', efy_sidebar_btn: ''}, [['i', {efy_icon: 'menu'}]]]
]);
$add('div', {class: 'grid', efy_card: ''});


const grid = $('.grid'), resultDisplay = $('.results'), aliensRemoved = []
let width = 20, invadersId, isGoingRight = true, direction = 1, results = 0;

for (let i = 0; i < width * width; i++) {
    $add('div', {}, [], grid);
}

const squares = Array.from($all('.grid div')),

alienInvaders = [
    0, 1, 2, /**/ 5, 6, 7, /**/ 9, 10, 11,
    20, 21, 22, /**/ 25, 26, 27, /**/ 29, 30, 31,
    40, 41, 42, /**/ 45, 46, 47, /**/ 49, 50, 51
];

let currentplayerIndex = squares.length - width / 2;

function draw(){
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader")
        }
    }
}

draw()

squares[currentplayerIndex].classList.add("player")

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader")
    }
}

function moveplayer(e) {
    squares[currentplayerIndex].classList.remove("player")
    switch (e.key) {
        case "ArrowLeft":
            if (currentplayerIndex % width !== 0) currentplayerIndex -= 1
            break
        case "ArrowRight":
            if (currentplayerIndex % width < width - 1) currentplayerIndex += 1
            break
    }
    squares[currentplayerIndex].classList.add("player")
}

// $event(document, 'keydown', moveplayer);
let hits = 1;

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove()

    if (rightEdge && isGoingRight){
        for (let i = 0; i < alienInvaders.length; i++){
            direction = -1
            isGoingRight = false
        }
        if (hits === 3){
            for (let i = 0; i < alienInvaders.length; i++){ alienInvaders[i] += width + 1}
            hits = 0;
        }
        hits++;
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            direction = 1
            isGoingRight = true
        }
        if (hits === 3){
            for (let i = 0; i < alienInvaders.length; i++){ alienInvaders[i] += width - 1}
            hits = 0;
        }
        hits++;
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    draw()

    if (squares[currentplayerIndex].classList.contains("invader")) {
        resultDisplay.innerHTML = "GAME OVER"
        clearInterval(invadersId)
    }

    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = "YOU WIN"
        clearInterval(invadersId)
    }
}

invadersId = setInterval(moveInvaders, 200)

function shoot(e) {
    let laserId, currentLaserIndex = currentplayerIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser")
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add("laser")

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser")
            squares[currentLaserIndex].classList.remove("invader")
            squares[currentLaserIndex].classList.add("boom")

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 100)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultDisplay.innerHTML = results
        }
    }

    if (e.key === 'ArrowUp' || e.key === ' ') {
        laserId = setInterval(moveLaser, 100)
    }
}

$event(document, 'keydown', (event)=>{
    shoot(event); moveplayer(event);
});

})}, 1);