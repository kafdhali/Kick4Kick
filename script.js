document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("startButton").addEventListener("click", function () {
    window.location.href = "game.html";
  });
});
const container = document.getElementById("container");
const player1 = document.getElementById("player1");
const botpaddle = document.getElementById("botpaddle");
const ball = document.getElementById("ball");
const userscore = document.getElementById("userScore");
const botScore = document.getElementById("botScore");
const winner = document.getElementById("winner");
const playAgainBtn = document.getElementById("playAgainBtn");
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");

let ArrowUpPressed = false;
let ArrowDownPressed = false;
let ArrowLeftPressed = false;
let ArrowRightPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("startButton").addEventListener("click", function () {
    window.location.href = "game.html";
  });
});

function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    ArrowUpPressed = true;
  } else if (e.key === "ArrowDown") {
    ArrowDownPressed = true;
  } else if (e.key === "ArrowLeft") {
    ArrowLeftPressed = true;
  } else if (e.key === "ArrowRight") {
    ArrowRightPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowUp") {
    ArrowUpPressed = false;
  } else if (e.key === "ArrowDown") {
    ArrowDownPressed = false;
  } else if (e.key === "ArrowLeft") {
    ArrowLeftPressed = false;
  } else if (e.key === "ArrowRight") {
    ArrowRightPressed = false;
  }
}

// initialize the velocity of the ball
let vx = -5;
let vy = -6;
let v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));

// function reset when one of the player lose
function reset() {
  ball.style.left = "50%";
  ball.style.top = "50%";
  vx = -5;
  vy = -6;
  v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
}
function startGame() {
  botScore.innerHTML = "0";
  userscore.innerHTML = "0";
  reset();
  winner.style.display = "none";
}

// function to detect the collision between the ball and the paddle
function detectCollision(currentPaddle) {
  // declaring the offsets of the ball to make it easier when i use them in other function
  let balltop = ball.offsetTop;
  let ballbottom = ball.offsetTop + ball.offsetHeight;
  let ballleft = ball.offsetLeft;
  let ballright = ball.offsetLeft + ball.offsetWidth;
  // declaring the offsets of the paddle to make it easier when i use them in other function
  let paddletop = currentPaddle.offsetTop;
  let paddlebottom = currentPaddle.offsetTop + currentPaddle.offsetHeight;
  let paddleleft = currentPaddle.offsetLeft;
  let paddleright = currentPaddle.offsetLeft + currentPaddle.offsetWidth;

  //
  if (
    ballbottom > paddletop &&
    balltop < paddlebottom &&
    ballright > paddleleft &&
    ballleft < paddleright
  ) {
    return true;
  } else {
    return false;
  }
}

function mechanic() {
  if (ball.offsetLeft < 0) {
    botScore.innerHTML = parseInt(botScore.innerHTML) + 1; //this will update the botscore whenever the player 1 lose
    whistleSound.play();
    if (parseInt(botScore.innerHTML) >= 5) {
      player1Score.innerHTML = parseInt(userscore.innerHTML);
      player2Score.innerHTML = parseInt(botScore.innerHTML);
      winner.style.display = "block";
      ball.style.left = "50%";
      ball.style.top = "50%";
      vx = 0;
      vy = 0;
      v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
      playAgainBtn.addEventListener("click", function () {
        startGame();
      });
    } else {
      reset();

      vx = -vx;
    }
  }
  if (ball.offsetLeft > container.offsetWidth - ball.offsetWidth) {
    userscore.innerHTML = parseInt(userscore.innerHTML) + 1; ////this will update the player 1 whenever the bot lose
    whistleSound.play();

    if (parseInt(userscore.innerHTML) >= 5) {
      player1Score.innerHTML = parseInt(userscore.innerHTML);
      player2Score.innerHTML = parseInt(botScore.innerHTML);
      winner.style.display = "block";
      ball.style.left = "50%";
      ball.style.top = "50%";
      vx = 0;
      vy = 0;
      v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
      playAgainBtn.addEventListener("click", function () {
        startGame();
      });
    } else {
      reset();

      vx = -vx;
    }
  }
  if (ball.offsetTop < 0) {
    vy = -vy;
  }
  if (ball.offsetTop > container.offsetHeight - ball.offsetHeight) {
    vy = -vy;
  }
  // make the paddle dont across the hight of the container
  let paddle =
    ball.offsetLeft < container.offsetWidth / 2 ? player1 : botpaddle;

  let ballcenterY = ball.offsetTop + ball.offsetHeight / 2; // getting the value between the center of ball and the top of the container
  let paddlecenterY = paddle.offsetTop + paddle.offsetHeight / 2; //getting the value between the center of paddle and the top of the container
  let angle = 0; // we will use it to create the ball reflaction angle

  if (detectCollision(paddle)) {
    // if the ball is in the player1 side
    if (paddle === player1) {
      if (ballcenterY < paddlecenterY) {
        angle = -Math.PI / 4;
      } else if (ballcenterY > paddlecenterY) {
        angle = Math.PI / 4;
      } else {
        angle = 0;
      }
      hitSound.play();
    }
    // if the ball is in the botpaddle side
    else if (paddle === botpaddle) {
      if (ballcenterY < paddlecenterY) {
        angle = (-3 * Math.PI) / 4;
      } else if (ballcenterY > paddlecenterY) {
        angle = (3 * Math.PI) / 4;
      } else {
        angle = 0;
      }
      hitSound.play();
    }
    v = v + 0.6;
    vx = v * Math.cos(angle);
    vy = v * Math.sin(angle);
  }

  let errorDelay = 0.2;
  botpaddle.style.top =
    botpaddle.offsetTop +
    (ball.offsetTop - botpaddle.offsetTop - botpaddle.offsetHeight / 2) *
      errorDelay +
    "px";

  ball.style.left = ball.offsetLeft + vx + "px";
  ball.style.top = ball.offsetTop + vy + "px";
  const paddleSpeed = 5; // Adjust speed
  if (ArrowUpPressed && player1.offsetTop > 55) {
    player1.style.top = player1.offsetTop - paddleSpeed + "px";
  }
  if (
    ArrowDownPressed &&
    player1.offsetTop + player1.offsetHeight < container.offsetHeight + 50
  ) {
    player1.style.top = player1.offsetTop + paddleSpeed + "px";
  }
  if (ArrowLeftPressed && player1.offsetLeft > 0) {
    player1.style.left = player1.offsetLeft - paddleSpeed + "px";
  }
  if (
    ArrowRightPressed &&
    player1.offsetLeft + player1.offsetWidth < container.offsetWidth / 2
  ) {
    player1.style.left = player1.offsetLeft + paddleSpeed + "px";
  }

  requestAnimationFrame(mechanic);
}
mechanic();
