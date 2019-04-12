class Obstacle extends RectActor {
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.height = 30;
        this.width = 80;
    }

    drawFunction(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}