class Score {
    constructor(canvas, screen) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "15px Arial";
        this.screen = screen;

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
    }

    draw() {
        this.clear();
        this.ctx.fillText(`Score: ${screen.getScore()}`, 0, 50);
        this.ctx.fillText(`Combo: ${screen.getCombo()}`, 0, 100);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}