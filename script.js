// Tic Tac Toe game logic
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check if there's a winner
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerHTML = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.innerHTML = 'It\'s a tie!';
        isGameActive = false;
    }
}

// Function to handle a player's move
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (board[clickedIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkWinner();

    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.innerHTML = `Player ${currentPlayer}'s turn`;
    }
}

// Function to restart the game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.innerHTML = '');
    message.innerHTML = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Add event listener to restart button
restartBtn.addEventListener('click', restartGame);

// Initialize the game message
message.innerHTML = `Player ${currentPlayer}'s turn`;
