class Ammo extends Actor {

    constructor(options) {
        super(options);
        this.width = 32;
        this.height = 13;
        this.player = options.player;
        this.activeSprite = new Sprite(this, "https://i.imgur.com/vsnPvLu.png");
    }

    updatePos() {
        this.x = this.player.x;
        this.y = this.player.y - 15;
    }

    decreaseAmmo() {
        this.width -= 8;
    }

    resetAmmo() {
        this.width = 32;
    }
}