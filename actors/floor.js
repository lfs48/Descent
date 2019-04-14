class Floor extends Actor {

    constructor(options) {
        super(options);
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