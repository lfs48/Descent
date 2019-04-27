class Ammo extends Actor {

    constructor(options) {
        super(options);
        this.width = 44;
        this.height = 18;
        this.player = options.player;
        this.activeSprite = new Sprite(this, "https://66.media.tumblr.com/82221208a86376dff045a13229a53483/tumblr_pqmtqkwjfu1wejsx8o1_75sq.png");
    }

    updatePos() {
        this.x = this.player.x;
        this.y = this.player.y - 20;
    }

    decreaseAmmo() {
        this.width -= 11;
    }

    resetAmmo() {
        this.width = 44;
    }
}