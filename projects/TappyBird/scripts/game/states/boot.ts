class Boot extends Phaser.State {
    preload() {
        this.load.image('preloader', 'assets/preloader.gif', true);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    create() {
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    }
}