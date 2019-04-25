class Bouncy extends Actor {
    constructor(options) {
        super(options);
        this.width = 79;
        this.height = 49;
        this.vx = Math.random() > 0.5 ? 2 : -2;
        this.direction = "Right";
        this.randomPath = false;
        this.generateRandomPath = this.generateRandomPath.bind(this);
        this.activeSprite = new Sprite(this, 'https://66.media.tumblr.com/b313320fe3f699baabed291a7cd75a06/tumblr_pqixm4nC8Z1wejsx8o1_500.png', 6);
    }

    drawFunction(ctx) {
        this.activeSprite.draw(ctx);
        this.activeSprite.update();
    }

    handleRemove() {
        this.height = 45;
        this.width = 35;
        this.vx = 0;
        this.activeSprite = new Sprite(this, 'assets/player-explode.png', 7, 10);
    }

    handleCollision(otherActor) {
        const { xBoundUp, xBoundDown, yBoundUp, yBoundDown } = this.collisionBox();
        const otherCollision = otherActor.collisionBox();
        const otherXBoundUp = otherCollision.xBoundUp;
        const otherXBoundDown = otherCollision.xBoundDown;
        const otherYBoundUp = otherCollision.yBoundUp;
        const otherYBoundDown = otherCollision.yBoundDown;

        if (otherActor instanceof Bullet) {
            this.remove();
            otherActor.remove();
        }
        if (otherActor instanceof Player) {
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

}