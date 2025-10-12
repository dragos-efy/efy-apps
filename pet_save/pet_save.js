$add('h2', 'Pet Save');
$add('p', {style: 'max-width: 350rem; text-align: center'}, [
    'Add pillows to stop your pet from escaping. 2025 idea from ',
    ['a', {href: 'https://github.com/bkil'}, 'bkil.hu']
]);
$add('div', {class: 'game-status', id: 'status'});
$add('div', {efy_card: '', class: 'pet_game'}, [
    ['div', {id: 'game-board'}]
]);
$add('div', {class: 'efy_flex', style: 'gap: var(---gap-x); margin-top: var(---gap)'}, [
    ['button', {class: 'restart-btn efy_square_btn', onclick: 'initGame()', title: 'Restart'}, [['i', {efy_icon: 'reload'}]]],
    ['button', {class: 'efy_quick_fullscreen efy_square_btn', title: 'Fullscreen'}, [['i', {efy_icon: 'fullscreen'}]]],
    ['button', {efy_sidebar_btn: '', class: 'efy_square_btn', title: 'Menu'}, [['i', {efy_icon: 'menu'}]]]
]);

const statusElement = $('#status');
let game;

class PetGame {
    constructor(width = 9, height = 9) {
        this.width = width;
        this.height = height;
        this.board = new Array(width * height).fill(0);
        this.petPosition = null;
        this.gameOver = false;
        this.initializeGame();
    }
    initializeGame() {
        // Place pet in the center
        this.petPosition = Math.floor((this.width * this.height) / 2);
        this.board[this.petPosition] = 'pet';
        this.renderBoard();
    }
    renderBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';

        for (let y = 0; y < this.height; y++) {

            const row = $add('div', {class: 'row'}, [], gameBoard);

            for (let x = 0; x < this.width; x++) {
                const index = y * this.width + x;

                const cell = $add('div', {class: `cell${(index === this.petPosition) ? ' pet' : ''}`}, [
                    ['input', {type: 'checkbox', 'data-index': index}]
                ], row);

                $$(cell, '[type="checkbox"]').addEventListener('change', (e) => this.placePillow(e));

                // Older Code, Keeping this temporarily as a refference
                // const cell = document.createElement('div');
                // cell.classList.add('cell');
                // const checkbox = document.createElement('input');
                // checkbox.type = 'checkbox';
                // checkbox.dataset.index = index;
                // if (index === this.petPosition) {
                //     cell.classList.add('pet');
                // }
                // cell.appendChild(checkbox);
                // gameBoard.appendChild(cell);
            }
        }
    }
    placePillow(event) {
        if (this.gameOver) return;

        const index = parseInt(event.target.dataset.index);
        const cell = event.target.closest('.cell');

        // Can't place pillow on pet's position
        if (index === this.petPosition) {
            event.target.checked = false;
            return;
        }

        cell.classList.toggle('pillow');
        this.board[index] = cell.classList.contains('pillow') ? 'pillow' : 0;

        this.movePet();
    }
    movePet() {
        const possibleMoves = this.getPossibleMoves();

        if (possibleMoves.length === 0) {
            this.gameOver = true;
            this.updateStatus('You won! The pet is trapped.');
            return;
        }

        // Randomly choose a move
        const moveIndex = Math.floor(Math.random() * possibleMoves.length);
        const newPosition = possibleMoves[moveIndex];

        // Remove pet from current position
        const currentCell = document.querySelector(`.cell input[data-index="${this.petPosition}"]`).closest('.cell');
        currentCell.classList.remove('pet');

        // Move pet to new position
        this.petPosition = newPosition;
        const newCell = document.querySelector(`.cell input[data-index="${this.petPosition}"]`).closest('.cell');
        newCell.classList.add('pet');

        // Check if pet escapes
        if (this.isPetEscaped()) {
            this.gameOver = true;
            this.updateStatus('The pet escaped!');
        }
    }
    getPossibleMoves() {
        const moves = [
            this.petPosition - this.width,     // Up
            this.petPosition + this.width,     // Down
            this.petPosition - 1,              // Left
            this.petPosition + 1,              // Right
            this.petPosition - this.width - 1, // Up-Left
            this.petPosition - this.width + 1, // Up-Right
            this.petPosition + this.width - 1, // Down-Left
            this.petPosition + this.width + 1  // Down-Right
        ];

        return moves.filter(move =>
            move >= 0 &&
            move < this.width * this.height &&
            this.board[move] !== 'pillow'
        );
    }
    isPetEscaped() {
        const x = this.petPosition % this.width;
        const y = Math.floor(this.petPosition / this.width);

        return x === 0 || x === this.width - 1 ||
                y === 0 || y === this.height - 1;
    }
    updateStatus(message) {
        statusElement.textContent = message;
    }
}

const initGame =()=>{ game = new PetGame(); statusElement.textContent = ''};
initGame();