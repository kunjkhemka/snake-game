// Get the canvas element and create the game context
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Set up initial game variables
const tileSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = getRandomFoodPosition();
let dx = 0;
let dy = 0;
let score = 0;

// Main game loop
function gameLoop() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  checkCollision();
  drawScore();

  setTimeout(gameLoop, 100);
}

// Function to clear the canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = getRandomFoodPosition();
  } else {
    snake.pop();
  }
}

// Function to draw the snake
function drawSnake() {
  snake.forEach((segment) => {
    context.fillStyle = '#333333';
    context.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

// Function to generate random food position
function getRandomFoodPosition() {
  const x = Math.floor(Math.random() * (canvas.width / tileSize));
  const y = Math.floor(Math.random() * (canvas.height / tileSize));
  return { x, y };
}

// Function to draw the food
function drawFood() {
  context.fillStyle = '#ff0000';
  context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Function to check collision
function checkCollision() {
  const head = snake[0];

  // Check collision with walls
  if (head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize) {
    gameOver();
  }

  // Check collision with self
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

// Function to end the game
function gameOver() {
  alert('Game Over! Your score: ' + score);
  resetGame();
}

// Function to reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = getRandomFoodPosition();
  dx = 0;
  dy = 0;
  score = 0;
}

// Function to handle keyboard input
function handleInput(event) {
  const key = event.key.toLowerCase();

  if (key === 'arrowup' && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (key === 'arrowdown' && dy !== -1) {
    dx = 0;
    dy = 1;
  } else if (key === 'arrowleft' && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (key === 'arrowright' && dx !== -1) {
    dx = 1;
    dy = 0;
  }
}

// Function to draw the score
function drawScore() {
  context.fillStyle = '#333333';
  context.font = '16px Arial';
  context.fillText('Score: ' + score, 10, 20);
}

// Set up event listener for keyboard input
document.addEventListener('keydown', handleInput);

// Start the game loop
gameLoop();
