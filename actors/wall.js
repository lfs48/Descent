class Wall extends Actor {

    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.width = 26;
        this.height = 107;
        this.activeSprite = new Sprite(this, 'assets/wall.png');
    }

}