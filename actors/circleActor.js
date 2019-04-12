class CircleActor extends Actor {
        
    collisionBox() {
        return ({
            xBoundUp: this.x + this.getVx() + (this.radius/1.25),
            xBoundDown: this.x + this.getVx() - (this.radius/1.25),
            yBoundUp: this.y + this.getVy() + (this.radius/1.25),
            yBoundDown: this.y + this.getVy() - (this.radius/1.25)
        })
    }
}