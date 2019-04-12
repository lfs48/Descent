class Floor extends RectActor {

    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.width = 420;
        this.height = 20;
    }

    drawFunction(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.closePath();
    }
}