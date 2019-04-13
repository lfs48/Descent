class PlayerFallingSprite extends Sprite {
    constructor(actor) {
        super(actor);
        this.ticksPerFrame = 15;
        this.numFrames = 4;
        this.spritesheet = new Image();
        this.spritesheet.src = "assets/player-spritesheet.gif";
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
            this.actor.height,
            this.actor.width
        );
    }
    
}