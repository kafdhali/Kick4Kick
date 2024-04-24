let container = document.getElementById("container");
let player1 = document.getElementById("player1");
let botpaddle = document.getElementById("botpaddle");
let ball = document.getElementById("ball");
let userscore = document.getElementById("userScore");
let botScore = document.getElementById("botScore");

let ArrowUpPressed = false;
let ArrowDownPressed = false;
let ArrowLeftPressed = false;
let ArrowRightPressed = false;


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


function keyDownHandler(e) {
    if (e.key === 'ArrowUp') {
        ArrowUpPressed = true;
    } else if (e.key === 'ArrowDown') {
        ArrowDownPressed = true;
    } else if (e.key === 'ArrowLeft') {
        ArrowLeftPressed = true;
    } else if (e.key === 'ArrowRight') {
        ArrowRightPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp') {
        ArrowUpPressed = false;
    } else if (e.key === 'ArrowDown') {
        ArrowDownPressed = false;
    } else if (e.key === 'ArrowLeft') {
        ArrowLeftPressed = false;
    } else if (e.key === 'ArrowRight') {
        ArrowRightPressed = false;
    }
}



    // initialize the velocity of the ball
let vx = -5;
let vy = -6;
let v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));

    // function reset when one of the player lose
function reset () {
    
    ball.style.left = "50%";
    ball.style.top = "50%";
    vx = -5;
    vy = -6;
    v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
}

    // function to detect the collision between the ball and the paddle
function detectCollision (currentPaddle){
    // declaring the offsets of the ball to make it easier when i use them in other function
    let balltop = ball.offsetTop ;
    let ballbottom = ball.offsetTop + ball.offsetHeight ;
    let ballleft = ball.offsetLeft ;
    let ballright = ball.offsetLeft + ball.offsetWidth ;
    // declaring the offsets of the paddle to make it easier when i use them in other function
    let paddletop = currentPaddle.offsetTop;    
    let paddlebottom = currentPaddle.offsetTop + currentPaddle.offsetHeight;    
    let paddleleft = currentPaddle.offsetLeft;    
    let paddleright = currentPaddle.offsetLeft + currentPaddle.offsetWidth;    
    
    //
    if( ballbottom > paddletop && 
        balltop < paddlebottom &&
        ballright > paddleleft &&
        ballleft <paddleright){
            return true;
        }
    else{
        return false;

    }
    }



function mechanic(){
    if(ball.offsetLeft <0) {
        botScore.innerHTML = parseInt(botScore.innerHTML) +1; //this will update the botscore whenever the player 1 lose
        whistleSound.play();
        reset();
        
        vx= -vx ;

    }
    if(ball.offsetLeft > container.offsetWidth - ball.offsetWidth) {
        userscore.innerHTML = parseInt(userscore.innerHTML) + 1; ////this will update the player 1 whenever the bot lose
        whistleSound.play();
        reset();
        vx = -vx;
    }
    if(ball.offsetTop < 0) {
        vy = -vy;
    }
    if(ball.offsetTop > container.offsetHeight - ball.offsetHeight) {
        vy = -vy;
    }
    // make the paddle dont across the hight of the container
    let paddle = ball.offsetLeft < container.offsetWidth / 2 ? player1 : botpaddle;
    
    let ballcenterY = ball.offsetTop + ball.offsetHeight / 2; // getting the value between the center of ball and the top of the container
    let paddlecenterY = paddle.offsetTop + paddle.offsetHeight / 2; //getting the value between the center of paddle and the top of the container
    let angle = 0; // we will use it to create the ball reflaction angle
       


    if (detectCollision(paddle)) {
        // if the ball is in the player1 side
        if (paddle === player1) { 
            if (ballcenterY < paddlecenterY) {
                angle = -Math.PI / 4; 
            }
            else if (ballcenterY > paddlecenterY) {
                angle = Math.PI / 4;
            }
            else {
                angle = 0;
            }
            hitSound.play();
        }
        // if the ball is in the botpaddle side
        else if (paddle === botpaddle) {
            if (ballcenterY < paddlecenterY) {
                angle = -3 * Math.PI / 4;
            }
            else if (ballcenterY > paddlecenterY) {
                angle = 3 * Math.PI / 4;
            }
            else {
                angle = 0;
            }
            hitSound.play();
        }
        v = v + 0.6;
        vx = v * Math.cos(angle);
        vy = v * Math.sin(angle);
    }

    let errorDelay = 0.5;
    botpaddle.style.top =
    botpaddle.offsetTop + (ball.offsetTop - botpaddle.offsetTop - botpaddle.offsetHeight / 2) * errorDelay + "px";


    ball.style.left = ball.offsetLeft + vx + "px";
    ball.style.top = ball.offsetTop + vy + "px";
    const paddleSpeed = 5; // Adjust speed as needed
    if (ArrowUpPressed && player1.offsetTop > 0) {
        player1.style.top = player1.offsetTop - paddleSpeed + 'px';
    }
    if (ArrowDownPressed && player1.offsetTop + player1.offsetHeight < container.offsetHeight) {
        player1.style.top = player1.offsetTop + paddleSpeed + 'px';
    }
    if (ArrowLeftPressed && player1.offsetLeft > 0) {
        player1.style.left = player1.offsetLeft - paddleSpeed + 'px';
    }
    if (ArrowRightPressed && player1.offsetLeft + player1.offsetWidth < container.offsetWidth) {
        player1.style.left = player1.offsetLeft + paddleSpeed + 'px';
    }

        requestAnimationFrame(mechanic)

}
mechanic();