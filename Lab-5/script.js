const startBtn = document.getElementById('start');
const difficultySelect = document.getElementById('difficulty');
const colorPicker = document.getElementById('color');
const scoreBoard = document.getElementById('score');
const gameOverDiv = document.getElementById('gameover');
const timerDisplay = document.getElementById('timer');

let score = 0;
let spawnTime = 4000;
let clickTimeout;
let currentSquares = [];
let timerInterval;
let clickedSquares = 0;
let baseSquareSize = 50;

function startGame() {
  const difficulty = difficultySelect.value;
  const color = colorPicker.value;

  if (difficulty === 'easy') spawnTime = 4000;
  else if (difficulty === 'medium') spawnTime = 2000;
  else if (difficulty === 'hard') spawnTime = 1000;
  else if (difficulty === 'superhard') spawnTime = 2000;

  document.getElementById('menu').style.display = 'none';
  score = 0;
  scoreBoard.firstChild.textContent = 'Рахунок: 0';
  timerDisplay.textContent = 'Час: 0.0 с';
  gameOverDiv.style.display = 'none';

  spawnNewSquare(color, difficulty);
}

function spawnNewSquare(color, difficulty) {
  clearSquares();
  clickedSquares = 0;

  let squaresNeeded = (difficulty === 'superhard') ? 2 : 1;
  let sizeMultiplier = getSizeMultiplier(difficulty);
  let currentSquareSize = baseSquareSize * sizeMultiplier;

  for (let i = 0; i < squaresNeeded; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = color;
    square.style.width = `${currentSquareSize}px`;
    square.style.height = `${currentSquareSize}px`;
    square.style.top = `${Math.random() * (window.innerHeight - currentSquareSize)}px`;
    square.style.left = `${Math.random() * (window.innerWidth - currentSquareSize)}px`;

    square.addEventListener('click', (e) => {
      e.stopPropagation();

      score++;
      clickedSquares++;
      scoreBoard.firstChild.textContent = `Рахунок: ${score}`;

      square.remove();
      currentSquares = currentSquares.filter(s => s !== square);

      if (difficulty !== 'superhard' || clickedSquares === 2) {
        clearTimeout(clickTimeout);
        clearInterval(timerInterval);
        spawnNewSquare(color, difficulty);
      }
    });

    document.body.appendChild(square);
    currentSquares.push(square);
  }

  startTimer(difficulty);
}

function getSizeMultiplier(difficulty) {
  if (difficulty === 'easy') return 1.0;
  if (difficulty === 'medium') return 0.85;
  if (difficulty === 'hard') return 0.7;
  if (difficulty === 'superhard') return 0.55;
}

function startTimer(difficulty) {
  let timeLeft = spawnTime / 1000;
  timerDisplay.textContent = `Час: ${timeLeft.toFixed(1)} с`;

  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    } else {
      timerDisplay.textContent = `Час: ${timeLeft.toFixed(1)} с`;
    }
  }, 100);

  clickTimeout = setTimeout(() => {
    clearInterval(timerInterval);
    gameOver();
  }, spawnTime);
}

function clearSquares() {
  currentSquares.forEach(square => square.remove());
  currentSquares = [];
}

function gameOver() {
  clearSquares();
  gameOverDiv.style.display = 'block';
}

startBtn.addEventListener('click', startGame);
