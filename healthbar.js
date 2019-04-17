class Healthbar {
    constructor(canvas, screen) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "15px press_start_2pregular";
        this.screen = screen;

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
    }

    draw() {
        this.clear();
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.screen.player.hp * 25, 50);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`${this.screen.player.hp} / 4`, 15, 32);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}