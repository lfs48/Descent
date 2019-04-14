class Skull extends Enemy {
    constructor(options) {
        super(options);
        this.vx = Math.random() > 0.5 ? 4 : -4;
        this.width = 40;
        this.height = 46;
        this.randomPath = false;

        this.direction = this.vx > 0 ? 'Right' : 'Left';
        this.sprites = {
            defaultRight: new Sprite(this, 'assets/skull-right.png', 4),
            defaultLeft: new Sprite(this, 'assets/skull-left.png', 4)
        };
        this.activeSprite = this.sprites[`default${this.direction}`];
    }

}