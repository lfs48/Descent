
# Descent

[*A furiously fast-paced freefall.*](www.lschraier/Descent)

![](https://66.media.tumblr.com/3f3adbd5866f0f327cecf9bbd4e0dd83/tumblr_pqc8pa5A8l1wejsx8o1_1280.gif)

## Summary

Descent is a retro-style browser game, built from the ground up with a custom engine in pure Javascript. Players take control of a character falling down a well, dodging obstacles and enemies as they rack up a high score.

## Object Oriented Design

The engine I designed for this game sticks closely to the OOP principles of encapsulation and inheritence. All ingame entities, such the player, the ghostly enemies, and even the walls, inherit from an `Actor` superclass. This class defines common behavior such as movement, collision detection, and rendering onto the canvas.

![](https://66.media.tumblr.com/48862073f260011465c01d8ecc1c3d24/tumblr_pqcc4f7qaZ1wejsx8o1_500.png)

Subclasses of actor such as `Bullet` define more specific properties that aren't shared, such as the particular dimensions and spritesheet of that actor. Since the constructor accepts an options hash, different actor subclasses can be passed the specific constructor arguments they need without conflict.

![](https://66.media.tumblr.com/1e79fd55579e64d603e67a5f745e8441/tumblr_pqcc4f7qaZ1wejsx8o2_500.png)

## Random Spawn Patterns

Enemies and obstacles spawn in random patterns to ensure that the player has a new experience each time they play. However, true randomness leads to poor play experience, so I opted to implement a much more controlled kind of randomness by creating `Factory` classes.

For example, `EnemyFactory` generate arrays of `Enemy` instances to be added to the play area. The factory has a list of patterns it uses to seed the initial `x` and `y` position of enemies it generates. Each 'pattern' is an object whose keys, `x` and `y`, point to functions that will randomly generate a number within a certain range.

![](https://66.media.tumblr.com/567ecb0e12b7f2c717c974b2b92eb028/tumblr_pqccr4kNsP1wejsx8o1_1280.png)

![](https://66.media.tumblr.com/60f75b9d8490c0c12100f2dcfdafae53/tumblr_pqcctrw4ca1wejsx8o1_1280.png)
