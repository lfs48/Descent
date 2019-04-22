class Ghost extends Enemy {
    constructor(options) {
        super(options);
        this.screen = options.screen;
        this.vx = this.generateRandomPath;
        this.width = 80;
        this.height = 70;
        this.randomPath = false;
        this.generateRandomPath = this.generateRandomPath.bind(this);

        this.direction = this.vx > 0 ? 'Right' : 'Left';
        this.sprites = {
            defaultRight: new Sprite(this, 'assets/big-ghost-right.png', 6),
            defaultLeft: new Sprite(this, 'assets/big-ghost-left.png', 6)
        };
        this.activeSprite = this.sprites[`default${this.direction}`];
    }

    getVy() {
        return this.screen.getGravity() - 1;
    }

    generateRandomPath() {
        this.randomPath = true;
        this.vx = Math.random() > 0.5 ? 2 : -2;
        this.direction = this.vx > 0 ? 'Right' : 'Left';
        this.updateSprite();
        setTimeout( () => this.randomPath = false, 500 );
    }
}