class RectActor extends Actor {
    drawFunction(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    collisionBox() {
        return ({
            xBoundUp: this.x + this.vx + this.width,
            xBoundDown: this.x + this.vx,
            yBoundUp: this.y + this.vy + this.height,
            yBoundDown: this.y + this.vy
        })
    }
}