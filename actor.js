class Actor {
    constructor(x, y, vx, vy, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}