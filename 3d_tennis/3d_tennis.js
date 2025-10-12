$add('div', {class: 'game'}, [
  ['div', {class: 'container'}, [
    ['div', {class: 'floor'}],
    ['div', {class: 'floor2'}],
    ['div', {class: 'floor3'}],
    ['div', {class: 'floor4'}],
    ['div', {class: 'table'}, [
      ['div', {class: 'net efy_trans_filter'}, [
        ['div', {class: 'top'}],
        ['div', {class: 'left'}],
        ['div', {class: 'right'}]
      ]],
      ['div', {class: 'top efy_trans_filter'}],
      ['div', {class: 'front efy_trans_filter'}],
      ['div', {class: 'back efy_trans_filter'}],
      ['div', {class: 'left efy_trans_filter'}],
      ['div', {class: 'right efy_trans_filter'}],
    ]],
    ['div', {class: 'ballWrapper'}, [
      ['div', {class: 'ball'}],
      ['div', {class: 'ballShadow'}]
    ]],
    ['div', {class: 'player player1'}, [
      ['div', {class: 'playerBox'}, [
        ['div', {class: 'shadow'}]
      ]]
    ]],
    ['div', {class: 'player player2'}, [
      ['div', {class: 'playerBox'}, [
        ['div', {class: 'shadow'}]
      ]]
    ]]
  ]]
]);

// Player movement
let p1 = {s: $('.player1'), x: 0, z: 0},
p2 = {s: $('.player2'), x: 0, z: 0},
container = {s: $('.container'), y: 90, z: 0},
ball = {s: $('.ball'), move: 0, x: 0, y: -20, z: -350};
const keys = {}; // keep track of pressed keys

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','a','d','w','s', ' '].includes(event.key)) {
        event.preventDefault();
    }
});

document.addEventListener('keyup', (event) => {
    delete keys[event.key];
});

function updateFromKeys() {
    // Player 1
    if (keys['ArrowLeft'])  { if (p1.x > -160) { p1.x -= 10; container.y -= 0.5 } }
    if (keys['ArrowRight']) { if (p1.x < 160)  { p1.x += 10; container.y += 0.5 } }
    if (keys['ArrowUp'])    { if (p1.z > -360) { p1.z -= 10; container.z += 0.1 } }
    if (keys['ArrowDown'])  { if (p1.z < 0)    { p1.z += 10; container.z -= 0.1 } }

    // Player 2
    if (keys['a']) { if (p2.x > -160) { p2.x -= 10; container.y -= 0.5 } }
    if (keys['d']) { if (p2.x < 160)  { p2.x += 10; container.y += 0.5 } }
    if (keys['w']) { if (p2.z > 0)    { p2.z -= 10; container.z += 0.1 } }
    if (keys['s']) { if (p2.z < 360)  { p2.z += 10; container.z -= 0.1 } }

    if (keys[' ']) { ball.move = 1 }

    p1.s.style.transform = `rotateY(-90deg) translateX(${p1.x}rem) translateY(-38rem) translateZ(${p1.z}rem)`;
    p2.s.style.transform = `rotateY(-90deg) translateX(${p2.x}rem) translateY(-38rem) translateZ(${p2.z}rem)`;
    container.s.style.transform = `rotateY(${container.y}deg) rotateZ(${container.z}deg)`;
}

// Gravity
setInterval(() => {
    console.log(ball.z, p1.z, p2.z);
    // -720 + (p2.z * -1)
    // if (ball.move === 1 && ball.z + p2.z - 360 >= 360 - (360 + p1.z)){
    if (ball.move === 1 && ball.z >= p2.z){
      ball.z -= 20; ball.move = 2;
    }
    else if (ball.move === 2 && ball.z - p1.z - 360 <= -360 - p2.z){
      ball.z += 20; ball.move = 1;
    }
    // else { ball.move = 0}

    if (ball.move === 1){
      ball.z += 10;
      ball.s.style.transform = `rotate3d(0, 1, 0, 90deg) translate3d(${ball.x}rem, ${ball.y}rem, ${ball.z}rem)`;
    }
    else if (ball.move === 2){
      ball.z -= 10;
      ball.s.style.transform = `rotate3d(0, 1, 0, 90deg) translate3d(${ball.x}rem, ${ball.y}rem, ${ball.z}rem)`;
    }
}, 30);

const TICK_MS = 25;
setInterval(updateFromKeys, TICK_MS);
