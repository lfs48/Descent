class Splash {

    constructor(canvas, display) {
        this.canvas = canvas;
        this.display = display;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "50px Arial";

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    draw() {
        this.clear();
        this.ctx.fillStyle="white";
        this.ctx.fillText(`Play`, 100, 100);
        this.ctx.fillText(`Instructions`, 100, 200);
        this.ctx.fillText(`About Me`, 100, 300);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    keyDownHandler(e) {
        if(e.key == "Enter") {
            this.display.leaveSplash();
        }
    }

}