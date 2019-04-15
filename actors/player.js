class Player extends Actor {

    constructor(options) {
        super(options);
        this.screen = options.screen;
        this.height = 45;
        this.width = 35;
        this.grounded = false;
        this.hp = 4;
        this.grounded = false;
        this.immune = false;
        this.flash = false;
        this.won = false;
        this.direction = "Right";
        this.sprites = {
            fallingRight: new Sprite(this, 'assets/player-falling-right.png'),
            fallingLeft: new Sprite(this, 'assets/player-falling-left.png'),
            standingRight: new Sprite(this, 'assets/player-standing-right.png'),
            standingLeft: new Sprite(this, 'assets/player-standing-left.png'),
            landedRight: new Sprite(this, 'assets/player-landed-right.png', 8, 10),
            landedLeft: new Sprite(this, 'assets/player-landed-left.png', 8 , 10)
        };
        this.activeSprite = this.sprites['fallingRight'];
    }

    drawFunction(ctx) {
        if (!this.flash) {
            this.activeSprite.draw(ctx);
        }
        if (this.immune) {
            this.flash = !this.flash;
        } else {
            this.flash = false;
        }
        this.activeSprite.update();
    }

    unground() {
        this.grounded = false;
        this.updateSprite('falling');
    }

    ground() {
        this.grounded = true;
        this.updateSprite('standing');
    }

    moveRight() {
        this.vx = 3;
        this.direction = "Right";
    }

    moveLeft() {
        this.vx = -3;
        this.direction = "Left";
    }

    jump() {
        this.y -= 2;
    }

    win() {
        this.width = 60;
        this.won = true;
        this.screen.submitScore();
        this.ground();
        this.updateSprite('landed');
        setTimeout(() => this.updateSprite('standing'), 1360);
    }

    center() {
        if (this.y < 360) {
            this.y = Math.min(360, this.y + 0.5);
        } else if (this.y > 360) {
            this.y = Math.max(360, this.y - 0.5);
        }

        if (this.vy < 0) {
            this.vy = Math.min(0, this.vy + 0.5);
        } else if (this.vy > 0) {
            this.vy = Math.max(0, this.vy - 0.5);
        }
    }

    takeDamage() {
        if (!this.immune) {
            this.hp -= 1;
            this.immune = true;
            setTimeout(() => this.immune = false, 3000);
        }
    }

    handleCollision(otherActor) {
        const { xBoundUp, xBoundDown, yBoundUp, yBoundDown } = this.collisionBox();
        const otherCollision = otherActor.collisionBox();
        const otherXBoundUp = otherCollision.xBoundUp;
        const otherXBoundDown = otherCollision.xBoundDown;
        const otherYBoundUp = otherCollision.yBoundUp;
        const otherYBoundDown = otherCollision.yBoundDown;

        if (otherActor instanceof Wall) {
            if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
                this.x -= (xBoundUp - otherXBoundDown) / 2;
            } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                this.x += (otherXBoundUp - xBoundDown) / 2
            }
        }

        if (otherActor instanceof Block) {
            if ( (xBoundUp > otherXBoundDown && otherXBoundDown - xBoundDown > this.width / 2) || (xBoundDown < otherXBoundUp && xBoundUp - otherXBoundUp > this.width / 2) ) {
                if (otherActor.rightBlock) {
                    if (xBoundDown < otherXBoundUp && xBoundUp - otherXBoundUp > this.width / 2) {
                        this.x += (otherXBoundUp - xBoundDown) / 2;
                    }
                }

                if (otherActor.leftBlock) {
                    if (xBoundUp > otherXBoundDown && otherXBoundDown - xBoundDown > this.width / 2) {
                        this.x -= (xBoundUp - otherXBoundDown) / 2;
                    }
                }
            } else {
                if (yBoundDown <= otherYBoundUp && yBoundUp > otherYBoundUp) {
                    this.y += (otherYBoundUp - yBoundDown) / 2;
                }

                if (yBoundUp >= otherYBoundDown && yBoundDown < otherYBoundDown) {
                    this.ground();
                    this.y-= (yBoundUp - otherYBoundDown) / 2;
                }
            }
        }

        if (otherActor instanceof Obstacle) {

            if ( (xBoundUp > otherXBoundDown && otherXBoundDown - xBoundDown > this.width / 2) || (xBoundDown < otherXBoundUp && xBoundUp - otherXBoundUp > this.width / 2) ) {
                if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
                    this.x -= (xBoundUp - otherXBoundDown) / 2;
                } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                    this.x += (otherXBoundUp - xBoundDown) / 2;
                }
            } else {
                if (yBoundDown <= otherYBoundUp && yBoundUp > otherYBoundUp) {
                    this.y += (otherYBoundUp - yBoundDown) / 2;
                }
    
                if (yBoundUp >= otherYBoundDown && yBoundDown < otherYBoundDown) {
                    this.ground();
                    this.y-= (yBoundUp - otherYBoundDown) / 2;
                }
            }
        }

        if (otherActor instanceof Enemy) {
            this.takeDamage();
        }

        if (otherActor instanceof Floor) {
            this.win();
        }

        if (otherActor instanceof Bouncy) {
            if (yBoundUp >= otherYBoundDown && yBoundDown < otherYBoundDown) {
                this.grounded = true;
                this.screen.handleBounce();
                otherActor.remove = true;
                this.grounded = false;
            }
        }
    }
}