class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(240, 360, 0, 0, 15, 15);
        this.leftWall = new Wall(0, 0, 0, 0, 30, 720);
        this.rightWall = new Wall(450, 0, 0, 0, 30, 720);
        this.actors = [this.player, this.leftWall, this.rightWall];

        this.gravity = -1;
        this.shotCooldown = false;

        this.rightPressed = false;
        this.leftPressed = false;

        this.score = 0;
        this.combo = 1;

        this.distance = 0;

        this.clear = this.clear.bind(this);
        this.draw = this.draw.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.handleShoot = this.handleShoot.bind(this);
        this.clearActors = this.clearActors.bind(this);
        this.checkForCollisions = this.checkForCollisions.bind(this);
        this.generateObstacleq = this.generateObstacle.bind(this);
        this.getGravity = this.getGravity.bind(this);
        this.setGravity = this.setGravity.bind(this);
        this.reload = this.reload.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateCombo = this.updateCombo.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
    }

    getScore() {
        return Math.floor(this.score);
    }

    getCombo() {
        return Math.round(this.combo*10)/10;
    }

    getGravity() {
        return this.gravity;
    }

    setGravity(num) {
        this.gravity = num;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    isGameOver() {
        return this.distance < - 1000;
    }

    draw() {
        if (this.isGameOver()) {
            this.clear();
            this.actors.forEach( actor => {
                actor.drawFunction(this.ctx);
            });
        } else {
            this.clear();
            this.player.unground();
            this.updatePlayerDir();
            this.player.center();
            this.actors.forEach( actor => {
                    this.checkForCollisions(actor);
                    actor.updatePos();
                    actor.drawFunction(this.ctx);
                }
            );
            this.clearActors();

            if (this.player.grounded) {
                this.gravity = 0;
            } else {
                if (Math.random() > 0.99) {
                    this.generateObstacle();
                }
                if (Math.random() > 0.99) {
                    this.generateEnemy();
                }
                this.gravity = Math.max(this.gravity - 0.005, -5);
                this.distance += this.gravity;
            }
            this.updateCombo();
            this.updateScore();
        }
            
    }

    updateCombo() {
        if (this.player.grounded) {
            this.combo = 1;
        } else {
            this.combo += 0.01;
        }
    }

    updateScore() {
        if (!this.player.grounded) {
            this.score += 0.01 * this.combo;
        }
    }

    generateObstacle() {
        const x = Math.max(30, (Math.random()*420) );
        const obstacle = new RectActor(x, 700, 0, this.getGravity, 60, 20);
        this.actors.push(obstacle);
    }

    generateEnemy() {
        const x = Math.max(30, (Math.random()*420) );
        const vx = Math.random() > 0.5 ? 5 : -5;
        const obstacle = new Enemy(x, 700, vx, this.getGravity, 30, 30);
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

    reload() {
        this.shotCooldown = false;
    }

    handleShoot() {
        if (!this.shotCooldown && !this.isGameOver()) {
            const bullet = new Bullet(this.player.x, this.player.y + 15, 0, 10, 6, 6);
            this.actors.push(bullet);
            this.shotCooldown = true;
            setTimeout(this.reload, 500);
        }
    }

    handleJump() {
        if (this.player.grounded) {
            this.player.jump();
            this.gravity = 1;
            setTimeout( () => this.gravity = -1, 500);
        }
    }

    clearActors() {
        const toDelete = [];
        this.actors.forEach( (actor, idx) => {
            if (actor.x < 0 || actor.x > 480 || actor.y < 0 || actor.y > 720) {
                toDelete.push(idx);
            } else if (actor.remove) {
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
        } 
        if (e.key == 'z' || e.key == 'Z') {
            this.handleShoot();
        }
        if (e.key == ' ') {
            this.handleJump();
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