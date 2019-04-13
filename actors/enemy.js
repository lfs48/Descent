class Enemy extends RectActor {
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.width = 80;
        this.height = 70;
        this.randomPath = false;
        this.generateRandomPath = this.generateRandomPath.bind(this);

        this.direction = vx > 0 ? 'Right' : 'Left';
        this.sprites = {
            defaultRight: new Sprite(this, 'assets/big-ghost-right.png', 6),
            defaultLeft: new Sprite(this, 'assets/big-ghost-left.png', 6)
        };
        this.activeSprite = this.sprites[`default${this.direction}`];
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

        if (otherActor instanceof Bullet) {
            if (yBoundDown <= otherYBoundUp && yBoundUp > otherYBoundUp) {
                this.remove = true;
            }
        }

        if (otherActor instanceof Wall) {
            if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
                this.vx = -3;
                this.direction = 'Left';
                this.updateSprite();
            } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                this.vx = 3;
                this.direction = 'Right';
                this.updateSprite();
            }
        }
    }

    generateRandomPath() {
        this.randomPath = false;
        this.vx = Math.random() > 0.5 ? 3 : -3;
        this.direction = this.vx > 0 ? 'Right' : 'Left';
        this.updateSprite();
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