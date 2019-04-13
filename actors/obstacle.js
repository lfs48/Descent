class Obstacle extends RectActor {
    
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.height = 38;
        this.width = 152;
        this.activeSprite = new Sprite(this, './assets/obstacle.png');
    }

}