class Actor {
    constructor(x, y, vx, vy, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
    }

    willCollide(otherActor) {
        const xBoundUp = this.x + this.vx + this.r;
        const xBoundDown = this.x + this.vx - this.r;
        const yBoundUp = this.y + this.vy + this.r;
        const yBoundDown = this.y + this.vy - this.r

        otherXBoundUp = otherActor.x + otherActor.vx + otherActor.r;
        otherXBoundDown = otherActor.x + otherActor.vx - otherActor.r;
        otherYBoundUp = otherActor.y + otherActor.vy + otherActor.r;
        otherYBoundDown = otherActor.y + otherActor.vy - otherActor.r;

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