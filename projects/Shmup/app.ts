/// <reference path="./typings/phaser.d.ts" />

import { Boot } from "./boot";
import { MainMenu } from "./mainMenu";
import { Preloader } from "./preloader";
import { Game } from "./game";

export class App {
  constructor() {
  }
  
  start() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

    game.state.add('Boot', new Boot(game));
    game.state.add('Preloader', new Preloader(game));
    game.state.add('MainMenu', new MainMenu(game));
    game.state.add('Game', new Game(game));

    game.state.start('Boot');
  }
};
