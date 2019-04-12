class Player extends CircleActor {

    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.radius = 15;
        this.grounded = false;
        this.hp = 4;
        this.immune = false;
        this.flash = false;
        this.won = false;
    }

    drawFunction(ctx) {
        if (!this.flash) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
        }
        if (this.immune) {
            this.flash = !this.flash;
        } else {
            this.flash = false;
        }
        
    }

    unground() {
        this.grounded = false;
    }

    jump() {
        this.y -= 2;
    }

    center() {
        if (this.y < 360) {
            this.y = Math.min(360, this.y + 0.5);
        } else if (this.y > 360) {
            this.y = Math.max(360, this.y - 0.5);
        }
    }

    takeDamage() {
        if (!this.immune) {
            this.hp -= 1;
            console.log("You took damage!")
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
            setTimeout(() => this.immune = false, 1000);
        }

        if (otherActor instanceof Floor) {
            this.won = true;
        }
    }
}