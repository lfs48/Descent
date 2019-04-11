class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.player = new Actor(240, 50, 0, 1, 10);
        this.rightPressed = false;
        this.leftPressed = false;

        this.clear = this.clear.bind(this);
        this.draw = this.draw.bind(this);
        this.drawActor = this.drawActor.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();
        this.updatePlayerPos();
        this.drawActor(this.player);
    }

    drawActor(actor) {
        this.ctx.beginPath();
        this.ctx.arc(actor.x, actor.y, actor.r, 0, Math.PI*2, false);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }

    updatePlayerPos() {
        this.player.stopHorzMove();
        if (this.rightPressed && !this.leftPressed) {
            this.player.moveRight();
        }
        if (this.leftPressed && !this.rightPressed) {
            this.player.moveLeft();
        }
        this.player.accY(.05);
        this.player.updatePos();
    }

    keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
    } 
}