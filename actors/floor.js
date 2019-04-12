class Floor extends RectActor {
    drawFunction(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.closePath();
    }
}