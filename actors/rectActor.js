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
            xBoundUp: this.x + this.getVx() + this.width,
            xBoundDown: this.x + this.getVx(),
            yBoundUp: this.y + this.getVy() + this.height,
            yBoundDown: this.y + this.getVy()
        })
    }
}