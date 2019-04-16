class Splash {

    constructor(canvas, display) {
        this.canvas = canvas;
        this.display = display;
        this.ctx = canvas.getContext("2d");

        this.cursor = new Visual({x:50, y:50, width:80, height:66, file:'assets/arrow-right.png', numFrames:1, framesPerTick:45});
        this.bouncy = new Visual({x: 100, y: 200, width: 79, height: 49, file: 'assets/bouncy-right.png', numFrames: 6, framesPerTick: 15});

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);

        this.stage = "menu";
    }

    draw() {
        this.clear();
        if(this.stage === "menu") {
            this.drawMainMenu();
        } else if (this.stage === 'instructions') {
            this.drawInstructions();
        } else if (this.stage === 'about') {
            this.drawAbout();
        }
        
    }

    drawMainMenu() {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle="white";
        this.ctx.fillText(`Play`, 150, 100);
        this.ctx.fillText(`Instructions`, 150, 200);
        this.ctx.fillText(`About Me`, 150, 300);
        this.cursor.drawFunction(this.ctx);  
    }

    drawInstructions() {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle="white";
        this.ctx.fillText(`Instructions`, 100, 100);
        this.ctx.font = "25px Arial";
        this.ctx.fillText(`Descent is a game about falling`, 70, 200);
        this.bouncy.drawFunction(this.ctx);
    }

    drawAbout() {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle="white";
        this.ctx.fillText(`About Me`, 100, 100);
        this.ctx.font = "25px Arial";
        this.ctx.fillText(`Name: Lucas Schraier`, 70, 200);
        this.ctx.fillText(`Github: https://github.com/lfs48`, 70, 300);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    keyDownHandler(e) {
        e.preventDefault();
        if(e.key == "Enter" || e.key == " " || e.key == "z") {
            this.handleEnter();
        } else if (e.key == 'Backspace') {
            this.stage = "menu";
        }
        if (this.stage == "menu") {
            if(e.key == "Down" || e.key == "ArrowDown") {
                this.moveCursorDown();
            }
            else if(e.key == "Up" || e.key == "ArrowUp") {
                this.moveCursorUp();
            } 
        }
    }

    handleEnter() {
        if (this.cursor.y === 50) {
            this.display.leaveSplash();
        } else if (this.cursor.y === 150) {
            this.stage = "instructions";
        } else if (this.cursor.y === 250) {
            this.stage = "about";
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