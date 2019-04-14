class Visual extends Actor {
    constructor(options) {
        super(options);
        this.width = options.width;
        this.height = options.height;
        this.activeSprite = new Sprite(this, options.file, options.numFrames, options.framesPerTick);
    }

}