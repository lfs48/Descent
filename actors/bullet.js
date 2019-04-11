class Bullet extends Actor {
    drawFunction(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI*2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}