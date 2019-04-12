class Bouncy extends CircleActor {
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.radius = 50;
        this.randomPath = false;
        this.generateRandomPath = this.generateRandomPath.bind(this);
    }

    drawFunction(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    handleCollision(otherActor) {
        const { xBoundUp, xBoundDown, yBoundUp, yBoundDown } = this.collisionBox();
        const otherCollision = otherActor.collisionBox();
        const otherXBoundUp = otherCollision.xBoundUp;
        const otherXBoundDown = otherCollision.xBoundDown;
        const otherYBoundUp = otherCollision.yBoundUp;
        const otherYBoundDown = otherCollision.yBoundDown;

        if (otherActor instanceof Bullet || otherActor instanceof Player) {
            if (yBoundDown <= otherYBoundUp && yBoundUp > otherYBoundUp) {
                this.remove = true;
            }
        }

        if (otherActor instanceof Wall) {
            if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
                this.vx = -5;
            } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                this.vx = 5;
            }
        }
    }

    generateRandomPath() {
        this.randomPath = false;
        this.vx = Math.random() > 0.5 ? 2 : -2;
    }

    updatePos() {
        if (!this.randomPath) {
            this.randomPath = true;
            setTimeout(this.generateRandomPath, 500);
        }
        this.x += this.getVx();
        this.y += this.getVy();
    }
}