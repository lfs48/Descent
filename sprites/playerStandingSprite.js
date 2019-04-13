class PlayerStandingSprite extends Sprite {
    constructor(actor) {
        super(actor);
        this.ticksPerFrame = 60;
        this.numFrames = 1;
        this.spritesheet = new Image();
        this.spritesheet.src = "assets/player-standing.gif";
    }
    
}