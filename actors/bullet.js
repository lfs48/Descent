class Bullet extends RectActor {

    constructor(x, y, vx, vy, screen) {
        super(x, y, vx, vy);
        this.screen = screen;
        this.width = 28;
        this.height = 4;
        this.sprites = {
            spawning: new Sprite(this, "./assets/bullet-spawning.png", 10, 1),
            default: new Sprite(this, "./assets/bullet.png")
        }
        this.activeSprite = this.sprites.spawning;
    }

    drawFunction(ctx) {
        this.activeSprite.draw(ctx);
        this.activeSprite.update();
        this.height += 4;
        if (this.height >= 46) {
            this.activeSprite = this.sprites.default
        }
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