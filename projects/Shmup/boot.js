/// <reference path="./typings/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot(game) {
            _super.call(this);
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            if (this.game.device.desktop) {
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            //this.scale.pageAlignHorizontally = true;
            //this.scale.pageAlignVertically = true;
        };
        Boot.prototype.preload = function () {
            this.load.image('preloaderBar', 'assets/preloader-bar.png');
        };
        Boot.prototype.create = function () {
            this.state.start('Preloader');
        };
        return Boot;
    })(Phaser.State);
    exports.Boot = Boot;
});
//# sourceMappingURL=boot.js.map