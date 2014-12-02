class PlayState {
    game: Phaser.Game;
    menuState: string;
    globalState: GlobalState;

    constructor(game: Phaser.Game, menuState: string, globalState: GlobalState) {
        this.game = game;
        this.menuState = menuState;
        this.globalState = globalState;
    }

    create = () => {
    }

    update = () => {
    }
}
