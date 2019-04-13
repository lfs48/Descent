class Bullet extends CircleActor {

    constructor(x, y, vx, vy, screen) {
        super(x, y, vx, vy);
        this.screen = screen;
        this.radius = 7;
    }

    drawFunction(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    handleCollision(otherActor) {
        this.remove = true;
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