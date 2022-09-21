//////////// Game Devloping Rules //////////////
// There are three entity categories: 1) Character 2) Door 3) Boxes
// The character is movable with WASD or arrow keys
// The door is stationary
// The boxes fall from above from a randomized point of origin
// The falling boxes can kill the character
// The character must be able to interact with the door and the boxes
// The character can push and stack the boxes
// The character can jump up on boxes
// The character must be able to reach the door after stacking the boxes properly
// The character must be able to open the door after reaching it
// There must be a colorful celebratory end to the game.
//////////// End Rules //////////////

const game = document.getElementById('canvas')
const ctx = game.getContext('2d')
// const gravity = 1
// const friction =.99
let raf

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

//SFX
let scoreSFX = new Audio("");
let gameOverSFX = new Audio("")
let jumpSFX = new Audio("")

function makeDoor() {
    door = new Image ();
    door.src = './portal/dark-portal.png'
    door.onload = function(){
        ctx.drawImage(door, 0, 0, 30, 30, 600, 45, 40, 40);
    // console.log('this is a portal', makeDoor())
    }
}
// makeDoor();
// console.log(makeDoor())

const box = {
        x: 50,
        y: 300,
        vx: 5,
        vx: 5,
        color: 'pink',
        width: 120,
        height: 120,
        isFalling: true,
        isHeld: false,
        isStacked: false,
        draw () {
            ctx.beginPath();
            // ctx.arc(this.x, this.y, this.width, this.height, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color
            ctx.fill();
        }
    }

function draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, .3)';
    ctx.fillRect(0, 0, game.width, game.height);
    box.draw();
    box.x += box.vx; 
    box.y += box.vy;
    box.vy *= .99;
    box.vy += .25;
    
    if (box.y + box.vy > game.height ||
        box.y + box.vy < 0) {
            box.vy =-box.vy;
        }
    if (box.x + box.xy > game.width ||
        box.x + box.xy < 0) {
            box.vy =-box.xy;
        }
    raf = window.requestAnimationFrame(draw);
    console.log('what does raf do?', raf)
}

game.addEventListener('mouseover', (e) => {
    raf = window.requestAnimationFrame(draw);
});
game.addEventListener('mouseout', (e) =>{
    window.cancelAnimationFrame(raf);
});

box.draw();
console.log('this is a box?', box)
console.log('this should be drawing the box', box.draw())

class Character {
    constructor(x, y, color, width, height, alive) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.isHolding = false,
        this.escaped = false,
        this.speed = 15,
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },

        this.setDirection = function (key) {
            console.log('this is the key that was pressed', key)
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        },

        this.unsetDirection = function (key) {
            console.log('this is the key that was released', key)
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },
        this.movePlayer = function () {
            if (this.direction.up) {
                this.y -= this.speed
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        },
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// random box placement
// const randomBoxes = (max) => {
//     return (Math.floor.random() * max)
// }

const player = new Character(10, 450, 'white', 50, 50, true)
// const box = new Box(10, 10, 'pink', 170, 170)
// const boxTwo = new Box(randomBoxes(game.width), 50, 'red', 64, 96, true)

document.addEventListener('keydown', (e) =>{
    player.setDirection(e.key)
})

document.addEventListener('keyup', (e) =>{
    if(['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

// const detectHit = (boxFall) => {
//     // when the box is falling, the box can kill the character
//     if(player.x + player.y === boxFall.x + boxFall.y) {
//         player.alive = false
//     }
// }

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)

    // box falling loop goes here
    // box stacking loop goes here
    // door reached or not loop goes here

    // if (player.alive) {
    //     box.render()
    //     detectHit(box)
    // // } else if (player.alive === false) {
    //     stopGameLoop()
    // }

    // movement.textContent = player.x + ", " + player.y
    player.render()
    player.movePlayer()
    // box.render()
}

const gameInterval = setInterval(gameLoop, 60)

const stopGameLoop = () => {clearInterval(gameInterval)}

document.addEventListener('DOMContentLoaded', function () {
    gameInterval
})