class Actor {
    constructor(x, y, vx, vy, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
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

    stopHorzMove() {
        this.vx = 0;
    }
}