class obstacleFactory {

    constructor(screen) {
        this.screen = screen;
        this.obstacleTypes = [Obstacle, Block];
        this.generateObstacles = this.generateObstacles.bind(this);
        this.patterns = [
            [ {x: () => 30 + (Math.random() * 135) , y: () => 740} ],
            [ {x: () => 165 + (Math.random() * 135) , y: () => 740} ],
            [ {x: () => 30 + (Math.random() * 10), y: () => 740}, {x: () => 210 + (Math.random() * 135), y: () => 740 + (Math.random() * 10 )} ],
        ];
    }

    randomPattern() {
        const r = Math.floor(Math.random() * this.patterns.length);
        return this.patterns[r];
    }

    getRandomObstacleType() {
        const r = Math.floor(Math.random() * this.obstacleTypes.length);
        return this.obstacleTypes[r];
    }

    generateObstacles() {
        const obstacles = [];
        const pattern = this.randomPattern();
        for(let i = 0; i < pattern.length; i++) {
            const {x, y} = pattern[i];
            const obstacleType = this.getRandomObstacleType();
            const obstacle = new obstacleType({x:x(), y:y(), vy:this.screen.getGravity, screen:this.screen});
            obstacles.push(obstacle);
        }
        return obstacles;
    }

}