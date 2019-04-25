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
            defaultRight: new Sprite(this, 'https://66.media.tumblr.com/0a55a46a25c44178e55780ebdd9bf734/tumblr_pqixm0CIFd1wejsx8o1_500.png', 6),
            defaultLeft: new Sprite(this, 'https://66.media.tumblr.com/b328cd58978654d6dd9bc334a8f4d691/tumblr_pqixm0CIFd1wejsx8o2_500.png', 6)
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