let levels = [];
let currentLevel = null;
let gridState = [];
let moveCount = 0;
let previousState = null;
let timerInterval = null;
let elapsedSeconds = 0;
let gameWon = false;

const gridEl = document.getElementById("grid");
const movesEl = document.getElementById("moves");
const targetEl = document.getElementById("target");
const winMessage = document.getElementById("winMessage");

const timerEl = document.createElement("span");
timerEl.id = "timer";
timerEl.style.marginLeft = "20px";
document.querySelector(".info").appendChild(timerEl);

document.getElementById("restart").onclick = () => loadLevel(currentLevel.id);
document.getElementById("newGame").onclick = () => loadRandomLevel(currentLevel.id);

fetch("levels.json")
  .then(res => res.json())
  .then(data => {
    levels = data;
    loadRandomLevel();
  });

function loadRandomLevel(excludeId = null) {
  const options = levels.filter(lvl => lvl.id !== excludeId);
  const level = options[Math.floor(Math.random() * options.length)];
  loadLevel(level.id);
}

function loadLevel(id) {
  currentLevel = levels.find(l => l.id === id);
  gridState = currentLevel.grid.map(row => [...row]);
  previousState = JSON.stringify(gridState);
  moveCount = 0;
  elapsedSeconds = 0;
  gameWon = false;
  winMessage.classList.add("hidden");
  startTimer();
  updateDisplay();
  renderGrid();
}

function renderGrid() {
  gridEl.innerHTML = "";
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const cell = document.createElement("div");
      cell.className = "cell" + (gridState[y][x] ? " on" : "");
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.onclick = onCellClick;
      gridEl.appendChild(cell);
    }
  }
}

function onCellClick(e) {
  if (gameWon) return;

  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);

  const beforeState = JSON.stringify(gridState);
  const newGrid = gridState.map(row => [...row]);

  toggleCell(newGrid, x, y);

  const afterState = JSON.stringify(newGrid);

  if (beforeState !== afterState) {
    if (afterState === previousState && moveCount > 0) {
      moveCount--;
    } else {
      previousState = beforeState;
      moveCount++;
    }

    gridState = newGrid;
    updateDisplay();
    renderGrid();

    if (checkWin()) {
      gameWon = true;
      clearInterval(timerInterval);
      winMessage.classList.remove("hidden");
    }
  }
}

function toggleCell(grid, x, y) {
  const toggle = (x, y) => {
    if (x >= 0 && x < 5 && y >= 0 && y < 5) {
      grid[y][x] = grid[y][x] ? 0 : 1;
    }
  };

  toggle(x, y);
  toggle(x + 1, y);
  toggle(x - 1, y);
  toggle(x, y + 1);
  toggle(x, y - 1);
}

function updateDisplay() {
  movesEl.textContent = `Кроки: ${moveCount}`;
  targetEl.textContent = `Мінімум: ${currentLevel.target}`;
  timerEl.textContent = `Час: ${formatTime(elapsedSeconds)}`;
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    timerEl.textContent = `Час: ${formatTime(elapsedSeconds)}`;
  }, 1000);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function checkWin() {
  return gridState.every(row => row.every(cell => cell === 0));
}
