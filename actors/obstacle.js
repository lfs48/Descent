class Obstacle extends Actor {
    
    constructor(options) {
        super(options);
        this.height = 38;
        this.width = 152;
        this.activeSprite = new Sprite(this, './assets/obstacle.png');
    }

}