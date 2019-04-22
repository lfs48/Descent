class Enemy extends Actor {

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
        if (otherActor instanceof Wall) {
            if (xBoundUp >= otherXBoundDown && xBoundDown < otherXBoundDown) {
                this.vx = -this.vx;
                this.direction = 'Left';
                this.updateSprite();
            } else if (xBoundDown <= otherXBoundUp && xBoundUp > otherXBoundUp) {
                this.vx = -this.vx;
                this.direction = 'Right';
                this.updateSprite();
            }
        }
    }

    handleRemove() {
        this.height = 45;
        this.width = 35;
        this.vx = 0;
        this.activeSprite = new Sprite(this, 'assets/player-explode.png', 7, 10)
    }

}