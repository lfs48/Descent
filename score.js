class Score {
    constructor(canvas, screen) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "9px press_start_2pregular";
        this.screen = screen;

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
    }

    draw() {
        this.clear();
        this.ctx.fillText(`Score: ${this.screen.getScore()}`, 8, 25);
        this.ctx.fillText(`Combo: ${this.screen.getCombo()}`, 8, 50);
        const cookie = document.cookie
        if (cookie.includes("hiscore=")) {
            this.ctx.fillText(`Hiscore: ${cookie.slice(cookie.indexOf("=")+1)}`, 8, 75);
        } else {
            this.ctx.fillText(`Hiscore: 0`, 8, 75);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}