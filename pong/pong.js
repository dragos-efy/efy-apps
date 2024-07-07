$ready('#efy_sbtheme', ()=>{

const start = $add('div', {id: 'start_container', class: 'efy_trans_filter', efy_card: ''}, [
    ['h1', {}, 'PONG · DEMO'],
    ['hr'],
    ['h6', {}, 'Rules'],
    ['hr'],
    ['div', {class: 'rules'}, [
      ['li', {}, 'Score 3 points to win'],
      ['li', {}, '2 players required, but it will be between 1-4 players soon']
    ]],
    ['hr'],
    ['h6', {}, 'Controls'],
    ['hr'],
    ['li', {}, [
        ['p', {}, 'Player 1: '],
        ['i', {efy_icon: 'arrow_left'}], ['i', {efy_icon: 'arrow'}]
    ]],
    ['hr'],
    ['li', {}, [
        ['p', {}, 'Player 2: '],
        ['p', {class: 'key'}, 'A'], ['p', {class: 'key'}, 'D']
    ]],
    ['hr'],
    ['li', {}, [ ['p', {}, 'Launch Ball: '], ['p', {class: 'key space'}, 'Space'] ]],
    ['hr'],
    ['div', {class: 'efy_flex'}, [
        ['button', {id: 'start'}, 'Start'],
        ['button', {class: 'efy_quick_fullscreen efy_square_btn'}, [['i', {efy_icon: 'fullscreen'}]] ]
    ]]
]);

$event($$(start, 'button'), 'click', ()=>{ start.remove();

const confetti = $add('video', {id: 'confetti', src: './assets/confetti.webm'});

$add('span', {id: 'body-container'}, [
  ['div', {class: 'top-container'}, [
    ['div', {class: 'scores'}, [
      ['div', {score: '1'}, [['p', {}, 'P1'], ['p', {id: 'score-display1'}, '0']]],
      ['div', {score: '2'}, [['p', {}, 'P2'], ['p', {id: 'score-display2'}, '0']]],
      ['div', {score: '3'}, [['p', {}, 'P3'], ['p', {id: 'score-display3'}, '0']]],
      ['div', {score: '4'}, [['p', {}, 'P4'], ['p', {id: 'score-display4'}, '0']]]
    ]],
    ['div', {class: 'new-game'}, [
      ['button', {id: 'new-game-button', class: 'efy_square_btn'}, [['i',  {efy_icon: 'reload'}]]],
      ['button', {efy_sidebar_btn: '', class: 'efy_square_btn'}, [['i',  {efy_icon: 'menu'}]]]
    ]]
  ]],
  ['div', {class: 'container'}, [
    ['div', {class: 'rod1'}],
    ['div', {class: 'ball'}],
    ['div', {class: 'rod2'}],
  ]]
]);

const rod1 = $('.rod1'), rod2 = $('.rod2'), ball = $('.ball'),
container = $('.container'), new_game_b = $('#new-game-button'),
score_d1 = $('#score-display1'), score_d2 = $('#score-display2');

let currentRod = rod2, size = 30, score1 = 0 , score2 = 0, game_start = false, direction_x, direction_y,
lives = 3, [lives1, lives2] = [lives, lives], not_initial = true , id;

let audio = {}; 'touch touch2'.split(' ').forEach(x =>{
  audio[x] = new Audio(`./assets/${x}.webm`); audio[x].volume = 1
});
'error'.split(' ').forEach(x => {
  audio[x] = new Audio(`./efy/audio/${x}.webm`); audio[x].volume = 1
});

/*Add Menu*/ $add('details', {id: 'pg_settings'}, [
  ['summary', {}, [['i', {efy_icon: 'circle'}], ['p', {}, 'Pong'], ['mark', {efy_lang: 'alpha'}]]],
        ['div', {efy_tabs: 'pn_menu', efy_select: ''}, [
            ['div', {class: 'efy_tabs'}, [
                ['input', {type:'radio', id: 'pg_tab_theme', efy_tab: 'theme', efy_active: ''}],
                ['label', {for: 'pg_tab_theme', efy_lang: 'theme'}],
                ['input', {type:'radio', id: 'pg_tab_backup', efy_tab: 'backup'}],
                ['label', {for: 'pg_tab_backup', efy_lang: 'backup'}],
                ['input', {type:'radio', id: 'pg_tab_tags', efy_tab: 'tags'}],
                ['label', {for: 'pg_tab_tags', efy_lang: 'tags'}]
            ]],
            ['div', {efy_content: 'backup', efy_select: '', id: 'pn_backup'}, [
                ['div', {efy_lang: 'coming_soon'}]
            ]],
            ['div', {efy_content: 'theme', efy_select: '', id: 'pn_theme', efy_active: ''}, [
                ['div', {efy_lang: 'coming_soon'}]
                // ['p', {class: 'pn_title'}, 'Player 1'],
                // ['div', {efy_color: '1, 85 100% 40%, pn_priority_1'}]
                // ['p', {class: 'pn_title'}, 'Player 2'],
                // ['div', {efy_color: '1, 0 100% 50%, pn_priority_3'}]
            ]],
            ['div', {efy_content: 'tags', efy_select: '', id: 'pn_tags'}, [
                ['div', {efy_lang: 'coming_soon'}]
            ]],
        ]]
], $('#efy_modules'));

$event(new_game_b, 'click', ()=>{ location.reload()});
$event(document, 'keydown', mode_rod);
$event(document, 'keypress', launch_ball);
$event(window, 'resize', set_game);
set_game();

function new_game(){
  clearInterval(id); currentRod = rod2;
  [lives1, lives2] = [lives, lives];
  set_game(); score1 = 0, score2 = 0;
  score_d1.innerText = 0; score_d2.innerText = 0;
}
function mode_rod(event){
  let rod2_left = rod2.offsetLeft, rod1_left = rod1.offsetLeft;
  key = event.keyCode, elementW = rod2.offsetWidth,
  containerW = container.clientWidth, containerH = container.clientHeight;

  if (key == 68){ // 'D' moves rod1 right
    if (rod1_left + elementW + size <= containerW){ rod1.style.left = rod1_left + size + "px"; rod1_left += size}
    else { rod1.style.left = containerW - elementW + "px"; rod1_left = containerW - elementW}
    if (game_start == false){ reset_ball()}
  }
  else if (key == 65){ // 'A' moves rod1 left
    if (rod1_left - size >= 0){ rod1.style.left = rod1_left - size + "px"; rod1_left -= size}
    else { rod1.style.left = "0px"; rod1_left = 0}
    if(game_start == false){ reset_ball()}
  }
  if (key == 39){
    if (rod2_left + elementW + size <= containerW){ rod2.style.left = rod2_left + size + "px"; rod2_left += size}
    else { rod2.style.left = containerW - elementW + "px"; rod2_left = containerW - elementW}
    if (game_start == false){ reset_ball()}
  }
  else if(key == 37){
    if (rod2_left - size >= 0){ rod2.style.left = rod2_left - size + "px"; rod2_left -= size}
    else { rod2.style.left = "0px"; rod2_left = 0}
    if (game_start == false){ reset_ball()}
  }
}

//to set ball direction before lauching when enter pressed and then call start_game
function launch_ball(event){ let e = event.keyCode;
  if (e == 13 || e == 32 || e == 40 || e == 83){ // Enter, Space, Down, S
    not_initial = false;
    if (currentRod == rod2){ direction_x = +1; direction_y = -1}
    else { direction_x = +1; direction_y = +1}
    game_start = true; start_game();
  }
}

function set_game(){ game_start = false; resetRods(); reset_ball()}

function reset_ball(){
  if (currentRod == rod2){
    ball.style.top = container.clientHeight - currentRod.offsetHeight - ball.offsetHeight + "px";
    ball.style.left = currentRod.offsetLeft + (currentRod.offsetWidth) / 2 - (ball.offsetWidth) / 2 + "px";
  } else {
    ball.style.top = currentRod.offsetHeight + "px";
    ball.style.left = currentRod.offsetLeft + (currentRod.offsetWidth) / 2 - (ball.offsetWidth) / 2 + "px";
}}
/*Middle Align*/ function resetRods(){ rod1.style.left = '45%'; rod2.style.left = '45%'}
function start_game(){ game_start = true; id = setInterval(set_ball_position, 1)}

/*Move ball inside container*/
function set_ball_position(){
  let ball_top = ball.offsetTop, ball_left = ball.offsetLeft, ball_w = ball.offsetWidth;

  if (ball.offsetLeft == 0){ direction_x*=(-1); $audio_play(audio.touch2)} //ball touches left boundary, reverse x coordinates
  else if (ball_left + ball_w == container.clientWidth){ direction_x*=(-1); $audio_play(audio.touch2)} //ball touches right boundary, reverse x coordinates
  else if (not_initial && ball_top == rod1.offsetHeight){ //ball at the top of rod1, check if it strikes
    const rl = rod1.offsetLeft - ball.offsetWidth, rr = rod1.offsetLeft + rod1.offsetWidth;
    if (ball_left <= rr && ball_left >= rl){ direction_y*=(-1); score1++; $audio_play(audio.touch)} // Ball touches player
    else { lives1--; score_d2.innerText = lives - lives1;
      clearInterval(id);
      if (!(lives1 == 0)){ currentRod = rod1; $audio_play(audio.error)}
      not_initial = false; set_game();
      if (lives1 == 0){ $notify(5, 'Winner: Player 2', ''); let y = $('#confetti'); y.currentTime = 0; y.play(); new_game()}
      return;
    }
  }
  else if (not_initial && ball_top + ball_w == container.clientHeight - rod2.offsetHeight){
    const rl = rod2.offsetLeft - ball.offsetWidth, rr = rod2.offsetLeft + rod2.offsetWidth;

    if (ball_left <= rr && ball_left >= rl){ direction_y*=(-1); score2++; $audio_play(audio.touch)}
    else { lives2--; score_d1.innerText = lives - lives2;
      clearInterval(id);
      if (!(lives2 == 0)){ currentRod = rod2; $audio_play(audio.error)}
      not_initial = false; set_game();
      if (lives2 == 0){ $notify(5, 'Winner: Player 1', ''); let y = $('#confetti'); y.currentTime = 0; y.play(); new_game()}
      return;
    }
  }
  ball_top += direction_y; ball_left += direction_x;
  ball.style.top = ball_top + "px"; ball.style.left = ball_left + "px";
  not_initial = true;
}

});

}, 1);