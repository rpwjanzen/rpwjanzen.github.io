class Enemy extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, frame?: string | number) {
        super(game, x, y, 'enemy', frame);

        this.anchor.setTo(0.5, 0.5);

        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.immovable = true;

        this.body.velocity.y = 100;
    }

    update() {
        if (this.y <= 0) {
            this.body.velocity.y = Math.abs(this.body.velocity.y);
        }

        if (this.y >= this.game.height) {
            this.body.velocity.y = -Math.abs(this.body.velocity.y);
        }

    }
} 