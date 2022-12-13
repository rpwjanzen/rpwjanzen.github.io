
window.onload = () => {
    var game = new Phaser.Game(640, 360, Phaser.AUTO, 'game-div');

    game.state.add('boot', new Boot());
    game.state.add('preload', new Preload());
    game.state.add('play', new Play());

    game.state.start('boot');
};
