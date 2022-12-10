# Escape Game

![A reference image](/gamePlanning/stack-game-reference%20image.png)

The world is made of black and white. A black background with white lines. There is a door that is hard to reach and there are boxes falling from above. The player must jump from platform to platform while avoiding falling boxes - impact can be deadly. Once the player reaches the doorway, they pass through to a new world full of color.

## Technologies used:
*   HTML5
*   CSS
*   JavaScript

## User Story:
 As a player, I want the ability to... \
    ... start the game \
    ... move left and right \
    ... jump \
    ... avoid dangerous boxes \
    ... climb boxes \
    ... reach mysterious, but promising doorway \
    ... win the game \

## Wire frames:
![An intro image](/gamePlanning//stack-game-wireframe-intro.png) \
![An image of death](/gamePlanning/stack-game-wireframe-loss.png) \
![An image of winning](/gamePlanning/stack-game-wireframe-win.png) \
![An overview](/gamePlanning/stack-game-wireframe.png) \

## ERDs:
```Player: {
X: (x location on the canvas)
Y: (y location on the canvas)
Height: (should be about the same as the boxes)
Width: (should be smaller than the boxes)
Color: white (red if dead, gray when game is won)
Alive: (a boolean that determines if game is in progress)
Render: (a method that displays the player on the screen)
}
Boxes: {
X: (x changeable locations for boxes to fall from) 
Y: (y changeable locations for boxes to fall from)
Height: (should be about the same as the player)
Width: (same as height)
Color: black
Alive: (a boolean that determines if game is in progress)
Render: (a method that displays the boxes are on the screen)
}
function – gameloop – holds the entire logic that runs the game
function – detectCrash – used to see if a box has fallen on the player
function – movementHandler – used to move the player around, should be attached to arrow or wasd keys, and spacebar
Function – detectTouch – used to help the player move boxes around
```
