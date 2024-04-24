let container = document.getElementById("container");
let player1 = document.getElementById("player1");
let botpaddle = document.getElementById("botpaddle");
let ball = document.getElementById("ball");
let userscore = document.getElementById("userScore");
let botScore = document.getElementById("botScore");

let ArrowUpPressed = false;
let ArrowDownPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == 'ArrowUp') {
        ArrowUpPressed = true;
        // console.log("z pressed");
    }
    else if (e.key == 'ArrowDown') {
        ArrowDownPressed = true;
        // console.log("x pressed");
    }
}

function keyUpHandler(e) {
    if (e.key == 'ArrowUp') {
        ArrowUpPressed = false;
        // console.log("z released");
    }
    else if (e.key == 'ArrowDown') {
        ArrowDownPressed = false;
        // console.log("x released");
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
    vx = 3;
    vy = 4;
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
        reset();
        
        vx= -vx ;

    }
    if(ball.offsetLeft > container.offsetWidth - ball.offsetWidth) {
        userscore.innerHTML = parseInt(userscore.innerHTML) + 1; ////this will update the player 1 whenever the bot lose
        reset();
        vx = -vx;
    }
    if(ball.offsetTop < 0) {
        vy = -vy;
    }
    if(ball.offsetTop > container.offsetHeight - ball.offsetHeight) {
        vy = -vy;
    }
    
    let paddle = ball.offsetLeft < container.offsetWidth / 2 ? player1 : botpaddle;
    let ballcenterY = ball.offsetTop + ball.offsetHeight / 2;
    let paddlecenterY = paddle.offsetTop + paddle.offsetHeight / 2;
    let angle = 0;
       


    if (detectCollision(paddle)) {
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
        }
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
        }
        v = v + 0.5;
        vx = v * Math.cos(angle);
        vy = v * Math.sin(angle);
    }

    let aidelay = 0.3;
    botpaddle.style.top =
    botpaddle.offsetTop + (ball.offsetTop - botpaddle.offsetTop - botpaddle.offsetHeight / 2) * aidelay + "px";


    ball.style.left = ball.offsetLeft + vx + "px";
    ball.style.top = ball.offsetTop + vy + "px";
    if (ArrowUpPressed && player1.offsetTop > 55) {
        player1.style.top = player1.offsetTop - 5 + "px";
    }
    if (ArrowDownPressed && player1.offsetTop < container.offsetHeight
        - player1.offsetHeight + 45) {
        player1.style.top = player1.offsetTop + 5 + "px";
    }
    
    requestAnimationFrame(mechanic)

}
mechanic();





