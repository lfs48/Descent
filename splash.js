class Splash {

    constructor(canvas, display) {
        this.canvas = canvas;
        this.display = display;
        this.ctx = canvas.getContext("2d");

        this.player = new Visual({x: 358, y: 560, width: 50, height: 42, file: 'https://66.media.tumblr.com/7ffb4cc34a6b962972759c8fb9d16b8e/tumblr_pqivevIxHo1wejsx8o1_1280.png', numFrames: 15, framesPerTick: 7});
        this.cursor = new Visual({x:250, y:250, width:80, height:68, file:'https://66.media.tumblr.com/a4bf8e8e8632b84b806dd4e0a4859ad2/tumblr_pqixmeW3VY1wejsx8o2_400.png', numFrames:5, framesPerTick:10});
        this.well = new Visual({x:300, y:600, width:348, height:295, file:'https://66.media.tumblr.com/49216e826a0926a066dac9b08cbb333b/tumblr_pqixj98a9e1wejsx8o1_400.png', numFrames:1, framesPerTick:45});
        const keyboard = new Visual({x:100, y:280, width:120, height:79, file:'https://66.media.tumblr.com/6eee470c7ee3a2b0edce98b1581e2473/tumblr_pqixlsO8lw1wejsx8o1_250.png', numFrames:1, framesPertick:45})
        const bouncy = new Bouncy({x: 120, y: 430});
        const ghost = new Ghost({x: 125, y: 570});
        this.instructionsActors = [keyboard, bouncy, ghost];

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
        this.ctx.fillStyle="white";
        this.ctx.font = "100px press_start_2pregular";
        this.ctx.fillText("DESCENT", 165, 200);
        this.ctx.font = "30px press_start_2pregular";
        this.ctx.fillText(`Play`, 350, 300);
        this.ctx.fillText(`Instructions`, 350, 400);
        this.ctx.fillText(`About Me`, 350, 500);
        this.cursor.drawFunction(this.ctx);  
        this.well.drawFunction(this.ctx);
        this.player.drawFunction(this.ctx);
    }

    drawInstructions() {
        this.ctx.fillStyle="white";

        this.ctx.font = "20px press_start_2pregular";

        this.ctx.fillText(`Descent is a game about falling!`, 200, 100);
        this.ctx.fillText(`Gain score based on how long you fall and`, 100, 150);
        this.ctx.fillText(`build up a big combo by avoiding platforms!`, 90, 200);

        this.ctx.font = "12px press_start_2pregular";

        this.ctx.fillText("Use the A & D or left & right keys to move left/right", 250, 300);
        this.ctx.fillText("Use the Enter or Z key to shoot", 250, 320);
        this.ctx.fillText("Use the Space key to jump when on the ground", 250, 340);

        this.ctx.fillText(`Land on bubbles to bounce upward`, 250, 450);
        this.ctx.fillText(`and reset your fall speed`, 250, 480);

        this.ctx.fillText(`Avoid enemies! Colliding with them will hurt`, 250, 600);
        this.ctx.fillText(`Elimate them by shooting to clear your path`, 250, 620);
        this.ctx.fillText(`Press BACK to return to menu`, 650, 680);

        this.instructionsActors.forEach( (actor) =>
            actor.drawFunction(this.ctx) 
        );
    }

    drawAbout() {
        this.ctx.fillStyle="white";
        this.ctx.font = "65px press_start_2pregular";
        this.ctx.fillText("Lucas Schraier", 50, 200);
        this.ctx.font = "30px press_start_2pregular";
        this.ctx.fillText(`Github`, 350, 300);
        this.ctx.fillText(`LinkedIn`, 350, 400);
        this.ctx.fillText(`AngelList`, 350, 500);
        this.ctx.font = "10px press_start_2pregular";
        this.ctx.fillText(`Press BACK to return to menu`, 650, 680);
        this.cursor.drawFunction(this.ctx); 
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    keyDownHandler(e) {
        e.preventDefault();
        if(e.key == "Enter" || e.key == " " || e.key == "z") {
            this.handleEnter();
        } else if (e.key == 'Backspace') {
            if (this.stage == "about") {
                this.cursor.y = 450;
            }
            this.stage = "menu";
        }
        if (this.stage == "menu" || this.stage == "about") {
            if(e.key == "Down" || e.key == "ArrowDown") {
                this.moveCursorDown();
            }
            else if(e.key == "Up" || e.key == "ArrowUp") {
                this.moveCursorUp();
            } 
        }
    }

    handleEnter() {
        if (this.stage == "menu") {
            if (this.cursor.y === 250) {
                this.display.leaveSplash();
            } else if (this.cursor.y === 350) {
                this.stage = "instructions";
            } else if (this.cursor.y === 450) {
                this.cursor.y = 250;
                this.stage = "about";
            }
        } else if (this.stage == "about") {
            if (this.cursor.y === 250) {
                window.location.assign("https://github.com/lfs48");
            } else if (this.cursor.y === 350) {
                window.location.assign("https://www.linkedin.com/in/lucas-schraier-559baa180/");
            } else if (this.cursor.y === 450) {
                window.location.assign("https://angel.co/lucas-schraier");
            }
        }
    }

    moveCursorDown() {
        const y = this.cursor.y + 100;
        if (y > 450) {
            this.cursor.y = 250;
        } else {
            this.cursor.y = y;
        }
    }

    moveCursorUp() {
        const y = this.cursor.y - 100;
        if (y < 250) {
            this.cursor.y = 450;
        } else {
            this.cursor.y = y;
        }
    }

}