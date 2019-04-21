class enemyFactory {

    constructor(screen) {
        this.screen = screen;
        this.enemyTypes = [Ghost, Skull, Bouncy];
        this.generateEnemies = this.generateEnemies.bind(this);
        this.patterns = [
            [ {x: 140 + (Math.random() * 100) , y: 740} ],
            [ {x: 260 + (Math.random() * 100) , y: 740} ],
            [ {x: 140, y: 740}, {x: 360, y: 820} ],
            [ {x: 140 + (Math.random() * 40), y: 740}, {x: 180 + (Math.random() * 40), y: 820} ],
            [ {x: 260 + (Math.random() * 40), y: 740}, {x: 300 + (Math.random() * 40), y: 820} ],
            [ {x: 140 + (Math.random() * 60), y: 740}, {x: 220 + (Math.random() * 60), y: 820}, {x: 300 + (Math.random() * 60), y: 900} ]
        ];
    }

    randomPattern() {
        const r = Math.floor(Math.random() * this.patterns.length);
        return this.patterns[r];
    }

    getRandomEnemyType() {
        const r = Math.floor(Math.random() * this.enemyTypes.length);
        return this.enemyTypes[r];
    }

    generateEnemies() {
        const enemies = [];
        const pattern = this.randomPattern();
        for(let i = 0; i < pattern.length; i++) {
            const {x, y} = pattern[i];
            const enemyType = this.getRandomEnemyType();
            const enemy = new enemyType({x:x, y:y, vy:this.screen.getGravity, screen:this.screen});
            enemies.push(enemy);
        }
        return enemies;
    }

}