/// <reference path="./typings/phaser.d.ts" />

export class MainMenu extends Phaser.State {
  music: any = null;
  playButton: any = null;
  loadingText: Phaser.Text;
  
  constructor(game: Phaser.Game) {
    super();
  }
  
  create() {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    var titleImage = this.add.sprite(
      this.game.width / 2,
      5,
      'title');
    titleImage.anchor.setTo(0.5, 0);

    this.loadingText = this.add.text(
      this.game.width / 2,
      this.game.height / 2 + 80,
      "Press Z or tap/click game to start",
      { font: "12px monospace", fill: "#fff" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    
    this.add.text(
      this.game.width / 2,
      this.game.height - 90,
      "image assets courtesy of Daniel Cook",
      { font: "10px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);
      
    this.add.text(
      this.game.width / 2,
      this.game.height - 75,
      "sound assets Copyright (c) 2012 - 2013 Devin Watson",
      { font: "10px monospace", fill: "#fff", align: "center"}).anchor.setTo(0.5, 0.5);

  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
      this.startGame();
    }
  }

  startGame () {
    this.state.start('Game');
  }
}