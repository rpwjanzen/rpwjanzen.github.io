var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Preload = (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        _super.call(this);
        this.sprite = null;
        this.ready = false;
    }
    Preload.prototype.preload = function () {
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.sprite = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.sprite);
        this.load.image('background', '~/assets/background.png');
        this.load.image('ground', '~/assets/ground.png');
        this.load.image('title', '~/assets/title.png');
        this.load.image('startButton', '~/assets/start-button.png');
        this.load.spritesheet('bird', '~/assets/bird.png', 34, 24, 3);
    };
    Preload.prototype.create = function () {
        //this.sprite.cropEnabled = false;
    };
    Preload.prototype.update = function () {
        if (this.ready) {
            this.game.state.start('menu');
        }
    };
    Preload.prototype.onLoadComplete = function () {
        this.ready = true;
    };
    return Preload;
})(Phaser.State);
//# sourceMappingURL=preload.js.map