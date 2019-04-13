class Player extends RectActor {

    constructor(x, y, vx, vy, screen) {
        super(x, y, vx, vy);
        this.screen = screen;
        this.height = 60;
        this.width = 60;
        this.grounded = false;
        this.hp = 4;
        this.immune = false;
        this.flash = false;
        this.won = false;

        this.sprite = new Image();
        this.sprite.src = "assets/player-spritesheet.gif";
        this.frameIndex = 0,
        this.tickCount = 0,
        this.ticksPerFrame = 15;
        this.numFrames = 4;

    }

    update() {
        this.tickCount += 1;	
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numFrames - 1) {
                this.frameIndex += 1; 
            } else {
                this.frameIndex = 0;
            }
        }
    }

    drawFunction(ctx) {
        if (!this.flash) {
            ctx.drawImage(
                this.sprite, 
                (this.frameIndex * this.width), 
                0,
                this.width,
                this.height,
                this.x,
                this.y,
                this.height,
                this.width);
        }
        if (this.immune) {
            this.flash = !this.flash;
        } else {
            this.flash = false;
        }
        this.update();
    }

    unground() {
        this.grounded = false;
    }

    jump() {
        this.y -= 2;
        this.vy = -1;
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
                this.vx = -10;
            } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                this.vx = 10;
            }
        }
        if (otherActor instanceof Obstacle) {
            if (yBoundUp >= otherYBoundDown && yBoundDown < otherYBoundDown) {
                this.grounded = true;
            }
        }
        if (otherActor instanceof Enemy) {
            this.takeDamage();
            this.immune = true;
            setTimeout(() => this.immune = false, 3000);
        }

        if (otherActor instanceof Floor) {
            this.won = true;
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