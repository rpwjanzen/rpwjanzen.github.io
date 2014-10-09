var LoadState = (function () {
    function LoadState(game, menuState) {
        var _this = this;
        this.preload = function () {
            _this.game.load.image('bird', 'assets/bird.png');
            _this.game.load.image('pipe', 'assets/pipe.png');
        };
        this.create = function () {
            _this.game.state.start(_this.menuState);
        };
        this.game = game;
        this.menuState = menuState;
    }
    return LoadState;
})();
;
//# sourceMappingURL=load.js.map
