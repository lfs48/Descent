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
            xBoundUp: this.x + this.getVx() + (this.width/1.25),
            xBoundDown: this.x + this.getVx() - (this.width/1.25),
            yBoundUp: this.y + this.getVy() + (this.height/1.25),
            yBoundDown: this.y + this.getVy() - (this.height/1.25)
        })
    }
}