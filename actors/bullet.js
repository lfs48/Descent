class Bullet extends Actor {

    constructor(options) {
        super(options);
        this.screen = options.screen;
        this.width = 28;
        this.height = 44;
        this.sprites = {
            default: new Sprite(this, "https://66.media.tumblr.com/6e2c4e9b57331b137fa70aa52d418bce/tumblr_pqj1zs6buB1wejsx8o1_75sq.png")
        }
        this.activeSprite = this.sprites.default;
    }

    handleCollision(otherActor) {
        if (!(otherActor instanceof Player)) {
            this.remove();
        }
        const { xBoundUp, xBoundDown, yBoundUp, yBoundDown } = this.collisionBox();
        const otherCollision = otherActor.collisionBox();
        const otherXBoundUp = otherCollision.xBoundUp;
        const otherXBoundDown = otherCollision.xBoundDown;
        const otherYBoundUp = otherCollision.yBoundUp;
        const otherYBoundDown = otherCollision.yBoundDown;

        if (otherActor instanceof Enemy || otherActor instanceof Bouncy || otherActor instanceof Block) {
            otherActor.remove();
            this.screen.gainScore(1);
        }
    }
}