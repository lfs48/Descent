class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.player = new Actor(240, 360, 0, 0, 10);
        this.rightPressed = false;
        this.leftPressed = false;
        this.actors = [this.player];

        this.clear = this.clear.bind(this);
        this.draw = this.draw.bind(this);
        this.drawActor = this.drawActor.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.handleShoot = this.handleShoot.bind(this);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();
        this.updatePlayerDir();
        this.actors.forEach( actor => {
                actor.updatePos();
                this.drawActor(actor)
            }
        );
    }

    drawActor(actor) {
        this.ctx.beginPath();
        this.ctx.arc(actor.x, actor.y, actor.r, 0, Math.PI*2, false);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }

    updatePlayerDir() {
        this.player.stopHorzMove();
        if (this.rightPressed && !this.leftPressed) {
            this.player.moveRight();
        }
        if (this.leftPressed && !this.rightPressed) {
            this.player.moveLeft();
        }
    }

    handleShoot() {
        const bullet = new Actor(this.player.x, this.player.y, 0, 10, 2);
        this.actors.push(bullet);
    }

    keyDownHandler(e) {
        debugger
        if(e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        } else if (e.key == 'z' || e.key == 'Z') {
            this.handleShoot();
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