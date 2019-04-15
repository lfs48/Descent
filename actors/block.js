class Block extends Actor {

    constructor(options) {
        super(options);
        this.width = 30;
        this.height = 30;
        this.blockGroup = options.blockGroup;
        this.becomeLeftBlock = this.becomeLeftBlock.bind(this);
        this.becomeRightBlock = this.becomeRightBlock.bind(this);
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
                otherActor.remove = true;
                this.blockGroup.removeBlock(this);
            }
        }

    }

    becomeLeftBlock() {
        this.leftBlock = true;
    }

    becomeRightBlock() {
        this.rightBlock = true;
    }

    drawFunction(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}