const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;

// Create paddles and ball
let user = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "white", score: 0 };
let ai = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "white", score: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballRadius, speed: 5, velocityX: 5, velocityY: 5, color: "white" };

// Draw rectangle
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Draw circle
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// Draw text
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px sans-serif";
  ctx.fillText(text, x, y);
}

// Control user paddle
canvas.addEventListener("mousemove", evt => {
  let rect = canvas.getBoundingClientRect();
  user.y = evt.clientY - rect.top - user.height / 2;
});

// Collision detection
function collision(b, p) {
  return b.x < p.x + p.width && b.x + b.radius > p.x && b.y < p.y + p.height && b.y + b.radius > p.y;
}

// Reset ball
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX *= -1;
  ball.speed = 5;
}

// Update game
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // AI movement
  ai.y += ((ball.y - (ai.y + ai.height / 2))) * 0.09;

  // Ball collision with top and bottom
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  // Ball collision with paddles
  let player = (ball.x < canvas.width / 2) ? user : ai;
  if (collision(ball, player)) {
    let collidePoint = ball.y - (player.y + player.height / 2);
    collidePoint = collidePoint / (player.height / 2);
    let angleRad = collidePoint * (Math.PI / 4);
    let direction = (ball.x < canvas.width / 2) ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);
    ball.speed += 0.5;
  }

  // Update score
  if (ball.x - ball.radius < 0) {
    ai.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
  }
}

// Render everything
function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#222");
  drawText(user.score, canvas.width / 4, 50, "white");
  drawText(ai.score, 3 * canvas.width / 4, 50, "white");
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Game loop
function game() {
  update();
  render();
}

setInterval(game, 1000 / 60);
