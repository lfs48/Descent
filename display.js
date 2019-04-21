class Display {
    constructor() {
        this.splashCanvas = document.getElementById("splash-canvas");
        this.container = document.getElementById("descent-container");

        this.splash = new Splash(this.splashCanvas, this);
        this.gameStarted = false;
        this.draw = this.draw.bind(this);
        this.start = this.start.bind(this);
        document.addEventListener("keydown", this.splash.keyDownHandler, false);
    }

    start() {
        this.fadeIn(this.splashCanvas);
    }

    fadeIn(element) {
        let opacity = 0.1;
        const timer = setInterval( () => {
            if (opacity > 1){
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
            opacity *= 1.01;
        }, 5);
    }

    fadeOut(element) {
        let opacity = 1;
        const timer = setInterval( () => {
            if (opacity <= 0){
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
            opacity -= .005;
        }, 5);
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
        width.value = "150";
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
        this.fadeOut(this.splashCanvas);
        setTimeout( () => {
            this.splashCanvas.parentNode.removeChild(this.splashCanvas);
            this.gameStarted = true;
            this.createDescentCanvas();
            this.createScoreCanvas();
            this.createHealthCanvas();
            this.fadeIn(this.container);
            document.removeEventListener("keydown", this.splash.keyDownHandler);
            document.addEventListener("keydown", this.screen.keyDownHandler, false);
            document.addEventListener("keyup", this.screen.keyUpHandler, false);
        }, 1000);
    }
    
}