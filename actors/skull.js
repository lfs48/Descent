class Skull extends Enemy {
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.width = 40;
        this.height = 46;
        this.randomPath = false;

        this.direction = vx > 0 ? 'Right' : 'Left';
        this.sprites = {
            defaultRight: new Sprite(this, 'assets/skull-right.png', 4),
            defaultLeft: new Sprite(this, 'assets/skull-left.png', 4)
        };
        this.activeSprite = this.sprites[`default${this.direction}`];
    }

}