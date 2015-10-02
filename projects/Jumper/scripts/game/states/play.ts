class Play extends Phaser.State {
    player: Phaser.Sprite

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.add.sprite(9, 12, 'spacefox');
    }

    update() {
    }
}