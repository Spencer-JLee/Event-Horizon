# Survival Game

## TODO
* Major Bugs:
    * Collision detection for enemies when colliding with other enemies

* Minor Bugs:

* Future Features:
    * Add ammo counter
    * Add time survived to score
    * Add new types of enemies
    * Add pause
    * Try to make enemies spawn out of bounds
        * Then they cannot move out of bounds once inside screen
    * Create models for rendering player, enemies, board, projectiles, etc.
    * Add styling to make game look presentable

## Background
This game is a 2d top-down shoot'em up game, in which the goal is to survive as long as possible until you are defeated. To break this game down,
the game is played on a 2d plane. The player character can move in any 2d direction and it can shoot based upon at the location of the cursor.
Enemies will spawn periodically and over time, they will become more dangerous and more of them will appear.
The player will have a health-bar and the game will end when the player's health is 0.

The player character will have multiple weapons and each weapon will have a specific ammo associated with it. 
If a player uses a certain weapon too much, the ammo count will reach 0 and the player cannot use it anymore.
There will be ways of replenishing ammo and health in this game. 

## Functionality & MVPs
With this project, users will be able to do the following actions:

* Start and pause the game
* Move their character using specific keybinds
* Shoot in the direction of their cursor
* Switch between weapons

In addition, this project will have:

* Instructions that describe how to play the game
* A production ReadMe

## Wireframes

![wireframe](wireframe.png)

* Nav links will point the project's GitHub repo, my LinkedIn and AngelList.
* Instructions will on the side for the player to understand how to operate the game
* The game will be mostly operated on keypresses and mouse clicks, thus not requiring many buttons
* (Bonus) Buttons will be added on the button so that before the game starts, the player can modify the difficulty.

## Technologies, Libraries, APIs
This project will be implemented with the following technologies:

* The Canvas API will be used to render the game and its current state
* Vanilla DOM will be used to create actions for specific keybinds
* npm to manage project dependencies
* (Bonus) EaselJS to help with adding models and detail to the game

## Implementation Timeline

### Friday/Weekend
* Setting up the project, ensuring that the project directory and structure is structured properly. 
* Verify that a canvas can be rendered on the browser.
* Testing and researching the Canvas API in order to understand which methods will be important for the project
* Render the game screen onto the canvas.
* Creating classes for the Player, each of the various enemies, and weapons.
* If time permits, start implementing the basic actions of moving the Player character and shooting
### Monday
* Continue working on the previously mentioned basic actions, if not completed yet
* Start creating basic enemies on the board and handle the game's logic of generating enemies
* Ensure that the canvas renders properly the board, player character, and enemies.
### Tuesday
* Finish any of the previous day's work if not completed
* Focus on adding more weapons and enemies to the player character
* Add controls based upon the new features
* Add health and ammo counters to the enemies
* Determine how/if health and ammo are replenished
### Wednesday
* Finish any of the previous day's work if not completed
* Focus on styling and brushing up the game in order to ensure that it looks presentable
* Add nav links
* Work on bonus features if time permits
### Thursday
* Deploy to GitHub pages
* Rewrite this proposal into a production Readme

## Bonus Features
* Adding waves/rounds mechanics in which a player has to finish a wave before proceeding to the next round
* Add difficulty modifiers to the game
* This list is not complete and this game can built in different directions.
