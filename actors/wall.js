class Wall extends Actor {

    constructor(options) {
        super(options);
        this.width = 26;
        this.height = 107;
        this.activeSprite = new Sprite(this, 'assets/wall.png');
    }

}