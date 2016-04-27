/// <reference path="./typings/phaser.d.ts" />

export class Constants {
  static seaScrollSpeed = 12;
  static playerSpeed = 300;
  static enemyMinYVelocity = 30;
  static enemyMaxYVelocity = 60;
  static shooterMinVelocity = 30;
  static shooterMaxVelocity = 80;
  static bossYVelocity = 15;
  static bossXVelocity = 100;
  static bulletVelocity = 500;
  static enemyBulletVelocity = 150;
  static powerupVelocity = 100;

  static spawnEnemyDelay = Phaser.Timer.SECOND;
  static spawnShooterDelay = Phaser.Timer.SECOND * 3;

  static shotDelay = Phaser.Timer.SECOND * 0.1;
  static shooterShotDelay = Phaser.Timer.SECOND * 2;
  static bossShotDelay = Phaser.Timer.SECOND;

  static enemyHealth = 2;
  static shooterHealth = 5;
  static bossHealth = 500;

  static bulletDamage = 1;
  static crashDamage = 5;

  static enemyReward = 100;
  static shooterReward = 400;
  static bossReward = 10000;
  static powerupReward = 100;

  static enemyDropRate = 0.075;
  static shooterDropRate = 0.125;
  static bossDropRate = 0;

  static playerExtraLives = 3;
  static playerGhostTime = Phaser.Timer.SECOND * 3;

  static instructionExpire = Phaser.Timer.SECOND * 3;
  static returnMessageDelay = Phaser.Timer.SECOND * 2
  
  static gameScale = 2;
}