class Bullet extends Actor {

    constructor(options) {
        super(options);
        this.screen = options.screen;
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

        if (otherActor instanceof Enemy || otherActor instanceof Bouncy) {
            otherActor.remove = true;
            this.screen.gainScore(1);
        }
    }
}