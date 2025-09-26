const features = {
  number: [1, 2, 3],
  shape: ['▲', '●', '■'],
  color: ['red', 'green', 'purple'],
};

let board = [];
let selected = [];
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

function generateCard() {
  return {
    number: features.number[Math.floor(Math.random() * 3)],
    shape: features.shape[Math.floor(Math.random() * 3)],
    color: features.color[Math.floor(Math.random() * 3)],
  };
}

function generateBoard() {
  board = [];
  for (let i = 0; i < 12; i++) {
    board.push(generateCard());
  }
  selected = [];
  renderBoard();
  updateScoreboard();
}

function renderBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  board.forEach((card, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.style.color = card.color;
    div.textContent = card.shape.repeat(card.number);
    div.onclick = () => selectCard(index, div);
    gameBoard.appendChild(div);
  });
}

function selectCard(index, element) {
  if (selected.includes(index)) {
    selected = selected.filter(i => i !== index);
    element.classList.remove('selected');
  } else {
    selected.push(index);
    element.classList.add('selected');
  }

  if (selected.length === 3) {
    const cards = selected.map(i => board[i]);
    if (isSet(cards)) {
      alert(`✅ Player ${currentPlayer} found a SET!`);
      if (currentPlayer === 1) player1Score++;
      else player2Score++;
    } else {
      alert(`❌ Player ${currentPlayer} missed!`);
    }
    // Switch turns
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    selected = [];
    renderBoard();
    updateScoreboard();
  }
}

function isSet(cards) {
  const keys = ['number', 'shape', 'color'];
  return keys.every(key => {
    const values = cards.map(c => c[key]);
    const allSame = values.every(v => v === values[0]);
    const allDifferent = new Set(values).size === 3;
    return allSame || allDifferent;
  });
}

function updateScoreboard() {
  document.getElementById('score1').textContent = player1Score;
  document.getElementById('score2').textContent = player2Score;
  document.getElementById('turn').textContent = currentPlayer;
}

document.getElementById('new-game').onclick = generateBoard;

generateBoard();

