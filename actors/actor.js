class Actor {
    constructor({x, y, vx, vy}) {
        this.x = x;
        this.y = y;
        this.vx = vx ? vx : 0;
        this.vy = vy ? vy : 0;
    }

    drawFunction(ctx) {
        this.activeSprite.draw(ctx);
        this.activeSprite.update();
    }

    collisionBox() {
        return ({
            xBoundUp: this.x + this.getVx() + this.width,
            xBoundDown: this.x + this.getVx(),
            yBoundUp: this.y + this.getVy() + this.height,
            yBoundDown: this.y + this.getVy()
        })
    }

    getVx() {
        if (typeof this.vx === 'function') {
            return this.vx();
        } else {
            return this.vx;
        }
    }

    getVy() {
        if (typeof this.vy === 'function') {
            return this.vy();
        } else {
            return this.vy;
        }  
    }

    updateSprite(type = 'default') {
        this.activeSprite = this.sprites[`${type}${this.direction || ""}`];
    }

    willCollide(otherActor) {
        const { xBoundUp, xBoundDown, yBoundUp, yBoundDown } = this.collisionBox();
        const otherCollision = otherActor.collisionBox();
        const otherXBoundUp = otherCollision.xBoundUp;
        const otherXBoundDown = otherCollision.xBoundDown;
        const otherYBoundUp = otherCollision.yBoundUp;
        const otherYBoundDown = otherCollision.yBoundDown;
        const overlapX = !(
            (xBoundUp >= otherXBoundUp && xBoundDown >= otherXBoundUp) ||
            (xBoundDown <= otherXBoundDown && xBoundUp <= otherXBoundDown)
        );

        const overlapY = !(
            (yBoundUp >= otherYBoundUp && yBoundDown >= otherYBoundUp) ||
            (yBoundDown <= otherYBoundDown && yBoundUp <= otherYBoundDown)
        );

        return (overlapX && overlapY);

    }

    updatePos() {
        this.x += this.getVx();
        this.y += this.getVy();
    }

    stopHorzMove() {
        this.vx = 0;
    }

    handleCollision() {
        
    }
}