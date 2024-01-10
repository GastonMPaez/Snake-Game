const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 0;

let appleX = 5;
let appleY = 5;

let velocityX=0;
let velocityY=0;

let score = 0;

const pointSound = new Audio("point.mp3");
const gameOverSound = new Audio("GameOver.mp3");

//game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();

    if (result) {
        return;
    }

    clearScreen();

    checkAppleCollision();

    drawApple();
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){
    let gameOver = false;

    if(velocityX == 0 && velocityY == 0) {
        return false;
    }

    //walls
    if (headX < 0) {
        gameOver = true;
        gameOverSound.play();
    } else if (headX === tileCount) {
        gameOver = true;
        gameOverSound.play();
    } else if (headY < 0) {
        gameOver = true;
        gameOverSound.play();
    } else if (headY === tileCount) {
        gameOver = true;
        gameOverSound.play();
    }

    for(let i = 0; i< snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            gameOverSound.play();
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
            
        if (gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
    
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", " magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            ctx.fillStyle = gradient;
    
            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        }
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "green";
    for (let i =0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + velocityX;
    headY = headY + velocityY;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        speed += score * 0.02;
        pointSound.play();
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


drawGame();