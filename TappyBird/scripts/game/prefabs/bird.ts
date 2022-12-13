class Bird extends Phaser.Sprite {
    flapSound: Phaser.Sound;

    constructor(game: Phaser.Game, x: number, y: number, frame?: string | number) {
        super(game, x, y, 'bird', frame);

        this.anchor.setTo(0.5, 0.5);

        this.animations.add('flap');
        this.animations.play('flap', 12, true);

        this.alive = false;

        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;

        this.flapSound = this.game.add.audio('flap');
        this.checkWorldBounds = true;
    }

    update() {
        if (!this.alive) {
            return;
        }

        if (this.angle < 90 && this.alive) {
            this.angle += 2.5;
        }
    }

    flap() {
        if (!this.alive) {
            return;
        }

        this.flapSound.play();
        this.body.velocity.y = -400;

        this.game.add.tween(this).to({ angle: -40 }, 100).start();
    }
} 