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

// Portal creation - fixed object - interactable
class Portal {
    constructor(isReached){
        this.x = this.x,
        this.y = this.y,
        this.width = this.width,
        this.height = this.height,
        this.color = 'red',
        this.isReached = isReached,
        this.draw = () => {
            ctx.fillRect(525, 25, 100, 100);
            ctx.clearRect(545, 45, 60, 60);
            ctx.strokeRect(550, 50, 50, 50);
        }
    // console.log(Portal)
    }
}

const portal = new Portal(false) 

// adding in platforms for ease of movement
class Plaftform {
    constructor(x, y, width) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = 10
        this.color = 'blue',
        this.draw = () => {
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.strokeRect(this.x, this.y, this.width, this.height)
            ctx.fillStyle = this.color
        }
    }
}

// I'm sure there's an easier way to do this, but this is what I got right now
const platformOne = new Plaftform(500, 500, 100);
const platformTwo = new Plaftform(400, 400, 50);
const platformThree = new Plaftform(250, 350, 25);
const platformFour = new Plaftform(100, 250, 60);
const platformFive = new Plaftform(280, 150, 80);
const platformSix = new Plaftform(440, 190, 40);


// Box creation. There will be multiple boxes spanning from the top of the screen
const Box = class {
    constructor (x, y, falling) {
        this.x = x,
        this.y = y,
        this.vx = 0,
        this.vy = 5,
        this.color = 'purple',
        this.width = 75,
        this.height = 75,
        this.falling = falling,
        this.isHeld = false,
        this.isStacked = false,
        this.draw = () => {
            // ctx.beginPath();
            // ctx.arc(this.x, this.y, this.width, this.height, Math.PI * 2, true);
            // ctx.closePath();
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.strokeRect(this.x, this.y, this.width, this.height)
            ctx.fillStyle = this.color
            // ctx.fill();
            // console.log(this.height)
            },    
        this.fall = () => {
            if (this.y >= 530) {
                // console.log('this is y', this.y)
                this.y = 530
                this.falling = false
            } else {
            this.y = this.y+this.vy
            // this.x = this.x+this.xy
            }
        }
            // this.draw()
        }
    }

// Andrew helped me get the boxes to work, so, I'm leaving this in
const AndrewsBox = new Box(50, 0, true);
// console.log('this is the box object', AndrewsBox);
// console.log('this is the game', game);

// Boxes get sorted here after they've entered the screen
let arrayBoxes = [];

let boxTimer = 0
let dropSpeed = 60

// auto generate blocks
function generateBox() {
    // console.log('array box length', arrayBoxes.length)
    // console.log('this is the boxTimer', boxTimer)
    // let timeDelay = randomNumberInterval(presetTime);
    // set timer and set max produced boxed
    if(boxTimer === dropSpeed) {
        const newX = Math.floor(Math.random()*650)
        arrayBoxes.push(new Box(newX, 0))
    } else if (boxTimer > dropSpeed) {
        boxTimer = 0;
    }
    boxTimer++

    // console.log('generate box', arrayBoxes)
    // console.log('making a box', new Box(newX, 0))
    // console.log('new math', newX)
}

// the main character
class Character {
    constructor(alive) {
        this.x = 0,
        this.y = 550,
        this.width = 50,
        this.height = 50,
        this.alive = alive,
        this.color = 'aquamarine',
        // this.jumpCounter = 0;
        // this.isHolding = false,
        // this.escaped = false,
        this.speed = 15,
        this.jumpHeight = 12,
        this.shouldJump = false,
        this.direction = {
            // up: false,
            // down: false,
            left: false,
            right: false,
        },
    

        // A jump that should work?
    // jump() {
    //     if(this.shouldJump) {
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
    //     }

        // vertical movement
        // this.setJump = function (key) {
        //     console.log('the pressed key:', key)
        //     if (key == 'space') { this.direction.up = true}
        // },

        // this.setJump = function (key) {
        //     console.log('the pressed key:', key)
        //     if (key == 'space') { this.direction.up = false}
        // }

        // horizontal movement
        this.setDirection = (key) => {
            // console.log('this is the key that was pressed', key)
            if (key.toLowerCase() === 'space') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            // if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        },

        this.unsetDirection = (key) => {
            // console.log('this is the key that was released', key)
            if (key.toLowerCase() === 'space') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            // if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },

        this.moveCharacter = () => {
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
            // if (this.direction.down) {
            //     this.y += this.speed
            //     if (this.y + this.height >= game.height) {
            //         this.y = game.height - this.height
            //     }
            // }
            if (this.direction.right) {
                this.x += this.speed
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        },
        this.render = () => {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}


const character = new Character(true)

function animate () {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Canvas Logic
    drawBackground();
    // Foreground
    // character.draw();
    
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
//             // character.jumpCounter = 0;
//             character.shouldJump = true;
//         }
//     }
// })

document.addEventListener('keydown', (e) =>{
    character.setDirection(e.key)
})

document.addEventListener('keyup', (e) =>{
    if(['space', 'a', 'd'].includes(e.key)) {
        character.unsetDirection(e.key)
    }
})

const portalMet = (thing) => {
    if (character.x < thing.x + thing.width &&
        character.x + character.width > thing.x &&
        character.y < thing.y + thing.height &&
        character.y + character.height > thing.y) {
            gameWon()
        }
}

const detectHit = (thing) => {
    // when the box is falling, the box can kill the character
    if (character.x < thing.x + thing.width &&
        character.x + character.width > thing.x &&
        character.y < thing.y + thing.height &&
        character.y + character.height > thing.y) {
        // Collision detected!
        character.alive === false;
        stopGameLoop()
    } else {
        // No collision
        character.alive === true;
    }
}

// starts the action!
const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)

    // door reached or not loop goes here
    if (portal.isReached === false) {
        portal.draw()
        platformOne.draw()
        platformTwo.draw()
        platformThree.draw()
        platformFour.draw()
        platformFive.draw()
        platformSix.draw()
    } else {
        // colorful magic show
    }
    if (character.alive === true) {
        // music
        generateBox()
        // console.log(arrayBoxes)
        // box stacking loop goes here
        arrayBoxes.forEach((box) => {
            // box falling loop goes here
            box.fall()
            // console.log(box)
            box.draw()
            // check for collisions here
            if(arrayBoxes.falling === false) {
                detectHit(box)
            } 
        })
        // check for falling, if not, stop
    }
    
    // movement.textContent = character.x + ", " + character.y
    character.moveCharacter()
    character.render()
    // console.log('character movement', character.moveCharacter)
    // box.render()
}

const gameInterval = setInterval(gameLoop, 60)

const stopGameLoop = () => {clearInterval(gameInterval)}

// Start the gameLoop here with this button
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', function () {
    gameInterval
})