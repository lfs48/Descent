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
            xBoundUp: this.x + this.getVx() + this.width,
            xBoundDown: this.x + this.getVx() - this.width,
            yBoundUp: this.y + this.getVy() + this.height,
            yBoundDown: this.y + this.getVy() - this.height
        })
    }
}