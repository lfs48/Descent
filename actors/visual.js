class Visual extends CircleActor {
    constructor(x, y, vx, vy, width, height, file, numFrames, framesPerTick) {
        super(x, y, vx, vy);
        this.width = width;
        this.height = height;
        this.activeSprite = new Sprite(this, file, numFrames, framesPerTick);
    }

    drawFunction(ctx) {
        this.activeSprite.draw(ctx);
        this.activeSprite.update();
    }
}