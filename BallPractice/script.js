
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var brickRowCount = 5;
var brickColumnCount = 6;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 20;
var brickOffsetLeft = 150;
var x= 300;
var y = 300;
var dx = 5;
var dy = 3;
var rightPressed = false;
var leftPressed = false;
var dPaddle = 10;
var paddleX = 300;
var paddleY = canvas.height - 50;
var ballR = 10;
var score = 0;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0,  status: 1 };
    }
}

function collisionDetection() {
    let switched = false;
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x+ballR > b.x && x-ballR < b.x + brickWidth && y+ballR > b.y && y-ballR < b.y + brickHeight) {
                    if(!switched)
                    {
                        dy = -dy;
                        switched = !switched;
                        score +=1;
                    }
                    b.status = 0;
                }
            }
        }
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawPaddle()
{
    
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, 75, 10 );
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawBall()
{
    
    ctx.beginPath();
    ctx.arc(x, y, ballR, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    console.log('bricks');
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1)
            {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if((y+ ballR) < (paddleY +10))
    {
        collisionDetection();
        if(rightPressed && (paddleX + 75) <= canvas.width)
        {
            paddleX += dPaddle;
        }
        if(leftPressed && paddleX > 0)
        {
            paddleX -= dPaddle;
        }
        if((x-ballR) < 0 || (x+ballR) > canvas.width)
        {
            dx = -dx;
        }
        if((y-ballR) < 0 || (y+ballR) > canvas.height ||
                ((x+ballR) >= paddleX && ((x- ballR) <= (paddleX + 75)) && ((y+ballR) >= paddleY) && ((y+ballR) <= (paddleY +10))))
        {
            dy = -dy;
        }
        x += dx;
        y += dy;
    }
    else{
        alert("GAME OVER");
        document.location.reload();
        clearInterval(Interval);
        x = Math.floor(canvas.width/2);
        y = paddleY -10;
    }

    
    drawBall();
    drawPaddle();
    drawBricks();
}


Interval = setInterval(draw, 20);