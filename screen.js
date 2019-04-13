class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(210, 330, 0, 0, this);
        this.actors = [this.player];

        this.gravity = -1;
        this.shotCooldown = false;

        this.rightPressed = false;
        this.leftPressed = false;

        this.score = 0;
        this.combo = 1;

        this.distance = 0;
        this.maxDistance = 0;
        this.lastWallPos = 0;

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
        this.generateFloor = this.generateFloor.bind(this);
        this.isEndOfStage = this.isEndOfStage.bind(this);
        this.gameHasStarted = this.gameHasStarted.bind(this);
        this.updateGravity = this.updateGravity.bind(this);
        this.gainScore = this.gainScore.bind(this);
    }

    gameHasStarted() {
        if (this.started) {
            return true;
        } else if (this.rightPressed || this.leftPressed) {
            this.started = true;
            this.distance = 0;
            this.maxDistance = 0;
            return true;
        } else {
            return false;
        }
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
        return (this.player.won || this.player.hp < 1);
    }

    gameOverMessage() {
        this.ctx.font = "50px Arial";
        this.ctx.fillText(`GAME OVER`, 100, 50);
    }

    isEndOfStage() {
        return this.distance < -5000;
    }

    generateFloor() {
        const floor = new Floor(30, 700, 0, this.getGravity);
        this.actors.push(floor);
    }

    generateWalls() {
        if (!this.wallCooldown) {
            this.wallCooldown = true;
            const leftWall = new Wall(0, 720, 0, this.getGravity);
            const rightWall = new Wall(450, 720, 0, this.getGravity);
            this.actors.push(leftWall, rightWall);
            setTimeout( () => this.wallCooldown = false, 180);
        }
    }

    updateVariables() {
        this.distance += this.gravity;
        this.maxDistance = Math.min(this.maxDistance, this.distance);
        this.updateGravity();
        if ( this.gameHasStarted() ) {
            this.updateCombo();
            this.updateScore();
        }
    }

    draw() {
        this.clear();

        this.updateVariables();
        if ( (-1 * this.maxDistance) % 107 < 10) {
            this.generateWalls();
        }

        this.actors.forEach( actor => {
            actor.drawFunction(this.ctx);
            actor.updatePos();
        });

        if (this.isGameOver()) {
            this.gameOverMessage();
        } else if(this.gameHasStarted()) {
            this.player.unground();
            this.updatePlayerDir();
            this.player.center();

            if (this.isEndOfStage() && !this.ending) {
                this.ending = true;
                this.generateFloor();
            }

            this.actors.forEach( actor => {
                    this.checkForCollisions(actor);
                }
            );
            this.clearActors();

            if (!this.player.grounded && !this.isEndOfStage() && this.maxDistance === this.distance ) {
                if (Math.random() > 0.99) {
                    this.generateObstacle();
                }
                if (Math.random() > 0.99) {
                    this.generateEnemy();
                }
                if (Math.random() > 0.99) {
                    this.generateBouncy();
                }
            }
            
        } else {
            this.ctx.font = "15px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(`Press Left`, 100, 360);
            this.ctx.fillText(`Press Right`, 300, 360);
        }
            
    }

    updateGravity() {
        if (this.player.grounded) {
            this.gravity = 0;
        } else if (this.gravity > -1) {
            this.gravity -= 0.15;
        } else if (this.gravity > -2) {
            this.gravity -= 0.07;
        } else if (this.gravity > -4) {
            this.gravity -= 0.04;
        } else if (this.gravity > -6) {
            this.gravity -= 0.02;
        } else if (this.gravity > -10) {
            this.gravity = this.gravity - 0.0005;
        }
    }

    updateCombo() {
        if (this.player.grounded) {
            this.combo = 1;
        } else if (this.gravity < -2) {
            this.combo += 0.01;
        }
    }

    gainScore(num) {
        this.score += num * this.combo;
    }

    updateScore() {
        if (!this.player.grounded) {
            this.score += 0.01 * this.combo;
        }
    }

    generateObstacle() {
        const x = Math.max(30, (Math.random()*420) );
        const obstacle = new Obstacle(x, 700, 0, this.getGravity);
        this.actors.push(obstacle);
    }

    generateEnemy() {
        const x = Math.max(30, (Math.random()*420) );
        const vx = Math.random() > 0.5 ? 3 : -3;
        const enemy = new Enemy(x, 700, vx, this.getGravity);
        this.actors.push(enemy);
    }

    generateBouncy() {
        const x = Math.max(30, (Math.random()*420) );
        const vx = Math.random() > 0.5 ? 2 : -2;
        const bouncy = new Bouncy(x, 700, vx, this.getGravity);
        this.actors.push(bouncy);
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
            const bullet = new Bullet(this.player.x + 30, this.player.y + 60, 0, 10, this);
            this.actors.push(bullet);
            this.shotCooldown = true;
            setTimeout(this.reload, 500);
        }
    }

    handleJump() {
        if (this.player.grounded) {
            this.player.jump();
            this.gravity = 3;
        }
    }

    handleBounce() {
        this.gravity = 5;
    }

    clearActors() {
        const toDelete = [];
        this.actors.forEach( (actor, idx) => {
            if (actor.x < 0 || actor.x > 480 || actor.y < -100 || actor.y > 800) {
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