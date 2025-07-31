/*Storage*/ let  efy_xo = {}, $xo_save =()=>{};
try {
    if (localStorage.efy_xo){ efy_xo = JSON.parse(localStorage.efy_xo)}
    else { efy_xo = {X: 'X', O: 'O'}}
    $xo_save =()=>{ localStorage.efy_xo = JSON.stringify(efy_xo)}
} catch {}

$ready('#efy_sbtheme', ()=>{

$add('details', {id: 'xo_menu', class: 'eos_menu'}, [
  ['summary', [ ['i', {efy_icon: 'play'}], ['p', 'XO'], ['mark', {efy_lang: 'alpha'}] ]],
  ['hr'],
  ['div', {class: 'xo_menu'}, [
    ['p', 'Player Icons'],
    ['input', {id: 'xo_rename_x', type: 'text', maxlength: 2, value: efy_xo.X}],
    ['input', {id: 'xo_rename_o', type: 'text', maxlength: 2, value: efy_xo.O}]
  ]]
], $('#efy_modules'));

$event($('.xo_menu'), 'input', (event)=>{
  const target = event.target, value = target.value;
  if (target.matches('#xo_rename_x') && value !== ''){ efy_xo.X = value}
  else if (target.matches('#xo_rename_o') && value !== ''){ efy_xo.O = value}
  $xo_save();
})

let cells_dom = []; for (let i = 0; i < 9; i++){
  cells_dom.push(
    ['input', {type: 'radio', name: 'xo_cells', id: `cell_${i}`}],
    ['label', {for: `cell_${i}`, class: 'efy_card_filter_off'}]
  );
}

$add('div', {class: 'xo_body'}, [
  ['div', {ttt: '', efy_select: ''}, [
    ['div', {class: 'cells efy_shadow_card efy_card_filter efy-glass'}, cells_dom],
    ['div', {id: 'result'}],
    ['div', {class: 'control'}, [
        ['button', {class: 'reset', efy_lang: 'reset'}, [['i', {efy_icon: 'reload'}]]],
        ['input', {id: 'players', class: 'reset', type: 'checkbox', checked: ''}],
        ['label', {for: 'players'}, '2 Players'],
    ]],
  ]],
  ['video', {id: 'pn_confetti', src: './assets/confetti.webm'}]
]);


let gameActive = true, currentPlayer = "X", gameState = ['', '', '', '', '', '', '', '', ''], i = 0;

$event($('.cells'), 'click', (event)=>{ const target = event.target;
  if (target.matches('[name=xo_cells]')) ttt(Number(target.id.replace('cell_', '')));
});


function ttt(cellIndex){
  if (gameState[cellIndex] === '' && gameActive){
    gameState[cellIndex] = currentPlayer; $all('.cells [name=xo_cells] + label')[cellIndex].innerText = efy_xo[currentPlayer];
    if (checkWin() || checkDraw()){ gameActive = false; $('#result').innerText = 'Game Over'; let y = $('#pn_confetti'); y.currentTime = 0; y.play()}
    else { currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (gameActive && currentPlayer === "O" && !$('#players').checked){ makeAutomatedMove()}
}}}

function checkWin(){ const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let combination of winningCombinations){ const [a, b, c] = combination;
    if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[b] === gameState[c]){ return true}
  } return false;
}

function checkDraw(){ return !gameState.includes('')}

function restartGame(){ gameActive = true; currentPlayer = 'X'; gameState = ['', '', '', '', '', '', '', '', ''];
  const cells = $all('.cells [name=xo_cells] + label');
  for (let cell of cells){ cell.innerText = ''}
  $('#result').innerText = '';
}

function makeAutomatedMove(){ /*Find an empty cell for the move*/ let emptyCells = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === ''){ emptyCells.push(i)}
  }
  /*Choose a random empty cell*/ const randomIndex = Math.floor(Math.random() * emptyCells.length), cellIndex = emptyCells[randomIndex];
  /*Move AI Player*/ gameState[cellIndex] = currentPlayer; $all('.cells [name=xo_cells] + label')[cellIndex].innerText = efy_xo[currentPlayer];
  if (checkWin() || checkDraw()){ gameActive = false; $('#result').innerText = 'Game Over'}
  else {/*Switch back to human player*/ currentPlayer = currentPlayer === 'X' ? 'O' : 'X'}
}

$event($('.control'), 'click', ()=>{ const target = event.target;
    if (target.matches('.reset')) restartGame();
    if (target.matches('[for=players]')) $notify(1, "2 Player Mode", String(!$("#players").checked));
})

}, 1);