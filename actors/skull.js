class Skull extends Enemy {
    constructor(options) {
        super(options);
        this.vx = Math.random() > 0.5 ? 4 : -4;
        this.width = 40;
        this.height = 46;
        this.randomPath = false;

        this.direction = this.vx > 0 ? 'Right' : 'Left';
        this.sprites = {
            defaultRight: new Sprite(this, 'https://66.media.tumblr.com/4bcf70c60999a4afd6a9a60b95333ce2/tumblr_pqj1y5MCp51wejsx8o1_250.png', 4),
            defaultLeft: new Sprite(this, 'https://66.media.tumblr.com/01488824c5aa02f3e5d919da9709611d/tumblr_pqj1ye90fh1wejsx8o1_250.png', 4)
        };
        this.activeSprite = this.sprites[`default${this.direction}`];
    }

}