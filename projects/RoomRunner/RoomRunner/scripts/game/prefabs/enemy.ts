class Enemy extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, frame?: string | number) {
        super(game, x, y, 'enemy', frame);

        this.anchor.setTo(0.5, 0.5);

        this.alive = true;

        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
    }

    update() {
        if (!this.alive) {
            return;
        }

        if (this.angle < 90 && this.alive) {
            this.angle += 2.5;
        }
    }
} 