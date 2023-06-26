var myApp = document.getElementById("app");
var shipPos = 95;
var invadersPos = [12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37]
var bulletPos = 0;
var score = 0;
var bulletShot = false;


function drawBoard() {
    for (let i = 0; i < 10; i++) {
        var row = document.createElement('div');
        row.classList.add("d-flex");
        for (let i = 0; i < 10; i++) {
            var squares = document.createElement('div');
            squares.style.height = "50px";
            squares.style.width = "50px";
            squares.classList.add("bg-success");
            squares.classList.add("squares");
            squares.classList.add("d-flex");
            squares.classList.add("justify-content-center");
            squares.classList.add("align-content-middle");
            row.appendChild(squares);
        }
        myApp.appendChild(row);
    }
}
drawBoard();

var board = document.getElementsByClassName("squares");
var spaceship = document.createElement("img")
var scoreboard = document.createElement("div")

spaceship.src = "cohete.png"
spaceship.style.height = "50px"
spaceship.style.width = "50px"

scoreboard.classList.add("score")
scoreboard.innerHTML = score.toString().padStart(5, "0")
scoreboard.style.position = "relative"
scoreboard.style.left = "40px"
scoreboard.style.top = "15px"

board[0].appendChild(scoreboard)
board[shipPos].appendChild(spaceship)

function drawInvaders() {
    for (let x of invadersPos) {
        var invader = document.createElement("img")
        invader.src = "ovni.png"
        invader.style.height = "50px"
        invader.style.width = "50px"
        invader.classList.add('invader')
        board[x].appendChild(invader)
    }
}
drawInvaders()

var invaders = document.getElementsByClassName('invader')

function checkInvader() {
    console.log("invadersPos", invadersPos, "bulletPos", bulletPos)
    var check = invadersPos.indexOf(bulletPos)
    
    if(check == -1) {
        return false
    } else {
        return check
    }
}
var levelClr = document.createElement("div")
levelClr.innerHTML = "LEVEL<br>CLEAR"
levelClr.classList.add("level-clear")
levelClr.classList.add("d-none")
levelClr.style.position = "relative"
levelClr.style.left = "150px"
levelClr.style.bottom = "350px"
myApp.appendChild(levelClr)



function checkWin() {
    let allClear = 0;
    for (let x of invadersPos) {
        allClear += x;
    }
    if (!allClear){
        levelClr.classList.remove("d-none")
        console.log("Ganaste")
    }
}

function shoot(myI) {
    console.log("entra en shoot")
    var bullet = document.getElementById('bullet');
    board[bulletPos].removeChild(bullet)
    bulletPos-=10
    board[bulletPos].appendChild(bullet)
    var hit = checkInvader()
    console.log(hit)
    if (hit !== false) {
        console.log("HIT")
        board[bulletPos].removeChild(bullet)
        console.log(invaders[hit])
        invaders[hit].classList.add('d-none')
        score+=100
        scoreboard.innerHTML = score.toString().padStart(5, "0")
        invadersPos[hit] = 0
        bulletPos = 0
        bulletShot = false
        clearInterval(myI)
        checkWin()
    } else {
        console.log("NOT HIT")
            if(bulletPos < 10 && bulletShot == true) {
        clearInterval(myI)
        board[bulletPos].removeChild(bullet)
        bulletShot = false
        bulletPos = 0
        return false
    }
    }

}

// DEBUG BUTTON

var button = document.createElement("button")
button.addEventListener('click', debugBtn)
myApp.appendChild(button)



function debugBtn() {
    shoot();
}

function keyHandle(event) {
    if (event.key == "ArrowLeft") {
        if (shipPos != 90) {
            board[shipPos].removeChild(spaceship)
            shipPos--
            board[shipPos].appendChild(spaceship)
        }
    }
    if (event.key == "ArrowRight") {
        if (shipPos != 99) {
            board[shipPos].removeChild(spaceship)
            shipPos++
            board[shipPos].appendChild(spaceship)
        }
    }
    if (event.key == " " && bulletShot == false) {
        bulletShot = true
        var bullet = document.createElement("img")
        bullet.src = "bala.png"
        bullet.style.height = "25px"
        bullet.style.width = "25px"
        bullet.id = 'bullet'
        bulletPos = shipPos-10
        board[bulletPos].appendChild(bullet)
        let  myInterval = setInterval(()=> shoot(myInterval), 50);
    }
}

window.addEventListener('keydown', keyHandle)

var app = angular.module('MyApp', []);
app.controller('myCtrl', function ($scope) {

}
)