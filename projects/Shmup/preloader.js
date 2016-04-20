/// <reference path="./typings/phaser.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader(game) {
            _super.call(this);
            this.background = null;
            this.preloadBar = null;
        }
        Preloader.prototype.preload = function () {
            //  Show the loading progress bar asset we loaded in boot.js
            this.stage.backgroundColor = '#2d2d2d';
            this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
            this.add.text(this.game.width / 2, this.game.height / 2 - 30, "Loading...", {
                font: "32px monospace",
                fill: "#fff"
            }).anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('titlepage', 'assets/titlepage.png');
            this.load.image('sea', 'assets/sea.png');
            this.load.image('bullet', 'assets/bullet.png');
            this.load.image('enemyBullet', 'assets/enemy-bullet.png');
            this.load.image('powerup1', 'assets/powerup1.png');
            this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
            this.load.spritesheet('whiteEnemy', 'assets/shooting-enemy.png', 32, 32);
            this.load.spritesheet('boss', 'assets/boss.png', 93, 75);
            this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
            this.load.spritesheet('player', 'assets/player.png', 64, 64);
            this.load.audio('explosion', ['assets/explosion.ogg', 'assets/explosion.wav']);
            this.load.audio('playerExplosion', ['assets/player-explosion.ogg', 'assets/player-explosion.wav']);
            this.load.audio('enemyFire', ['assets/enemy-fire.ogg', 'assets/enemy-fire.wav']);
            this.load.audio('playerFire', ['assets/player-fire.ogg', 'assets/player-fire.wav']);
            this.load.audio('powerUp', ['assets/powerup.ogg', 'assets/powerup.wav']);
        };
        Preloader.prototype.create = function () {
            this.preloadBar.cropEnabled = false;
        };
        Preloader.prototype.update = function () {
            this.state.start('MainMenu');
        };
        return Preloader;
    })(Phaser.State);
    exports.Preloader = Preloader;
});
//# sourceMappingURL=preloader.js.map