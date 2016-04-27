/// <reference path="./typings/phaser.d.ts" />

export class Preloader extends Phaser.State {
  background: any = null;
  preloadBar: any = null;
  
  constructor(game: Phaser.Game) {
    super();
  }
  
  preload () {
    //  Show the loading progress bar asset we loaded in boot.js
    this.stage.backgroundColor = '#2d2d2d';

    this.preloadBar = this.add.sprite(
      this.game.width / 2 - 100,
      this.game.height / 2,
      'preloaderBar');
      
    this.add.text(
      this.game.width / 2,
      this.game.height / 2 - 30,
      "Loading...", {
        font: "32px monospace",
        fill: "#fff"
      }).anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('title', 'assets/tyrian/title.png');
    this.load.image('sea', 'assets/tyrian/sea.png');
    this.load.image('bullet', 'assets/tyrian/bullet.png');
    this.load.image('enemyBullet', 'assets/tyrian/enemy-bullet.png');
    this.load.image('powerup1', 'assets/tyrian/powerup1.png');
    this.load.spritesheet('greenEnemy', 'assets/tyrian/greenEnemy.png', 38, 50);
    this.load.spritesheet('whiteEnemy', 'assets/tyrian/shooting-enemy.png', 48, 52);
    this.load.spritesheet('boss', 'assets/tyrian/boss.png', 186, 160);
    this.load.spritesheet('explosion', 'assets/tyrian/explosion.png', 64, 64);
    this.load.spritesheet('player', 'assets/tyrian/player.png', 48, 56);
    this.load.spritesheet('life', 'assets/tyrian/life.png', 22, 30);
    this.load.audio('explosion', ['assets/explosion.ogg', 'assets/explosion.wav']);
    this.load.audio('playerExplosion', ['assets/player-explosion.ogg', 'assets/player-explosion.wav']);
    this.load.audio('enemyFire', ['assets/enemy-fire.ogg', 'assets/enemy-fire.wav']);
    this.load.audio('playerFire', ['assets/player-fire.ogg', 'assets/player-fire.wav']);
    this.load.audio('powerUp', ['assets/powerup.ogg', 'assets/powerup.wav']);
  }

  create () {
    this.preloadBar.cropEnabled = false;
  }

  update() {
    this.state.start('MainMenu');
  }
}