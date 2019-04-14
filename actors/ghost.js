class Ghost extends Enemy {
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.width = 80;
        this.height = 70;
        this.randomPath = false;
        this.generateRandomPath = this.generateRandomPath.bind(this);

        this.direction = vx > 0 ? 'Right' : 'Left';
        this.sprites = {
            defaultRight: new Sprite(this, 'assets/big-ghost-right.png', 6),
            defaultLeft: new Sprite(this, 'assets/big-ghost-left.png', 6)
        };
        this.activeSprite = this.sprites[`default${this.direction}`];
    }

    generateRandomPath() {
        this.randomPath = false;
        this.vx = Math.random() > 0.5 ? 3 : -3;
        this.direction = this.vx > 0 ? 'Right' : 'Left';
        this.updateSprite();
    }
}