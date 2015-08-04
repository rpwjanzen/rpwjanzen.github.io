window.onload = function () {
    var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn');
    var boot = new Boot();
    game.state.add('boot', boot);
    game.state.start('boot');
};
//# sourceMappingURL=game.js.map