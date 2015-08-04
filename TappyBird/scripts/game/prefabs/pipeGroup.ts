class PipeGroup extends Phaser.Group {
    topPipe: Pipe;
    bottomPipe: Pipe;
    hasScored: boolean;

    constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer) {
        super(game, parent);

        this.topPipe = new Pipe(this.game, 0, 0, 0);
        this.add(this.topPipe);

        this.bottomPipe = new Pipe(this.game, 0, 440, 1);
        this.add(this.bottomPipe);

        this.hasScored = false;

        this.topPipe.body.velocity.x = -200;
        this.bottomPipe.body.velocity.x = -200;
    }

    reset(x: number, y: number) {
        this.topPipe.reset(0, 0);
        this.bottomPipe.reset(0, 440);

        this.x = x;
        this.y = y;
        
        // magic
        this.setAll('body.velocity.x', -200);

        this.hasScored = false;
        this.exists = true;
    }

    checkWorldBounds() {
        if (!this.topPipe.inWorld) {
            this.exists = false;
        }
    }

    update() {
        this.checkWorldBounds();
    }
}