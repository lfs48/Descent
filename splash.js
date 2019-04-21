class Splash {

    constructor(canvas, display) {
        this.canvas = canvas;
        this.display = display;
        this.ctx = canvas.getContext("2d");

        this.player = new Visual({x: 360, y: 560, width: 50, height: 42, file: 'assets/player-balancing-right.png', numFrames: 15, framesPerTick: 7});
        this.cursor = new Visual({x:250, y:250, width:80, height:68, file:'assets/arrow-right.png', numFrames:1, framesPerTick:45});
        this.well = new Visual({x:300, y:600, width:348, height:295, file:'assets/well.png', numFrames:1, framesPerTick:45});
        const bouncy = new Bouncy({x: 50, y: 380});
        const ghost = new Ghost({x: 50, y: 550});
        const bullet = new Bullet({x: 600, y: 380});
        this.instructionsActors = [bouncy, ghost, bullet];

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
        this.ctx.font = "35px press_start_2pregular";
        this.ctx.fillStyle="white";
        this.ctx.fillText(`Instructions`, 350, 100);
        this.ctx.font = "10px press_start_2pregular";
        this.ctx.fillText(`Descent is a game about falling!`, 70, 200);
        this.ctx.fillText(`Gain score based on how long you fall and`, 70, 230);
        this.ctx.fillText(`build up a big combo by avoiding platforms!`, 70, 260);
        this.ctx.fillText(`Land on bubbles to bounce upward`, 150, 400);
        this.ctx.fillText(`and reset your fall speed`, 150, 430);
        this.ctx.fillText(`Avoid enemies! Colliding with them will hurt`, 150, 600);
        this.ctx.fillText(`Press Z to shoot a blast.`, 650, 400);
        this.ctx.fillText(`Hitting an enemy will destroy it!`, 650, 430);
        this.ctx.fillText(`Press BACK to return to menu`, 650, 680);
        this.instructionsActors.forEach( (actor) =>
            actor.drawFunction(this.ctx) 
        );
    }

    drawAbout() {
        this.aboutCursor = new Visual({x:250, y:250, width:80, height:68, file:'assets/arrow-right.png', numFrames:1, framesPerTick:45});
        this.ctx.font = "35px press_start_2pregular";
        this.ctx.fillStyle="white";
        this.ctx.fillText(`About Me`, 350, 100);
        this.ctx.font = "20px press_start_2pregular";
        this.ctx.fillText(`Name: Lucas Schraier`, 70, 200);
        this.ctx.fillText(`Github: https://github.com/lfs48`, 70, 300);
        this.ctx.font = "10px press_start_2pregular";
        this.ctx.fillText(`Press BACK to return to menu`, 650, 680);
        this.aboutCursor.drawFunction(this.ctx);
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
        if (this.cursor.y === 250) {
            this.display.leaveSplash();
        } else if (this.cursor.y === 350) {
            this.stage = "instructions";
        } else if (this.cursor.y === 450) {
            this.stage = "about";
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