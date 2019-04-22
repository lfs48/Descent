class Bouncy extends Actor {
    constructor(options) {
        super(options);
        this.width = 79;
        this.height = 49;
        this.vx = Math.random() > 0.5 ? 2 : -2;
        this.direction = "Right";
        this.randomPath = false;
        this.generateRandomPath = this.generateRandomPath.bind(this);
        this.activeSprite = new Sprite(this, 'assets/bouncy-right.png', 6);
    }

    drawFunction(ctx) {
        this.activeSprite.draw(ctx);
        this.activeSprite.update();
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
                this.remove();
            }
        }

        if (otherActor instanceof Wall) {
            if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
                this.vx = -2;
            } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                this.vx = 2;
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