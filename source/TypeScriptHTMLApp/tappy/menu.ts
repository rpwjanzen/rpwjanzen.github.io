class MenuState {
    game: Phaser.Game;
    playState: string;
    globalState: GlobalState;

    constructor(game: Phaser.Game, playState: string, globalState: GlobalState) {
        this.game = game;
        this.playState = playState;
        this.globalState = globalState;
    }

    create = () => {
        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        // Defining variables
        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = this.game.world.width / 2, y = this.game.world.height / 2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y - 50, "Press space/click/tap to start", style);
        text.anchor.set(0.5, 0.5);

        // If the user already played
        if (this.globalState.score > 0) {
            // Display its score
            var score_label = this.game.add.text(x, y + 50, "score: " + this.globalState.score, style);
            score_label.anchor.set(0.5, 0.5);
        }
    }

    start = () => {
        this.globalState.score = 0;
        this.game.state.start(this.playState);
    }

    update = () => {
        // touch support
        if (this.game.input.activePointer.isDown) {
            this.start();
        }
    }
} 