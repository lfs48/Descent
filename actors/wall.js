class Wall extends RectActor {

    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.width = 30;
        this.height = 720;
    }

    drawFunction(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}