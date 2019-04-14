class enemyFactory {

    constructor(screen) {
        this.screen = screen;
        this.enemyTypes = [Ghost, Skull];
        this.shouldGenerateEnemy = this.shouldGenerateEnemy.bind(this);
        this.generateEnemy = this.generateEnemy.bind(this);
    }

    shouldGenerateEnemy() {
        if (Math.random() > 0.99) {
            return true
        } else {
            return false;
        }
    }

    getRandomEnemyType() {
        const r = Math.floor(Math.random() * this.enemyTypes.length);
        return this.enemyTypes[r];
    }

    generateEnemy() {
        const enemyType = this.getRandomEnemyType();
        const x = Math.max(30, (Math.random()*420) );
        const enemy = new enemyType({x:x, y:740, vy:this.screen.getGravity, screen:this.screen});
        return enemy;
    }

}