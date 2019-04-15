class BlockGroup {
    
    constructor() {
        this.blocks = [];
        this.addBlock = this.addBlock.bind(this);
        this.initializeCollision = this.initializeCollision.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
    }

    addBlock(block) {
        this.blocks.push(block);
    }

    initializeCollision() {
        this.blocks[0].becomeLeftBlock();
        this.blocks[this.blocks.length-1].becomeRightBlock();
    }

    removeBlock(block) {
        const idx = this.blocks.indexOf(block);
        delete this.blocks[idx];
        if (this.blocks[idx-1]) {
            this.blocks[idx-1].becomeRightBlock();
        }
        if (this.blocks[idx+1]) {
            this.blocks[idx+1].becomeLeftBlock();
        }
    }

}