class Wall extends Actor {

    constructor(options) {
        super(options);
        this.width = 26;
        this.height = 107;
        this.activeSprite = new Sprite(this, 'https://66.media.tumblr.com/327f7d0a97af719228c2851d6bd4763b/tumblr_pqivcvGggD1wejsx8o1_100.png');
    }

}