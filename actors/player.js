class Player extends Actor {

    constructor(options) {
        super(options);
        this.screen = options.screen;
        this.height = 45;
        this.width = 35;
        this.grounded = false;
        this.hp = 4;
        this.ammo = 4;
        this.grounded = false;
        this.immune = false;
        this.flash = false;
        this.won = false;
        this.direction = "Right";
        this.sprites = {
            fallingRight: new Sprite(this, 'https://66.media.tumblr.com/b6b429d9c2d877fdfc8221fcdd686c09/tumblr_pqj353VgWs1wejsx8o1_75sq.png'),
            fallingLeft: new Sprite(this, 'https://66.media.tumblr.com/0362d0dc32e12fa7e56b2cf5dc1d9be2/tumblr_pqj28zRBRl1wejsx8o1_75sq.png'),
            standingRight: new Sprite(this, 'https://66.media.tumblr.com/13c8c0719a6cfdfd9405812b5b8822fb/tumblr_pqj20kWT051wejsx8o1_75sq.png'),
            standingLeft: new Sprite(this, 'https://66.media.tumblr.com/3e37b1f521b2b364cca6841b178e79db/tumblr_pqj20f9lkB1wejsx8o1_75sq.png'),
            landedRight: new Sprite(this, 'https://66.media.tumblr.com/310c5398b97df520f4020ded78fb0b06/tumblr_pqj2b4nM9B1wejsx8o1_500.png', 8, 10),
            landedLeft: new Sprite(this, 'https://66.media.tumblr.com/1b59bef9f3f0fd2043b41334aef2a474/tumblr_pqj2axfmhZ1wejsx8o1_500.png', 8 , 10),
            walkingRight: new Sprite(this, 'https://66.media.tumblr.com/294d62f0805be32322e2dd8e72140334/tumblr_pqj2ecsc221wejsx8o1_75sq.png', 2, 10),
            walkingLeft: new Sprite(this, 'https://66.media.tumblr.com/a20505bafaf5608968f94a9e54bd0122/tumblr_pqj2eh0nxs1wejsx8o1_75sq.png', 2, 10),
            explodingRight: new Sprite(this, 'assets/player-explode.png', 7, 10),
            explodingLeft: new Sprite(this, 'assets/player-explode.png', 7, 10),
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

    die() {
        this.updateSprite("exploding");
        setTimeout( () => this.drawFunction = () => {}, 1200 );
    }

    unground() {
        this.grounded = false;
        this.updateSprite('falling');
    }

    ground() {
        this.grounded = true;
        if (this.getVx() !== 0) {
            this.updateSprite('walking');
        } else {
            this.updateSprite('standing');
        }
        
    }

    shoot() {
        this.ammo -= 1;
    }

    reload() {
        this.ammo = 4;
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
                    this.reload();
                    this.screen.handleLand();
                    this.y-= (yBoundUp - otherYBoundDown) / 2;
                }
            }
        }

        if (otherActor instanceof Obstacle) {

            if ( (xBoundUp > otherXBoundDown && otherXBoundDown - xBoundDown > this.width / 2) || (xBoundDown < otherXBoundUp && xBoundUp - otherXBoundUp > this.width / 2) ) {
                if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
                    this.x -= (xBoundUp - otherXBoundDown) / 2;
                } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                    this.x += (otherXBoundUp - xBoundDown) / 2
                }
            } else {
                if (yBoundDown <= otherYBoundUp && yBoundUp > otherYBoundUp) {
                    this.screen.setGravity(0);
                    this.y += (otherYBoundUp - yBoundDown) / 2;
                }
    
                if (yBoundUp >= otherYBoundDown && yBoundDown < otherYBoundDown) {
                    this.ground();
                    this.reload();
                    this.screen.handleLand();
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
                otherActor.remove();
                this.grounded = false;
            }
        }
    }
}