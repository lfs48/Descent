class Splash {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "50px Arial";

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
    }

    draw() {
        this.ctx.fillText(`Play`, 12, 25);
        this.ctx.fillText(`Instructions`, 12, 50);
    }

}