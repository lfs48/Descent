class enemyFactory {

    constructor(screen) {
        this.screen = screen;
        this.enemyTypes = [Ghost, Skull];
        this.shouldGenerateEnemy = this.shouldGenerateEnemy.bind(this);
        this.generateEnemies = this.generateEnemies.bind(this);
    }

    shouldGenerateEnemy() {
        if (Math.random() > 0.99) {
            return true
        } else {
            return false;
        }
    }

    numToGenerate() {
        const r = Math.random();
        if (r < 0.8) {
            return 1;
        } else if (r < 0.95) {
            return 2;
        } else {
            return 3;
        }
    }

    getRandomEnemyType() {
        const r = Math.floor(Math.random() * this.enemyTypes.length);
        return this.enemyTypes[r];
    }

    generateEnemies() {
        const enemies = [];
        const r = this.numToGenerate();
        for(let i = 0; i < r; i++) {
            const enemyType = this.getRandomEnemyType();
            const x = Math.max(60, (Math.random()*420) );
            const y = 740 + (Math.random() * 50);
            const enemy = new enemyType({x:x, y:y, vy:this.screen.getGravity, screen:this.screen});
            enemies.push(enemy);
        }
        return enemies;
    }

}