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
ctx.width=game.width
ctx.height=game.height
// ctx.lineWidth=5

//SFX
// let scoreSFX = new Audio("");
// let gameOverSFX = new Audio("")
// let jumpSFX = new Audio("")

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

// Box creation. There will be multiple boxes spanning from above the character.
const Box = class { //consider making this a class more easily making boxes
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
            console.log(this.height)

            },    
        this.fall = () => {
            this.x = this.x+this.vx,
            this.y = this.y+this.vy,
            this.draw()
            
            }
        }
    }

const AndrewsBox = new Box(50, 300, 'blue');
console.log('this is the box object', AndrewsBox);
console.log('this is the game', game);
AndrewsBox.draw()
game.addEventListener('mousemove', function(event){
    AndrewsBox.draw(ctx)
})
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
    constructor(x, y, size, color, alive) {
        this.x = x,
        this.y = y,
        this.size = size,
        this.color = color,
        this.alive = alive,
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
    }

        jump() {
            if(this.shouldJump) {
                this.jumpCounter++
                if(this.jumpCounter < 15) {
                    // jump up
                    this.y -= this.jumpHeight;
                } else if(this.jumpCounter > 14 && this.jumpCounter < 19) {
                    this.y += 0;
                } else if(this.jumpCounter < 33) {
                    // fall back down
                    this.y += this.jumpHeight;
                }
                // End the cycle
                if (this.jumpCounter >= 32) {
                    this.shouldJump = false;
                }
            }
        }

        draw() {
            this.jump();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
            // this.size is NOT A TYPO
        }

        // horizontal movement
        // this.setDirection = function (key) {
        //     // console.log('this is the key that was pressed', key)
        //     // if (key.toLowerCase() == 'w') { this.direction.up = true }
        //     if (key.toLowerCase() == 'a') { this.direction.left = true }
        //     // if (key.toLowerCase() == 's') { this.direction.down = true }
        //     if (key.toLowerCase() == 'd') { this.direction.right = true }
        // },

        // this.unsetDirection = function (key) {
        //     // console.log('this is the key that was released', key)
        //     // if (key.toLowerCase() == 'w') { this.direction.up = false }
        //     if (key.toLowerCase() == 'a') { this.direction.left = false }
        //     // if (key.toLowerCase() == 's') { this.direction.down = false }
        //     if (key.toLowerCase() == 'd') { this.direction.right = false }
        // },

        // this.moveCharacter = function () {
        //     if (this.direction.up) {
        //         this.y -= this.speed
        //         if (this.y <= 0) {
        //             this.y = 0
        //         }
        //     }
        //     if (this.direction.left) {
        //         this.x -= this.speed
        //         if (this.x <= 0) {
        //             this.x = 0
        //         }
        //     }
        //     if (this.direction.down) {
        //         this.y += this.speed
        //         if (this.y + this.height >= game.height) {
        //             this.y = game.height - this.height
        //         }
        //     }
        //     if (this.direction.right) {
        //         this.x += this.speed
        //         if (this.x + this.width >= game.width) {
        //             this.x = game.width - this.width
        //         }
        //     }
        // },
        // this.render = function () {
        //     ctx.fillStyle = this.color
        //     ctx.fillRect(this.x, this.y, this.width, this.height)
        // }
    }

    // let character = new Character(150, 350, 50, "white")

    function animate () {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Canvas Logic
        // drawBackground();
        // Foreground
        // character.draw();
    }

    // animate();

    // Event Listeners
    addEventListener("keydown", e =>{
        if(e.code === "Space") {
            if(!character.shouldJump) {
                // jumpSFX.play();
                character.jumpCounter = 0;
                character.shouldJump = true;
            }
        }
    })


// random box placement
// const randomBoxes = (max) => {
//     return (Math.floor.random() * max)
// }

const character = new Character(10, 450, 'white', 50, 50, true)
// const box = new Box(10, 10, 'pink', 170, 170)
// const boxTwo = new Box(randomBoxes(game.width), 50, 'red', 64, 96, true)

document.addEventListener('keydown', (e) =>{
    character.setDirection(e.key)
})

document.addEventListener('keyup', (e) =>{
    if(['w', 'a', 's', 'd'].includes(e.key)) {
        character.unsetDirection(e.key)
    }
})

// const detectHit = (boxFall) => {
//     // when the box is falling, the box can kill the character
//     if(chacharacter.x + chacharacter.y === boxFall.x + boxFall.y) {
//         chacharacter.alive = false
//     }
// }

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)

    if (AndrewsBox.falling === true) {
        AndrewsBox.fall()
    }

    if (AndrewsBox.y + AndrewsBox.vy > game.height ||
            AndrewsBox.y + AndrewsBox.vy < 0) {
            AndrewsBox.vy =- AndrewsBox.vy;
                }
    if (AndrewsBox.x + AndrewsBox.xy > game.width ||
            AndrewsBox.x + AndrewsBox.xy < 0) {
            AndrewsBox.vy =-AndrewsBox.xy;
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
    // character.render()
    // character.movecharacter()
    // box.render()
}

const gameInterval = setInterval(gameLoop, 60)

const stopGameLoop = () => {clearInterval(gameInterval)}

document.addEventListener('DOMContentLoaded', function () {
    gameInterval
})