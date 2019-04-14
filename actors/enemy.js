class Enemy extends Actor {

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

    updatePos() {
        if (!this.randomPath) {
            this.randomPath = true;
            setTimeout(this.generateRandomPath, 500);
        }
        this.x += this.getVx();
        this.y += this.getVy();
    }
}