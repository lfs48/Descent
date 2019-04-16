class Splash {

    constructor(canvas, display) {
        this.canvas = canvas;
        this.display = display;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "50px Arial";

        this.cursor = new Visual({x:50, y:50, width:80, height:66, file:'assets/arrow-right.png', numFrames:1, framesPerTick:45});

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    draw() {
        this.clear();
        this.ctx.fillStyle="white";
        this.ctx.fillText(`Play`, 150, 100);
        this.ctx.fillText(`Instructions`, 150, 200);
        this.ctx.fillText(`About Me`, 150, 300);
        this.cursor.drawFunction(this.ctx);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    keyDownHandler(e) {
        e.preventDefault();
        if(e.key == "Enter") {
            this.display.leaveSplash();
        }
        if(e.key == "Down" || e.key == "ArrowDown") {
            this.moveCursorDown();
        }
        else if(e.key == "Up" || e.key == "ArrowUp") {
            this.moveCursorUp();
        } 
    }

    moveCursorDown() {
        const y = this.cursor.y + 100;
        if (y > 250) {
            this.cursor.y = 50;
        } else {
            this.cursor.y = y;
        }
    }

    moveCursorUp() {
        const y = this.cursor.y - 100;
        if (y < 50) {
            this.cursor.y = 250;
        } else {
            this.cursor.y = y;
        }
    }

}