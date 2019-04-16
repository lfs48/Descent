class Display {
    constructor() {
        const splashCanvas = document.getElementById("splash-canvas");
        this.container = document.getElementById("descent-container");

        this.splash = new Splash(splashCanvas, this);
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

    createHealthCanvas() {
        const healthCanvas = document.createElement("CANVAS");
        const width = document.createAttribute("width");
        width.value = "100";
        const height = document.createAttribute("height");
        height.value = "50";
        const id = document.createAttribute("id");
        id.value = "healthbar-canvas";
        healthCanvas.setAttributeNode(width);
        healthCanvas.setAttributeNode(height);
        healthCanvas.setAttributeNode(id);
        this.container.appendChild(healthCanvas);
        this.healthbar = new Healthbar(healthCanvas, this.screen);
    }

    createScoreCanvas() {
        const scoreCanvas = document.createElement("CANVAS");
        const width = document.createAttribute("width");
        width.value = "100";
        const height = document.createAttribute("height");
        height.value = "100";
        const id = document.createAttribute("id");
        id.value = "score-canvas";
        scoreCanvas.setAttributeNode(width);
        scoreCanvas.setAttributeNode(height);
        scoreCanvas.setAttributeNode(id);
        this.container.insertBefore(scoreCanvas, this.container.firstChild);
        this.score = new Score(scoreCanvas, this.screen);
    }

    createDescentCanvas() {
        const descentCanvas = document.createElement("CANVAS");
        const width = document.createAttribute("width");
        width.value = "480";
        const height = document.createAttribute("height");
        height.value = "720";
        const id = document.createAttribute("id");
        id.value = "descent-canvas";
        descentCanvas.setAttributeNode(width);
        descentCanvas.setAttributeNode(height);
        descentCanvas.setAttributeNode(id);
        this.container.appendChild(descentCanvas);
        this.screen = new Screen(descentCanvas, this.screen);
    }

    leaveSplash() {
        this.gameStarted = true;
        const splashCanvas = document.getElementById("splash-canvas");
        this.createDescentCanvas();
        this.createScoreCanvas();
        this.createHealthCanvas();
        splashCanvas.parentNode.removeChild(splashCanvas);

        document.removeEventListener("keydown", this.splash.keyDownHandler);
        document.addEventListener("keydown", this.screen.keyDownHandler, false);
        document.addEventListener("keyup", this.screen.keyUpHandler, false);
    }
    
}