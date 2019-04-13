class Sprite {
    constructor(actor, file, numFrames = 1, ticksPerFrame = 15) {
        this.actor = actor;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = ticksPerFrame;
        this.numFrames = numFrames;
        this.spritesheet = new Image();
        this.spritesheet.src = file;
    }

    update() {
        this.tickCount += 1;	
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numFrames - 1) {
                this.frameIndex += 1; 
            } else {
                this.frameIndex = 0;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.spritesheet, 
            (this.frameIndex * this.actor.width), 
            0,
            this.actor.width,
            this.actor.height,
            this.actor.x,
            this.actor.y,
            this.actor.width,
            this.actor.height
        );
    }

}