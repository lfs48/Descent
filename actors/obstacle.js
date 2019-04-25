class Obstacle extends Actor {
    
    constructor(options) {
        super(options);
        this.height = 38;
        this.width = 152;
        this.activeSprite = new Sprite(this, 'https://66.media.tumblr.com/84c6d92701f8f3bed914a40f3ba228cf/tumblr_pqivzbEAOM1wejsx8o1_250.png');
    }

}