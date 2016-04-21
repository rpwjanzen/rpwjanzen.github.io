/// <reference path="./typings/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu(game) {
            _super.call(this);
            this.music = null;
            this.playButton = null;
        }
        MainMenu.prototype.create = function () {
            //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //  Here all we're doing is playing some music and adding a picture and button
            //  Naturally I expect you to do something significantly better :)
            var titleImage = this.add.sprite(this.game.width / 2, 5, 'title');
            titleImage.anchor.setTo(0.5, 0);
            this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "Press Z or tap/click game to start", { font: "12px monospace", fill: "#fff" });
            this.loadingText.anchor.setTo(0.5, 0.5);
            this.add.text(this.game.width / 2, this.game.height - 90, "image assets courtesy of Daniel Cook", { font: "10px monospace", fill: "#fff", align: "center" }).anchor.setTo(0.5, 0.5);
            this.add.text(this.game.width / 2, this.game.height - 75, "sound assets Copyright (c) 2012 - 2013 Devin Watson", { font: "10px monospace", fill: "#fff", align: "center" }).anchor.setTo(0.5, 0.5);
        };
        MainMenu.prototype.update = function () {
            if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
                this.startGame();
            }
        };
        MainMenu.prototype.startGame = function () {
            this.state.start('Game');
        };
        return MainMenu;
    })(Phaser.State);
    exports.MainMenu = MainMenu;
});
//# sourceMappingURL=mainMenu.js.map