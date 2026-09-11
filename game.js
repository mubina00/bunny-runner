const canvas = document.getElementById('gameCanvas') ;
const pen = canvas.getContext('2d') ;

let bunnyX = 150 ;
let bunnyY = 260 ;
let velocityY = 0 ;
let gravity = 0.5 ;
let isJumping = false ;
let obstacleX = 800 ;
let obstacleY = 280 ;
let obstacleWidth = 30 ;
let obstacleHeight = 40 ;
let obstacleSpeed = 5 ;
let obstacleGap = 300 ;
let carrotX = 1000 ;
let carrotY = 240 ;
let carrotSize = 12 ;
let score = 0 ;
let highScore = 0 ;
let gameStarted = false ;

pen.fillStyle = "pink" ;

//body
pen.beginPath() ;
pen.arc(bunnyX, bunnyY, 20, 0, Math.PI * 2) ;
pen.fill() ;

//head
pen.beginPath() ;
pen.arc(bunnyX, bunnyY - 30, 15, 0, Math.PI * 2) ;
pen.fill() ;

//ears
pen.fillRect(bunnyX - 10, bunnyY - 60, 7, 25) ;
pen.fillRect(bunnyX + 3, bunnyY - 60, 7, 25) ;

//eyes
pen.fillStyle = "black" ;

pen.beginPath() ;
pen.arc(bunnyX - 5, bunnyY - 33, 2, 0, Math.PI * 2) ;
pen.fill() ;

pen.beginPath() ;
pen.arc(bunnyX + 5, bunnyY - 33, 2, 0 , Math.PI * 2) ;
pen.fill() ;

//nose
pen.beginPath() ;
pen.arc(bunnyX, bunnyY - 27, 2, 0, Math.PI * 2) ;
pen.fill() ;

//ground
pen.fillStyle = "green" ;
pen.fillRect(0, 280, 800, 20) ;

document.addEventListener("keydown", function(event) {

    if (event.key === " " && !gameStarted) {
        gameStarted = true ;
        bunnyY = 260 ;
        velocityY = 0 ;
        obstacleX = 800 ;
        score = 0 ;
        return ;
    }

    if (event.key === " " && gameStarted && !isJumping) {
        velocityY = -10 ;
        isJumping = true ;
    }

}) ;

function drawGame() {
    pen.clearRect(0, 0, canvas.width, canvas.height) ;
    pen.fillStyle = "lightblue" ;
    pen.fillRect(0, 0, canvas.width, canvas.height) ;

    pen.fillStyle = "white" ;
    pen.beginPath() ;
    pen.arc(200, 70, 20, 0, Math.PI * 2) ;
    pen.arc(225, 70, 25, 0, Math.PI * 2) ;
    pen.arc(250, 70, 20, 0, Math.PI * 2) ;
    pen.fill() ;

    pen.beginPath() ;
    pen.arc(500, 100, 15, 0, Math.PI * 2) ;
    pen.arc(520, 100, 20, 0, Math.PI * 2) ;
    pen.arc(540, 100, 15, 0, Math.PI * 2) ;
    pen.fill() ;

    pen.fillStyle = "lightpink" ;

    //body
    pen.beginPath() ;
    pen.arc(bunnyX, bunnyY, 20, 0, Math.PI * 2) ;
    pen.fill() ;

    //head
    pen.beginPath() ;
    pen.arc(bunnyX, bunnyY - 30, 15, 0, Math.PI * 2) ;
    pen.fill() ;

    //ears
    pen.fillRect(bunnyX - 10, bunnyY - 60, 7, 25) ;
    pen.fillRect(bunnyX + 3, bunnyY - 60, 7, 25) ;

    //eyes
    pen.fillStyle = "black" ;

    pen.beginPath() ;
    pen.arc(bunnyX - 5, bunnyY - 33, 2, 0, Math.PI * 2) ;
    pen.fill() ;

    pen.beginPath() ;
    pen.arc(bunnyX + 5, bunnyY - 33, 2, 0 , Math.PI * 2) ;
    pen.fill() ;

    //nose
    pen.beginPath() ;
    pen.arc(bunnyX, bunnyY - 27, 2, 0, Math.PI * 2) ;
    pen.fill() ;

    //ground
    pen.fillStyle = "green" ;
    pen.fillRect(0, 280, 800, 20) ;

    pen.fillStyle = "darkgreen" ;
    pen.fillRect(0, 280, 800, 4) ;

    //score
    pen.fillStyle = "black" ;
    pen.font = "20px Arial" ;
    pen.fillText("Score: " + Math.floor(score / 10), 20, 30) ;
    pen.fillText("High Score: " + Math.floor(highScore / 10), 20, 55) ;

    //obstacle
    pen.fillStyle = "green" ;

    pen.fillRect(obstacleX, obstacleY - obstacleHeight, obstacleWidth, obstacleHeight) ;
    pen.fillRect(obstacleX - 10, obstacleY - 30, 10, 10) ;
    pen.fillRect(obstacleX + obstacleWidth, obstacleY - 20, 10, 10) ;

    //carrot
    pen.fillStyle = "orange" ;
    pen.fillRect(carrotX, carrotY, carrotSize, carrotSize) ;

    pen.fillStyle = "green" ;
    pen.fillRect(carrotX + 4, carrotY - 8, 4, 8) ;
}

drawGame() ;

function gameLoop() {
    if (!gameStarted) {
        return ;
    }

    velocityY += gravity ;
    bunnyY += velocityY ;
    score++ ;

    if (bunnyY >= 260) {
        bunnyY = 260 ;
        velocityY = 0 ;
        isJumping = false ;
    }
    obstacleX -= obstacleSpeed ;
    carrotX -= obstacleSpeed ;

    if (obstacleX + obstacleWidth < 0) {
        obstacleX = 800 + Math.random() * obstacleGap ;
        obstacleSpeed += 0.2 ;
    }

    if (carrotX < -carrotSize) {
        carrotX = 800 + Math.random() * 500 ;
        carrotY = 220 + Math.random() * 40 ;
    }

    if (bunnyX + 20 > obstacleX && bunnyX - 20 < obstacleX + obstacleWidth && bunnyY > obstacleY - obstacleHeight) {
        if (score > highScore) {
            highScore = score ;
        }

        gameStarted = false ;
        alert("Game Over!") ;
    }

    //carrot collection
    if (bunnyX + 20 > carrotX && bunnyX - 20 < carrotX + carrotSize && bunnyY - 20 < carrotY + carrotSize && bunnyY + 20 > carrotY) {
        score += 50 ;
        carrotX = 800 + Math.random() * 500 ;
        carrotY = 220 + Math.random() * 40 ;
    }

    drawGame() ;
}

setInterval(gameLoop, 1000 / 60) ;

const startButton = document.getElementById("startButton") ;

startButton.addEventListener("click", function() {
    gameStarted = true ;
    bunnyY = 260 ;
    velocityY = 0 ;
    obstacleX = 800 ;
    score = 0 ;
}) ;