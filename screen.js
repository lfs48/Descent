class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(240, 360, 0, 0, 10, 10);
        this.leftWall = new RectActor(0, 0, 0, 0, 30, 720);
        this.rightWall = new RectActor(450, 0, 0, 0, 30, 720);

        this.gravity = -1;

        this.rightPressed = false;
        this.leftPressed = false;
        this.actors = [this.player, this.leftWall, this.rightWall];

        this.clear = this.clear.bind(this);
        this.draw = this.draw.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.handleShoot = this.handleShoot.bind(this);
        this.clearActors = this.clearActors.bind(this);
        this.checkForCollisions = this.checkForCollisions.bind(this);
        this.generateObstacleq = this.generateObstacle.bind(this);
        this.getGravity = this.getGravity.bind(this);
    }

    getGravity() {
        return this.gravity;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();
        if (Math.random() > 0.99) {
            this.generateObstacle();
        }
        this.updatePlayerDir();
        this.actors.forEach( actor => {
                this.checkForCollisions(actor);
                actor.updatePos();
                actor.drawFunction(this.ctx);
            }
        );
        this.clearActors();
    }

    generateObstacle() {
        const x = Math.max(30, (Math.random()*420) );
        const obstacle = new RectActor(x, 700, 0, this.getGravity, 60, 20);
        this.actors.push(obstacle);
    }

    checkForCollisions(actor) {
        for(let i = 0; i < this.actors.length; i++) {
            const otherActor = this.actors[i];
            if (actor !== otherActor && actor.willCollide(otherActor) ) {
                actor.handleCollision(otherActor);
            }
        }
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
        const bullet = new CircleActor(this.player.x, this.player.y + 15, 0, 10, 2, 2);
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