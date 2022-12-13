class Ground extends Phaser.TileSprite {
    physicsType: number;

    constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, frame?: number | string) {
        super(game, x, y, width, height, 'ground', frame);

        this.autoScroll(-200, 0);

        this.game.physics.arcade.enableBody(this);

        // HACK
        this.physicsType = Phaser.SPRITE;

        this.body.allowGravity = false;
        this.body.immovable = true;
    }

    update() {
    }
}