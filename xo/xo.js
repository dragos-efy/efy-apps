$ready('#efy_sbtheme', ()=>{


$add('div', {class: 'xo_body'}, [
  ['div', {ttt: '', efy_select: ''}, [
    ['div', {class: 'cells'}, [
        ['div'], ['div'], ['div'], ['div'], ['div'], ['div'], ['div'], ['div'], ['div']
    ]],
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

let a = $all('.cells div'); for (let i = 0; i < a.length; i++){ a[i].setAttribute('efy_card', '');
  $event(a[i], 'click', ()=> ttt(i));
};

function ttt(cellIndex){
  if (gameState[cellIndex] === '' && gameActive){
    gameState[cellIndex] = currentPlayer; $all('.cells div')[cellIndex].innerText = currentPlayer;
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
  const cells = $all('.cells div');
  for (let cell of cells){ cell.innerText = ''}
  $('#result').innerText = '';
}

function makeAutomatedMove(){ /*Find an empty cell for the move*/ let emptyCells = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === ''){ emptyCells.push(i)}
  }
  /*Choose a random empty cell*/ const randomIndex = Math.floor(Math.random() * emptyCells.length), cellIndex = emptyCells[randomIndex];
  /*Move AI Player*/ gameState[cellIndex] = currentPlayer; $all('.cells div')[cellIndex].innerText = currentPlayer;
  if (checkWin() || checkDraw()){ gameActive = false; $('#result').innerText = 'Game Over'}
  else {/*Switch back to human player*/ currentPlayer = currentPlayer === 'X' ? 'O' : 'X'}
}

$event($('.control'), 'click', ()=>{ const target = event.target;
    if (target.matches('.reset')) restartGame();
    if (target.matches('[for=players]')) $notify(1, "2 Player Mode", String(!$("#players").checked));
})

}, 1);