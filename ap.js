//////////// Game Devloping Rules //////////////
// There are three entity categories: 1) Character 2) Door 3) Boxes
// The character is movable with from side to side with keys 'a' and 'd'
// The character can also jump with the space bar
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
const button = document.getElementById('startBtn')
let raf;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
ctx.width=game.width
ctx.height=game.height
ctx.floor=game.floor
// ctx.lineWidth=5

//SFX
// let scoreSFX = new Audio("");
// let gameOverSFX = new Audio("")
// let jumpSFX = new Audio("")

// Testing start Game button!
// function startBtn() {

// } 

// Portal creation - fixed object - interactable
function makeDoor() {
    door = new Image ();
    door.src = './portal/dark-portal.png'
    door.onload = function(){
        ctx.drawImage(door, 0, 0, 30, 30, 600, 45, 40, 40);
    // console.log('this is a portal', makeDoor())
    }
}

makeDoor();
console.log(makeDoor())

// Box creation. There will be multiple boxes spanning from the top of the screen
const Box = class { //consider making this a class for easily making boxes
    constructor (x, y, color) {
        this.x = x,
        this.y = y,
        this.vx = 0,
        this.vy = 5,
        this.color = color,
        this.width = 75,
        this.height = 75,
        this.falling = true,
        this.isHeld = false,
        this.isStacked = false,
        this.draw = () => {
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.width, this.height, Math.PI * 2, true);
            // ctx.closePath();
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.strokeRect(this.x, this.y, this.width, this.height)
            // ctx.fillStyle = this.color
            // ctx.fill();
            // console.log(this.height)

            },    
        this.fall = () => {
            this.x = this.x+this.vx,
            this.y = this.y+this.vy,
            this.draw()
            if (this.x <= 0) {
                this.x = 0
            }
            if (this.y <= 0) {
                this.y = 0
            }
            }
        }
    }

const AndrewsBox = new Box(50, 15, 'black');
// console.log('this is the box object', AndrewsBox);
// console.log('this is the game', game);
AndrewsBox.draw()

// Eventually this button will start the whole game - should probably go in game loop
game.addEventListener('button.click', function(event){
    AndrewsBox.draw(ctx)
})

// Boxes get sorted here after they've entered the screen
let arrayBoxes = [];

// auto generate blocks
function generateBlocks() {
    let timeDelay = randomNumberInterval(presetTime);
    arrayBoxes.push(new AvoidBox(50, enemySpeed));
}


// function draw(box) {
//     ctx.fillStyle = 'rgba(255, 255, 255, .3)';
//     ctx.fillRect(0, 0, game.width, game.height);
//     // box.draw();
//     box.x += box.vx; 
//     box.y += box.vy;
//     box.vy *= .99;
//     box.vy += .25;
    
//     if (box.y + box.vy > game.height ||
//         box.y + box.vy < 0) {
//             box.vy =-box.vy;
//         }
//     if (box.x + box.xy > game.width ||
//         box.x + box.xy < 0) {
//             box.vy =-box.xy;
//         }
//     raf = window.requestAnimationFrame(draw);
//     console.log('what does raf do?', raf)
// }

// game.addEventListener('DOMContentLoaded', (e) => {
//     raf = window.requestAnimationFrame(draw);
// });
// // game.addEventListener('DOMContentLoaded', (e) =>{
//     window.cancelAnimationFrame(raf);
// });

// box.draw();
// console.log('this is a box?', box)
// console.log('this should be drawing the box', box.draw())

// the main character
class Character {
    constructor(x, y, width, height, alive) {
        this.x = 0,
        this.y = 550,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.color = 'black',
        this.jumpHeight = 12;
        this.shouldJump = false;
        this.jumpCounter = 0;
        // this.isHolding = false,
        // this.escaped = false,
        this.speed = 15,
        this.direction = {
            // up: false,
            // down: false,
            left: false,
            right: false,
        }
    
        // jump() {
        //     if(this.shouldJump) {
        //         this.jumpCounter++
        //         if(this.jumpCounter < 15) {
        //             // jump up
        //             this.y -= this.jumpHeight;
        //         } else if(this.jumpCounter > 14 && this.jumpCounter < 19) {
        //             this.y += 0;
        //         } else if(this.jumpCounter < 33) {
        //             // fall back down
        //             this.y += this.jumpHeight;
        //         }
        //         // End the cycle
        //         if (this.jumpCounter >= 32) {
        //             this.shouldJump = false;
        //         }
        //     }
        // }

        // draw() {
        //     this.jump();
        //     ctx.fillStyle = this.color;
        //     ctx.fillRect(this.x, this.y, this.size, this.size);
        //     // this.size is NOT A TYPO
        // }

        // horizontal movement
        this.setDirection = function (key) {
            // console.log('this is the key that was pressed', key)
            // if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            // if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        },

        this.unsetDirection = function (key) {
            // console.log('this is the key that was released', key)
            // if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            // if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },

        this.moveCharacter = function () {
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


    const character = new Character(0, 550, 50, 50, true)

    function animate () {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Canvas Logic
        drawBackground();
        // Foreground
        character.draw();
    }

    // animate(character);
    // const character = new Character(10, 450, 'white', 50, 50, true)
    // random box placement
    // const randomBoxes = (max) => {
    //     return (Math.floor.random() * max)
    // }

    // Event Listeners
    // addEventListener("keydown", e =>{
    //     if(e.code === "Space") {
    //         if(!character.shouldJump) {
    //             // jumpSFX.play();
    //             character.jumpCounter = 0;
    //             character.shouldJump = true;
    //         }
    //     }
    // })

document.addEventListener('keydown', (e) =>{
    character.setDirection(e.key)
})

document.addEventListener('keyup', (e) =>{
    if(['w', 'a', 's', 'd'].includes(e.key)) {
        character.unsetDirection(e.key)
    }
})

const detectHit = (thing) => {
    // when the box is falling, the box can kill the character
    if(character.x + character.y === boxFall.x + boxFall.y) {
        character.alive = false
    }
}

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)

    if (AndrewsBox.falling === true) {
        AndrewsBox.fall()
    }
    
    // this will replace the loop above, when I figure out my rendering issue
    if (Character.alive === true) {
        // music
        AndrewsBox.falling === true
        AndrewsBox.fall()
    }

    // box falling loop goes here
    // box stacking loop goes here
    // door reached or not loop goes here

    // if (character.alive) {
    //     box.render()
    //     detectHit(box)
    // // } else if (character.alive === false) {
    //     stopGameLoop()
    // }

    // movement.textContent = character.x + ", " + character.y
    character.render()
    character.moveCharacter()
    // console.log('character movement', character.moveCharacter)
    // box.render()
}

const gameInterval = setInterval(gameLoop, 60)

const stopGameLoop = () => {clearInterval(gameInterval)}

document.addEventListener('DOMContentLoaded', function () {
    gameInterval
})