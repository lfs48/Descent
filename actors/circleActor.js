class CircleActor extends Actor {
    drawFunction(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI*2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    collisionBox() {
        return ({
            xBoundUp: this.x + this.vx + this.width,
            xBoundDown: this.x + this.vx - this.width,
            yBoundUp: this.y + this.vy + this.height,
            yBoundDown: this.y + this.vy - this.height
        })
    }
}