class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.player = new Actor(240, 360, 0, 0, 10, 10, function(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI*2, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        });

        this.rightPressed = false;
        this.leftPressed = false;
        this.actors = [this.player];

        this.clear = this.clear.bind(this);
        this.draw = this.draw.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.handleShoot = this.handleShoot.bind(this);
        this.clearActors = this.clearActors.bind(this);
        this.checkForCollisions = this.checkForCollisions.bind(this);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();
        this.updatePlayerDir();
        this.actors.forEach( actor => {
                this.checkForCollisions(actor);
                actor.updatePos();
                actor.drawFunction(this.ctx);
            }
        );
        this.clearActors();
    }

    checkForCollisions(actor) {
        for(let i = 0; i < this.actors.length; i++) {
            const otherActor = this.actors[i];
            if (actor !== otherActor && actor.willCollide(otherActor) ) {
                return true;
            }
        }
        return false;
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
        const bullet = new Actor(this.player.x, this.player.y + 15, 0, 10, 2, 2, function(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI*2, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        });
        this.actors.push(bullet);
    }

    clearActors() {
        const toDelete = [];
        this.actors.forEach( (actor, idx) => {
            if (actor.x < 0 || actor.x > 480 || actor.y < 0 || actor.y > 720) {
                toDelete.push(idx);
            }
        })
        this.actors = this.actors.filter( (_, idx) => 
            !toDelete.includes(idx)
        )
    }

    keyDownHandler(e) {
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