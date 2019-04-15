class blockFactory {

    constructor(screen) {
        this.screen = screen;
        this.blockArrangements = [
            [ [30,750], [60,750], [90,750], [120,750], [150,750] ],
            [ [60,750], [90,750], [120,750], [150,750], [180, 750] ],
            [ [90,750], [120,750], [150,750], [180, 750], [210, 750] ]
        ];
        this.randomArrangement = this.randomArrangement.bind(this);
        this.generateBlocks = this.generateBlocks.bind(this);
    }

    randomArrangement() {
        const r = Math.floor(Math.random()*this.blockArrangements.length);
        return this.blockArrangements[r];
    }

    generateBlocks() {
        const arrangement = this.randomArrangement();
        const blocks = [];
        for(let i = 0; i < arrangement.length; i++) {
            const x = arrangement[i][0];
            const y = arrangement[i][1];
            const block = new Block({x: x, y: y, vy: this.screen.getGravity});
            blocks.push(block);
        };
        return blocks;
    }

}