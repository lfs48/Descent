class Wall extends RectActor {

    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.width = 26;
        this.height = 107;
        this.activeSprite = new Sprite(this, 'assets/wall.png', 1);
    }

    randomColor() {
        const r = Math.random();
        if (r > 0.9) {
            return "lightblue";
        } else if (r > 0.8) {
            return "red";
        } else if (r > 0.7) {
            return "blue";
        } else if (r > 0.6) {
            return "purple";
        } else if (r > 0.5) {
            return "white";
        } else if (r > 0.4) {
            return "green";
        } else if (r > 0.3) {
            return "pink";
        } else if (r > 0.2) {
            return "orange";
        } else if (r > 0.1) {
            return "yellow";
        } else {
            return "brown";
        }
    }

    drawFunction(ctx) {
        this.activeSprite.draw(ctx);
        this.activeSprite.update();
    }
}