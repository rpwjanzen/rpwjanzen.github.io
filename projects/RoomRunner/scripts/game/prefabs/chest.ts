class Chest extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, frame?: string | number) {
        super(game, x, y, 'chest', frame);

        this.anchor.setTo(0.5, 0.5);

        this.alive = true;

        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
    }
}