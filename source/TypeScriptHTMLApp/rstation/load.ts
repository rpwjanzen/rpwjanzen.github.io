class LoadState {
    game: Phaser.Game;
    menuState: string;

    // TODO: Load tilemap via http://examples.phaser.io/_site/view_full.html?d=loader&f=load+tilemap+json.js&t=load%20tilemap%20json
    constructor(game: Phaser.Game, menuState: string) {
        this.game = game;
        this.menuState = menuState;
    }

    preload = () => {
    }

    create = () => {
        this.game.state.start(this.menuState);
    }
};