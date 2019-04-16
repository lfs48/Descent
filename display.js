class Display {
    constructor() {
        const descentCanvas = document.getElementById("descent-canvas");
        const scoreCanvas = document.getElementById("score-canvas");
        const healthbarCanvas = document.getElementById("healthbar-canvas");
        this.screen = new Screen(descentCanvas);
        this.score = new Score(scoreCanvas, this.screen);
        this.healthbar = new Healthbar(healthbarCanvas, this.screen);

        document.addEventListener("keydown", this.screen.keyDownHandler, false);
        document.addEventListener("keyup", this.screen.keyUpHandler, false);

        this.gameStarted = true;
        this.draw = this.draw.bind(this);
    }

    draw() {
        this.screen.draw();
        this.score.draw();
        this.healthbar.draw();
    }
    
}