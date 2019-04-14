class Bullet extends Actor {

    constructor(x, y, vx, vy, screen) {
        super(x, y, vx, vy);
        this.screen = screen;
        this.width = 28;
        this.height = 44;
        this.sprites = {
            default: new Sprite(this, "./assets/bullet.png")
        }
        this.activeSprite = this.sprites.default;
    }

    handleCollision(otherActor) {
        if (!(otherActor instanceof Player)) {
            this.remove = true;
        }
        const { xBoundUp, xBoundDown, yBoundUp, yBoundDown } = this.collisionBox();
        const otherCollision = otherActor.collisionBox();
        const otherXBoundUp = otherCollision.xBoundUp;
        const otherXBoundDown = otherCollision.xBoundDown;
        const otherYBoundUp = otherCollision.yBoundUp;
        const otherYBoundDown = otherCollision.yBoundDown;

        if (yBoundUp >= otherYBoundDown && yBoundDown < otherYBoundDown) {
            if (otherActor instanceof Enemy || otherActor instanceof Bouncy) {
                otherActor.remove = true;
                this.screen.gainScore(1);
            }
        }
    }
}