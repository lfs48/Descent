class Actor {
    constructor(x, y, vx, vy, r, drawFunction) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.drawFunction = drawFunction.bind(this);
    }

    willCollide(otherActor) {
        const xBoundUp = this.x + this.vx + this.r;
        const xBoundDown = this.x + this.vx - this.r;
        const yBoundUp = this.y + this.vy + this.r;
        const yBoundDown = this.y + this.vy - this.r

        const otherXBoundUp = otherActor.x + otherActor.vx + otherActor.r;
        const otherXBoundDown = otherActor.x + otherActor.vx - otherActor.r;
        const otherYBoundUp = otherActor.y + otherActor.vy + otherActor.r;
        const otherYBoundDown = otherActor.y + otherActor.vy - otherActor.r;

        const overlapX = !(
            (xBoundUp >= otherXBoundUp && xBoundDown >= otherXBoundUp) ||
            (xBoundDown <= otherXBoundDown && xBoundUp <= otherXBoundDown)
        );

        const overlapY = !(
            (yBoundUp >= otherYBoundUp && yBoundDown >= otherYBoundUp) ||
            (yBoundDown <= otherYBoundDown && yBoundUp <= otherYBoundDown)
        );

        return (overlapX && overlapY);

    }

    updatePos() {
        this.x += this.vx;
        this.y += this.vy;
    }

    moveRight() {
        this.vx = 2;
    }

    moveLeft() {
        this.vx = -2;
    }

    accY(acc) {
        this.vy = Math.min(this.vy + acc, 4);
    }

    stopHorzMove() {
        this.vx = 0;
    }
}