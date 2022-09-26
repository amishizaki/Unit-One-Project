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
let globalGameStopId

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
ctx.width=game.width
ctx.height=game.height
ctx.lineWidth=.5

//SFX
// let scoreSFX = new Audio("");
// let gameOverSFX = new Audio("")
// let jumpSFX = new Audio("")

// Portal creation - fixed object - interactable
class Portal {
    constructor(){
        this.x = this.x,
        this.y = this.y,
        this.width = this.width,
        this.height = this.height,
        this.color = 'white',
        this.isReached = false,
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
        this.color = 'black',
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
        this.color = 'black',
        this.width = 75,
        this.height = 75,
        this.falling = falling,
        this.isHeld = false,
        this.isStacked = false,
        this.draw = () => {
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
    // how many boxes at a time
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
        this.vx = 5,
        this.vy = 10,
        this.gravity = 0.4,
        this.width = 50,
        this.height = 50,
        this.alive = alive,
        this.color = 'black',
        // this.jumpCounter = 0;
        // this.isHolding = false,
        // this.escaped = false,
        this.speed = 15,
        this.jumpHeight = 10,
        this.jumpTimer = 3000,
        this.jumpCount = 0,
        this.shouldJump = false,
        this.direction = {
            // up: false,
            // down: false,
            left: false,
            right: false,
        },

        // character movement
        this.setDirection = (key) => {

            if (key == ' ') { this.shouldJump = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            // if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
            // console.log('this is the key that was pressed', key)
        },

        this.unsetDirection = (key) => {
            // console.log('this is the key that was released', key)
            if (key == ' ') { this.shouldJump = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            // if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },

        this.moveCharacter = () => {

            if (this.shouldJump) {
                // console.log('jump check', this.shouldJump)
                // console.log('space hit')
                this.jumpCount++
                if(this.jumpCount < 15) {
                    // jump up
                    this.y -= this.jumpHeight;
                } else if(this.jumpCount > 14 && this.jumpCount < 19) {
                    this.y += 0;
                } else if(this.jumpCount < 33) {
                    // fall back down
                    this.y += this.jumpHeight;
                }
                // end the cycle
                if (this.jumpCount >= 32) {
                    this.shouldJump = false
                    this.jumpCount = 0
                }
                // console.log('this should jump', this.shouldJump)
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.x = 0
                }
            }

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

// function animate () {
//     requestAnimationFrame(animate)
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

document.addEventListener('keydown', (e) => {
    character.setDirection(e.key)
})

document.addEventListener('keyup', (e) => {
    if(['a', 'd'].includes(e.key)) {
        character.unsetDirection(e.key)
    }
})

const gameWon = () => {
    
    canvas.style.background = 'linear-gradient(#B72C3C, #FFF4BC, #FED571, #FF8C4C, #AC748F, #45385B)'

}

// detect portal
const detectPortal = (thing) => {
    if (character.x < thing.x + thing.width &&
        character.x + character.width > thing.x &&
        character.y < thing.y + thing.height &&
        character.y + character.height > thing.y) {
            console.log('portal met')
            gameWon()
            stopGameLoop()
        }
}

// game lost
const youDied = () => {
    canvas.style.background = 'linear-gradient(black, red)'
}

// box detection collision
const detectHit = (thing) => {
    // when the box is falling, the box can kill the character
    if (character.x < thing.x + thing.width &&
        character.x + character.width > thing.x &&
        character.y < thing.y + thing.height &&
        character.y + character.height > thing.y) {
        // Collision detected!
        character.alive = false;
        // console.log('character status', character.alive)
        stopGameLoop()
        youDied()
    } else {
        // No collision
        character.alive = true;
    }
}

// platform detection collision
// collision detection for all sides of platform
const detectPlatform = (thing) => {
    if (character.x < thing.x + thing.width &&
        character.x + character.width > thing.x &&
        character.y < thing.y + thing.height &&
        character.y + character.height > thing.y) {
            // below, y is currently set to zero because it was better than the other options.
            character.y = 0
            // console.log("detectPlatform")
        }
}

// starts the action!
const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)

    // door reached or not loop goes here
    
    if (character.alive === true) {
        // console.log(character)
        // music
        generateBox()
        detectPlatform(platformOne)
        portal.draw()
        platformOne.draw()
        platformTwo.draw()
        platformThree.draw()
        platformFour.draw()
        platformFive.draw()
        platformSix.draw()
        // detectRight(platformOne)
        // console.log(arrayBoxes)
        // box stacking loop goes here
        arrayBoxes.forEach((box) => {
            // box falling loop goes here
            box.fall()
            // console.log(box)
            box.draw()
            // check for collisions here
            detectHit(box)
        })
        detectPortal(portal)
        
        // check for falling, if not, stop
    }
    // movement.textContent = character.x + ", " + character.y
    character.moveCharacter()
    character.render()
    // console.log('character movement', character.moveCharacter)
}

const stopGameLoop = () => {clearInterval(globalGameStopId)}

// Start the gameLoop here with this button
const gameStart = () => {
    const gameInterval = setInterval(gameLoop, 60)
    globalGameStopId = gameInterval
    
    // gameInterval
}