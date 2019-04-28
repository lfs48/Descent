class blockFactory {

    constructor(screen) {
        this.screen = screen;
        this.blockArrangements = [
            [ [30,750], [70,750], [110,750], [150,750], [190,750] ],
            [ [70,750], [110,750], [150,750], [190,750], [230, 750] ],
            [ [110,750], [150,750], [190,750], [230, 750], [270, 750] ]
        ];
    }

    randomArrangement() {
        const r = Math.floor(Math.random()*this.blockArrangements.length);
        return this.blockArrangements[r];
    }

    generateBlocks() {
        const arrangement = this.randomArrangement();
        const blocks = [];
        const blockGroup = new BlockGroup();
        for(let i = 0; i < arrangement.length; i++) {
            const x = arrangement[i][0];
            const y = arrangement[i][1];
            const block = new Block({x: x, y: y, vy: this.screen.getGravity, blockGroup: blockGroup});
            blocks.push(block);
            blockGroup.addBlock(block);
        };
        blockGroup.initializeCollision();
        return blocks;
    }

}