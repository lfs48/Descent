class RectActor extends Actor {
    
    collisionBox() {
        return ({
            xBoundUp: this.x + this.getVx() + this.width,
            xBoundDown: this.x + this.getVx(),
            yBoundUp: this.y + this.getVy() + this.height,
            yBoundDown: this.y + this.getVy()
        })
    }
}