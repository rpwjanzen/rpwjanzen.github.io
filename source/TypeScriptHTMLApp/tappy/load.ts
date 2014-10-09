class LoadState {
    game: Phaser.Game;
    menuState: string;

    constructor(game: Phaser.Game, menuState: string) {
        this.game = game;
        this.menuState = menuState;
    }

    preload = () => {
        this.game.load.image('bird', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');
    }

    create = () => {
        this.game.state.start(this.menuState);
    }
};