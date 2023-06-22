var myApp = document.getElementById("app");
var shipPos = 95;
var invadersPos = [12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37]
var bulletPos = 0;
var score = 0;

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

var board = document.getElementsByClassName("squares");
var spaceship = document.createElement("img")

spaceship.src = "cohete.png"
spaceship.style.height = "50px"
spaceship.style.width = "50px"
board[shipPos].appendChild(spaceship)

for (let x of invadersPos) {
    var invader = document.createElement("img")
    invader.src = "ovni.png"
    invader.style.height = "50px"
    invader.style.width = "50px"
    invader.classList.add('invader')
    board[x].appendChild(invader)
}

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



function shoot() {
    console.log("entra en shoot")
    var bullet = document.getElementById('bullet');
    board[bulletPos].removeChild(bullet)
    bulletPos-=10
    board[bulletPos].appendChild(bullet)
    var hit = checkInvader()
    console.log(hit)
    if (hit) {
        console.log("HIT")
        board[bulletPos].removeChild(bullet)
        console.log(invader[hit])
        invaders[hit].classList.add('d-none')
        invadersPos[hit] = 0
        bulletPos = 0
    } else {
        console.log("NOT HIT")
    }
}

var button = document.createElement("button")
button.addEventListener('click', debugBtn)
myApp.appendChild(button)

function debugBtn() {
    shoot();
}
function moveShip(event) {
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
    if (event.key == " ") {
        console.log("Empieza el Espacio")
        var bullet = document.createElement("img")
        bullet.src = "bala.png"
        bullet.style.height = "25px"
        bullet.style.width = "25px"
        bullet.id = 'bullet'
        bulletPos = shipPos-10
        board[bulletPos].appendChild(bullet)
        while(bulletPos > 0){
            console.log("Entra en el while")
            //setTimeout(shoot, 1000);
        }
    }
}

window.addEventListener('keydown', moveShip)


/*var app = angular.module('MyApp', []);
app.controller('myCtrl', function ($scope) {

}
)*/