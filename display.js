class Display {
    constructor() {
        const splashCanvas = document.getElementById("descent-canvas");
        const descentCanvas = document.getElementById("descent-canvas");
        const scoreCanvas = document.getElementById("score-canvas");
        const healthbarCanvas = document.getElementById("healthbar-canvas");

        this.splash = new Splash(splashCanvas);
        this.screen = new Screen(descentCanvas);
        this.score = new Score(scoreCanvas, this.screen);
        this.healthbar = new Healthbar(healthbarCanvas, this.screen);
        this.gameStarted = false;
        this.draw = this.draw.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        document.addEventListener("keydown", this.keyDownHandler, false);
        // document.addEventListener("keydown", this.screen.keyDownHandler, false);
        // document.addEventListener("keyup", this.screen.keyUpHandler, false);

        
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

    keyDownHandler(e) {
        if(e.key == "Enter") {
            this.gameStarted = true;
            document.removeEventListener("keydown", this.keyDownHandler);
            document.addEventListener("keydown", this.screen.keyDownHandler, false);
            document.addEventListener("keyup", this.screen.keyUpHandler, false);
        }
    }
    
}