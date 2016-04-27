/// <reference path="./typings/phaser.d.ts" />
define(["require", "exports", "./boot", "./mainMenu", "./preloader", "./game"], function (require, exports, boot_1, mainMenu_1, preloader_1, game_1) {
    var App = (function () {
        function App() {
        }
        App.prototype.start = function () {
            //var w = window.innerWidth * window.devicePixelRatio;
            //var h = window.innerHeight * window.devicePixelRatio;
            //var game = new Phaser.Game(640, 960, Phaser.AUTO, 'gameContainer');
            var game = new Phaser.Game(320, 480, Phaser.AUTO, 'gameContainer');
            game.state.add('Boot', new boot_1.Boot(game));
            game.state.add('Preloader', new preloader_1.Preloader(game));
            game.state.add('MainMenu', new mainMenu_1.MainMenu(game));
            game.state.add('Game', new game_1.Game(game));
            game.state.start('Boot');
        };
        return App;
    })();
    exports.App = App;
    ;
});
//# sourceMappingURL=app.js.map