class Actor {
    constructor(x, y, vx, vy, width, height) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
    }

    willCollide(otherActor) {
        const xBoundUp = this.x + this.vx + this.width;
        const xBoundDown = this.x + this.vx - this.width;
        const yBoundUp = this.y + this.vy + this.height;
        const yBoundDown = this.y + this.vy - this.height;

        const otherXBoundUp = otherActor.x + otherActor.vx + otherActor.width;
        const otherXBoundDown = otherActor.x + otherActor.vx - otherActor.width;
        const otherYBoundUp = otherActor.y + otherActor.vy + otherActor.height;
        const otherYBoundDown = otherActor.y + otherActor.vy - otherActor.height;

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