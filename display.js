class Display {
    constructor() {
        const splashCanvas = document.getElementById("descent-canvas");
        const descentCanvas = document.getElementById("descent-canvas");
        const scoreCanvas = document.getElementById("score-canvas");
        const healthbarCanvas = document.getElementById("healthbar-canvas");

        this.splash = new Splash(splashCanvas, this);
        this.screen = new Screen(descentCanvas);
        this.score = new Score(scoreCanvas, this.screen);
        this.healthbar = new Healthbar(healthbarCanvas, this.screen);
        this.gameStarted = false;
        this.draw = this.draw.bind(this);
        document.addEventListener("keydown", this.splash.keyDownHandler, false);
    }

    draw() {
        if (this.gameStarted) {
            this.screen.draw();
            this.score.draw();
            this.healthbar.draw();
        } else {
            this.splash.draw();
        }
    }

    leaveSplash() {
        this.gameStarted = true;
        document.removeEventListener("keydown", this.splash.keyDownHandler);
        document.addEventListener("keydown", this.screen.keyDownHandler, false);
        document.addEventListener("keyup", this.screen.keyUpHandler, false);
    }
    
}