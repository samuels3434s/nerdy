const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let knightPosition = null;
let moveCount = 0;

// Create the board
function createBoard() {
  board.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
      square.dataset.row = row;
      square.dataset.col = col;
      square.addEventListener('click', moveKnight);
      board.appendChild(square);
    }
  }
}

// Move the knight
function moveKnight(e) {
  const targetSquare = e.currentTarget;
  const targetRow = parseInt(targetSquare.dataset.row);
  const targetCol = parseInt(targetSquare.dataset.col);

  if (knightPosition === null) {
    // Initial placement
    knightPosition = { row: targetRow, col: targetCol };
    targetSquare.textContent = '♘';
    moveCount = 1;
  } else {
    const rowDiff = Math.abs(targetRow - knightPosition.row);
    const colDiff = Math.abs(targetCol - knightPosition.col);

    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      // Valid knight move
      if (targetSquare.textContent === '') {
        document.querySelector(`[data-row='${knightPosition.row}'][data-col='${knightPosition.col}']`).textContent = '•';
        knightPosition = { row: targetRow, col: targetCol };
        targetSquare.textContent = '♘';
        moveCount++;
      }
    }
  }

  checkBoard();
}

// Check board status
function checkBoard() {
  if (moveCount === 64) {
    message.textContent = 'Puzzle solved!';
    message.style.color = '#27ae60';
  } else {
    message.textContent = `Moves made: ${moveCount}`;
    message.style.color = '#333';
  }
}

// Reset the board
function resetBoard() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => square.textContent = '');
  knightPosition = null;
  moveCount = 0;
  message.textContent = 'Start the Knight\'s Tour';
  message.style.color = '#333';
}

// Initialize the board
createBoard();

// Reset button
resetButton.addEventListener('click', resetBoard);