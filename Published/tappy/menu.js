var MenuState = (function () {
    function MenuState(game, playState, globalState) {
        var _this = this;
        this.create = function () {
            // Call the 'start' function when pressing the spacebar
            var space_key = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            space_key.onDown.add(_this.start, _this);

            // Defining variables
            var style = { font: "30px Arial", fill: "#ffffff" };
            var x = _this.game.world.width / 2, y = _this.game.world.height / 2;

            // Adding a text centered on the screen
            var text = _this.game.add.text(x, y - 50, "Press space/click/tap to start", style);
            text.anchor.set(0.5, 0.5);

            // If the user already played
            if (_this.globalState.score > 0) {
                // Display its score
                var score_label = _this.game.add.text(x, y + 50, "score: " + _this.globalState.score, style);
                score_label.anchor.set(0.5, 0.5);
            }
        };
        this.start = function () {
            _this.globalState.score = 0;
            _this.game.state.start(_this.playState);
        };
        this.update = function () {
            // touch support
            if (_this.game.input.activePointer.isDown) {
                _this.start();
            }
        };
        this.game = game;
        this.playState = playState;
        this.globalState = globalState;
    }
    return MenuState;
})();
//# sourceMappingURL=menu.js.map
