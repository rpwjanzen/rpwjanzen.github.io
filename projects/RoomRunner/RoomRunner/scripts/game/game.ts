
window.onload = () => {
    var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn');

    game.state.add('boot', new Boot());
    game.state.add('preload', new Preload());
    game.state.add('menu', new Menu());
    game.state.add('play', new Play());

    game.state.start('boot');
};
