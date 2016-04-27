/// <reference path="./typings/phaser.d.ts" />

export class Boot extends Phaser.State {
  constructor(game: Phaser.Game) {
    super();
  }
  
  init() {
    this.input.maxPointers = 1;

    if (this.game.device.desktop) {
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //this.scale.setMinMax(480, 260, 1024, 768);
      //this.scale.forceLandscape = true;
    }
    
    //this.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;
  }

  preload () {
    this.load.image('preloaderBar', 'assets/preloader-bar.png');
  }

  create () {
    this.state.start('Preloader');
  }
}