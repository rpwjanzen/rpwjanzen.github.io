class Boot extends Phaser.State {
    preload() {
        this.load.image('preloader', 'assets/preloader.gif', true);
    }

    create() {
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    }
}