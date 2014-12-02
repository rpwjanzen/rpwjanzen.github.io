var LoadState = (function () {
    // TODO: Load tilemap via http://examples.phaser.io/_site/view_full.html?d=loader&f=load+tilemap+json.js&t=load%20tilemap%20json
    function LoadState(game, menuState) {
        var _this = this;
        this.preload = function () {
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
