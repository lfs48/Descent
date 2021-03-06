class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.enemyFactory = new enemyFactory(this);
        this.obstacleFactory = new obstacleFactory(this);
        this.blockFactory = new blockFactory(this);

        this.initializeGame();

        this.clear = this.clear.bind(this);
        this.draw = this.draw.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.handleShoot = this.handleShoot.bind(this);
        this.checkForCollisions = this.checkForCollisions.bind(this);
        this.getGravity = this.getGravity.bind(this);
        this.setGravity = this.setGravity.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateCombo = this.updateCombo.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.generateFloor = this.generateFloor.bind(this);
        this.isEndOfStage = this.isEndOfStage.bind(this);
        this.gameHasStarted = this.gameHasStarted.bind(this);
        this.updateGravity = this.updateGravity.bind(this);
        this.getScore = this.getScore.bind(this);
        this.gainScore = this.gainScore.bind(this);
        this.renderInstructions = this.renderInstructions.bind(this);
        this.unrenderInstructions = this.unrenderInstructions.bind(this);
        this.initializeGame = this.initializeGame.bind(this);
        this.submitScore = this.submitScore.bind(this);
    }

    initializeGame() {
        this.player = new Player({x:210, y:330, screen:this});
        this.ammo = new Ammo({x: 210, y: 310, player: this.player});
        this.actors = [this.player, this.ammo];

        this.gravity = -1;
        this.shotCooldown = false;

        this.rightPressed = false;
        this.leftPressed = false;

        this.hasArrows = false;
        this.started = false;
        this.ending = false;

        this.score = 0;
        this.combo = 1;

        this.distance = 0;
        this.maxDistance = 0;
    }

    startMusic() {
        if (this.audio) {
            this.audio.pause();
        }
        this.audio = new Audio('assets/bg_music.mp3');
        this.audio.volume = 0.01;
        this.audio.play();
        this.audio.loop = true;
        const timer = setInterval( () => {
            if (this.audio.volume >= 0.15) {
                clearInterval(timer);
            }
            this.audio.volume += .0005;
        }, 10 );
    }

    gameHasStarted() {
        if (this.started) {
            return true;
        } else if (this.rightPressed || this.leftPressed) {
            this.started = true;
            this.distance = 0;
            this.maxDistance = 0;
            this.unrenderInstructions();
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
        this.ctx.font = "20px press_start_2pregular";
        if (this.player.won) {
            this.ctx.fillStyle = "green";
            this.ctx.fillText(`CONGRATULATIONS!`, 95, 50);
            this.ctx.fillText(`YOUR SCORE WAS ${this.getScore()}`, 80, 100);
            this.ctx.fillText(`PRESS ENTER`, 140, 150);
            this.ctx.fillText(`TO PLAY AGAIN`, 120, 200);
        } else {
            this.ctx.fillStyle = "red";
            this.ctx.fillText(`GAME OVER`, 153, 100);
            this.ctx.fillText(`PRESS ENTER`, 140, 200);
            this.ctx.fillText(`TO PLAY AGAIN`, 120, 300);
        }
    }

    submitScore() {
        if (document.cookie.includes("hiscore=") ) {
            const hiscore = document.cookie.slice(document.cookie.indexOf("=")+1);
            if (this.score > hiscore) {
                document.cookie = `hiscore=${this.getScore()}`;
            }
        } else {
            document.cookie = `hiscore=${this.getScore()}`;
        }
    }

    isEndOfStage() {
        return this.distance < -10000;
    }

    generateFloor() {
        const floor = new Floor({x:30, y:700, vy:this.getGravity});
        this.actors.push(floor);
    }

    generateWalls() {
        if (!this.wallCooldown && this.maxDistance === this.distance && this.actors.length < 100) {
            this.wallCooldown = true;
            const leftWall = new Wall({x:0, y:720, vy:this.getGravity});
            const rightWall = new Wall({x:454, y:720, vy:this.getGravity});
            this.actors.push(leftWall, rightWall);
            setTimeout( () => this.wallCooldown = false, 100);
        }
    }

    draw() {
        this.clear();
        this.actors.forEach( actor => {
            actor.drawFunction(this.ctx);
        });

        if ( (-1 * this.maxDistance) % 107 < 10) {
            this.generateWalls();
        }

        if (this.isGameOver()) {
            if (this.player.hp < 1) {
                this.player.die();
            }
            this.ammo.remove();
            this.gameOverMessage();
        } else if(this.gameHasStarted()) {
            
            this.player.unground();
            this.updatePlayerDir();
            this.player.center();

            if (this.isEndOfStage() && !this.ending) {
                this.ending = true;
                setTimeout(this.generateFloor, 2000);
            }

            this.actors.forEach( actor => {
                    this.checkForCollisions(actor);
                    actor.updatePos();
                }
            );

            if (!this.recentSpawn && !this.player.grounded && !this.isEndOfStage() && this.maxDistance === this.distance ) {
                const r = Math.random();
                if (r > 0.9) {
                    this.recentSpawn = true;
                    if (r <= 0.95) {
                        this.generateEnemies();
                    } else {
                        this.generateBlocks();
                    }
                    setTimeout( () => this.recentSpawn = false, 500 + (Math.random()*500) );
                }
            }
            
            this.distance += this.gravity;
            this.maxDistance = Math.min(this.maxDistance, this.distance);
            this.updateGravity();
            this.updateCombo();
            this.updateScore();

        } else {
            setTimeout( () => this.renderInstructions(), 3000);
            this.distance += this.gravity;
            this.maxDistance = Math.min(this.maxDistance, this.distance);
            this.updateGravity();
            this.actors.forEach( actor => {
                actor.updatePos();
            }
        );
        }
        this.clearActors();     
    }

    unrenderInstructions() {
        if (this.hasArrows) {
            this.leftArrow.remove();
            this.rightArrow.remove();
        } else {
            this.hasArrows = true;
        }
    }

    renderInstructions() {
        if (!this.hasArrows) {
            this.hasArrows = true;
            this.leftArrow = new Visual({x:100, y:340, width:80, height:66, file:'assets/arrow-left.png', numFrames:5, framesPerTick:10});
            this.rightArrow = new Visual({x:300, y:340, width:80, height:66, file:'assets/arrow-right.png', numFrames:5, framesPerTick:10});
            this.actors.push(this.leftArrow, this.rightArrow);
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

    generateEnemies() {
        const enemies = this.enemyFactory.generateEnemies();
        this.actors = this.actors.concat(enemies);
    }

    generateObstacles() {
        const obstacles = this.obstacleFactory.generateObstacles();
        this.actors = this.actors.concat(obstacles);
    }

    generateBlocks() {
        const blocks = this.blockFactory.generateBlocks();
        this.actors = this.actors.concat(blocks);
    }

    checkForCollisions(actor) {
        for(let i = 0; i < this.actors.length; i++) {
            const otherActor = this.actors[i];
            if (actor !== otherActor && !actor.removing && !otherActor.removing && actor.willCollide(otherActor) ) {
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
        if (this.player.ammo > 0 && !this.shotCooldown && !this.isGameOver()) {
            const bullet = new Bullet({x:this.player.x + this.player.vx + 3.5, y:this.player.y + 40, vy:7, screen:this});
            this.actors.push(bullet);
            this.shotCooldown = true;
            setTimeout( () => this.shotCooldown = false, 500);
            this.player.shoot();
            this.ammo.decreaseAmmo();
        }
    }

    handleJump() {
        if (this.player.grounded) {
            this.player.jump();
            this.gravity = 5;
        }
    }

    handleLand() {
        this.ammo.resetAmmo();
    }

    handleBounce() {
        this.gravity = 5;
    }

    clearActors() {
        this.actors.forEach( (actor) => {
            if (actor.x < 0 || actor.x > 480 || actor.y < -200 || actor.y > 920) {
                actor.remove();
            }
        });
        this.actors = this.actors.filter( (actor) => 
            !actor.shouldRemove
        );
    }

    keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
            this.rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
            this.leftPressed = true;
        } 
        if (e.key == 'z' || e.key == 'Enter') {
            this.handleShoot();
        }
        if (e.key == ' ') {
            this.handleJump();
        }
        if (e.key == 'Enter' && this.isGameOver() ) {
            this.initializeGame();
        }

    }

    keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
            this.rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
            this.leftPressed = false;
        }
    } 
}