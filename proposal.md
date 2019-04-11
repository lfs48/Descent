# Descent

## Overview

Descent is a fast-paced, addictive game in which the player takes control of a person falling down a hole. The goal of the game is to rack up a high score by falling for as long as possible without hitting obstacles or enemies.

This game is inspired by [Downwell](https://en.wikipedia.org/wiki/Downwell_(video_game)).

## Functionality/MVPs

* Player character begins the game in a falling state and accelerates over time.
* The player gains score during airtime, with a combo multiplier based on how long the current fall has lasted.
* The player can use the arrow keys to move and right, and press Z to shoot projectiles.
* Obstacles will appear at the bottom of the screen. Landing on an obstacles resets fall speed and combo meter.
* Enemies will appear. They can be destroyed with projectiles. If an enemy hits the player, fall speed and combo meter are reduced.
* The game ends after a set amount of fall distance, or if the player is hit by too many enemies.

## Wireframes

![](https://66.media.tumblr.com/cdc6c37b47809dea880b53e6a15113a6/tumblr_pprxloHjXO1wejsx8o1_540.png)

## Technologies Used

* Vanilla Javascript for game logic.
* HTML5 Canvas for rendering visuals.
* Webpack for bundling.

## Implementation Timeline

### Day 1:

* Render basic elements of the game (score card, stage boundary, player character)
* Implement movement controls and falling physics

### Day 2: 

* Implement scoring system.
* Generate and render obstacles.
* Implement player character interaction with obstacles.

### Day 3:

* Generate and render enemies.
* Implement player character interaction with enemies.