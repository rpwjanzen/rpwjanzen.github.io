window.onload = () => {
    var globalState = new GlobalState();

    var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');
    var loadState = new LoadState(game, 'menu');
    var menuState = new MenuState(game, 'play', globalState);
    var playState = new PlayState(game, 'menu', globalState);

    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);

    game.state.start('load');
}; 