class Player extends CircleActor {

    handleCollision(otherActor) {
        const { xBoundUp, xBoundDown, yBoundUp, yBoundDown } = this.collisionBox();
        const otherCollision = otherActor.collisionBox();
        const otherXBoundUp = otherCollision.xBoundUp;
        const otherXBoundDown = otherCollision.xBoundDown;
        const otherYBoundUp = otherCollision.yBoundUp;
        const otherYBoundDown = otherCollision.yBoundDown;

        if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
            this.vx = -10;
        } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
            this.vx = 10;
        }
    }
}