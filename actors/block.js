class Block extends Actor {

    constructor(options) {
        super(options);
        this.width = 40;
        this.height = 40;
        this.blockGroup = options.blockGroup;
        this.becomeLeftBlock = this.becomeLeftBlock.bind(this);
        this.becomeRightBlock = this.becomeRightBlock.bind(this);
        this.activeSprite = new Sprite(this, "https://66.media.tumblr.com/564d5fd811e4a74357bc05a7c2901412/tumblr_pqn9d0aiQO1wejsx8o1_75sq.png");
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
            this.blockGroup.removeBlock(this);
        }

    }

    becomeLeftBlock() {
        this.leftBlock = true;
    }

    becomeRightBlock() {
        this.rightBlock = true;
    }
}