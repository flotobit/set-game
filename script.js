const features = {
  number: [1, 2, 3],
  shape: ['▲', '●', '■'],
  color: ['red', 'green', 'purple'],
  shading: ['solid', 'striped', 'open']
};

let board = [];
let selected = [];

function generateCard() {
  return {
    number: features.number[Math.floor(Math.random() * 3)],
    shape: features.shape[Math.floor(Math.random() * 3)],
    color: features.color[Math.floor(Math.random() * 3)],
    shading: features.shading[Math.floor(Math.random() * 3)]
  };
}

function generateBoard() {
  board = [];
  for (let i = 0; i < 12; i++) {
    board.push(generateCard());
  }
  renderBoard();
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
    if (isSet(selected.map(i => board[i]))) {
      alert('✅ That is a SET!');
    } else {
      alert('❌ Not a SET!');
    }
    selected = [];
    renderBoard();
  }
}

function isSet(cards) {
  const keys = ['number','shape','color','shading'];
  return keys.every(key => {
    const values = cards.map(c => c[key]);
    const allSame = values.every(v => v === values[0]);
    const allDifferent = new Set(values).size === 3;
    return allSame || allDifferent;
  });
}

document.getElementById('new-game').onclick = generateBoard;
generateBoard();
