
window.onload = () => {
    var game = new Phaser.Game(768, 1280, Phaser.AUTO, 'game-div');

    game.state.add('boot', new Boot());
    game.state.add('preload', new Preload());
    game.state.add('play', new Play());

    game.state.start('boot');
};
