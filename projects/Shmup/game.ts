
/// <reference path="./typings/phaser.d.ts" />
import { Constants } from "./constants";

export class Game extends Phaser.State {
  constructor(game: Phaser.Game) {
    super();
  }
  
  cursors: Phaser.CursorKeys;
  sea: Phaser.TileSprite;
  player: Phaser.Sprite;
  
  weaponLevel: number;
  speed: number;
  
  enemyPool: Phaser.Group;
  bulletPool: Phaser.Group;
  explosionPool: Phaser.Group;
  shooterPool: Phaser.Group;
  enemyBulletPool: Phaser.Group;
  powerUpPool: Phaser.Group;
  bossPool: Phaser.Group;
  
  instructions: Phaser.Text;
  scoreText: Phaser.Text;
  endText: Phaser.Text;
  returnText: Phaser.Text;
  
  nextShooterAt: number;
  shooterDelay: number;
  
  nextShotAt: number;
  shotDelay: number;
  
  nextEnemyAt: number;
  enemyDelay: number;
  
  boss: Phaser.Sprite;
  bossApproaching: boolean;
  
  lives: Phaser.Group;
  score: number;
  
  instExpire: number;
  
  explosionSFX: Phaser.Sound;
  playerExplosionSFX: Phaser.Sound;
  enemyFireSFX: Phaser.Sound;
  playerFireSFX: Phaser.Sound;
  powerUpSFX: Phaser.Sound;
  
  ghostUntil: number;
  
  showReturn: number;
  
  bossNextShotAt: number;
  
  create () {
    this.setupBackground();
    this.setupPlayer();
    this.setupEnemies();
    this.setupBullets();
    this.setupExplosions();
    this.setupPlayerIcons();
    this.setupText();
    this.setupAudio();

    this.cursors = this.input.keyboard.createCursorKeys();    
  }

  setupBackground() {
    this.sea = this.add.tileSprite(
      0,
      0,
      this.game.width,
      this.game.height,
      'sea');
    this.sea.autoScroll(0, Constants.seaScrollSpeed);
  }

  setupPlayer () {
    this.player = this.add.sprite(
      this.game.width / 2,
      this.game.height - 100,
      'player', 2);
    this.player.anchor.setTo(0.5, 0.5);
    //this.player.animations.add('fly', [0, 1, 2], 10, true);
    //this.player.animations.add('ghost', [3,0,3,1], 20, true);
    //this.player.play('fly');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.speed = Constants.playerSpeed;
    this.player.body.collideWorldBounds = true;
    
    // 20 x 20 pixel hitbox, centered a little bit higher
    // than the center
    this.player.body.setSize(40, 40, 0, -10);
    this.weaponLevel = 0;
  }

  setupEnemies () {
    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(50, 'greenEnemy', 1);
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('reward', Constants.enemyReward, false, false, 0, true);
    this.enemyPool.setAll(
      'dropRate', Constants.enemyDropRate, false, false, 0, true
    );

    // Set the animation for each sprite
    /*
    this.enemyPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
      enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {
        e.play('fly');
      });
    }, this);
    */
    
    this.nextEnemyAt = 0;
    this.enemyDelay = Constants.spawnEnemyDelay;
    
    this.shooterPool = this.add.group();
    this.shooterPool.enableBody = true;
    this.shooterPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.shooterPool.createMultiple(20, 'whiteEnemy');
    this.shooterPool.setAll('anchor.x', 0.5);
    this.shooterPool.setAll('anchor.y', 0.5);
    this.shooterPool.setAll('outOfBoundsKill', true);
    this.shooterPool.setAll('checkWorldBounds', true);
    this.shooterPool.setAll(
      'reward', Constants.shooterReward, false, false, 0, true
    );
    this.shooterPool.setAll(
      'dropRate', Constants.shooterDropRate, false, false, 0, true
    );

/*
    this.shooterPool.forEach(function (enemy) {
      enemy.animations.add('fly', [0,1,2], 20, true);
      enemy.animations.add('hit', [3,1,3,2], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {
        e.play('fly');
      });
    }, this);
*/
    this.nextShooterAt = this.time.now + Phaser.Timer.SECOND * 5;
    this.shooterDelay = Constants.spawnShooterDelay;
  
    this.bossPool = this.add.group();
    this.bossPool.enableBody = true;
    this.bossPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.bossPool.createMultiple(1, 'boss');
    this.bossPool.setAll('anchor.x', 0.5);
    this.bossPool.setAll('anchor.y', 0.5);
    this.bossPool.setAll('outOfBoundsKill', true);
    this.bossPool.setAll('checkWorldBounds', true);
    this.bossPool.setAll('reward', Constants.bossReward, false, false, 0, true);
    this.bossPool.setAll(
      'dropRate', Constants.bossDropRate, false, false, 0, true
    );
    
    /*
    // Set the animation for each sprite
    this.bossPool.forEach(function (enemy) {
      enemy.animations.add('fly', [ 0, 1, 2 ], 20, true);
      enemy.animations.add('hit', [ 3, 1, 3, 2 ], 20, false);
      enemy.events.onAnimationComplete.add(function (e) {
        e.play('fly');
      });
    }, this);
    */
    
    this.boss = this.bossPool.getTop();
    this.bossApproaching = false;
  }
  
  setupBullets () {
    this.enemyBulletPool = this.add.group();
    this.enemyBulletPool.enableBody = true;
    this.enemyBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBulletPool.createMultiple(100, 'enemyBullet');
    this.enemyBulletPool.setAll('anchor.x', 0.5);
    this.enemyBulletPool.setAll('anchor.y', 0.5);
    this.enemyBulletPool.setAll('outOfBoundsKill', true);
    this.enemyBulletPool.setAll('checkWorldBounds', true);
    this.enemyBulletPool.setAll('reward', 0, false, false, 0, true);
    
    this.bulletPool = this.add.group();
    
    // Enable physics to the whole sprite group
    this.bulletPool.enableBody = true;
    this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
    
    // Add 100 'bullet' sprites in the group.
    // By default this uses the first frame of the sprite sheet and
    // sets the initial state as non-existing (i.e. killed/dead)
    this.bulletPool.createMultiple(100, 'bullet');
    
    // Sets anchors of all sprites
    this.bulletPool.setAll('anchor.x', 0.5);
    this.bulletPool.setAll('anchor.y', 0.5);
    
    // Automatically kill the bullet sprites when they go out of bounds
    this.bulletPool.setAll('outOfBoundsKill', true);
    this.bulletPool.setAll('checkWorldBounds', true);
    
    this.nextShotAt = 0;
    this.shotDelay = Constants.shotDelay;
  }
  
  setupExplosions () {
    this.explosionPool = this.add.group();
    
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function (explosion) {
      explosion.animations.add('boom');
    }, this);
  }
  
  setupPlayerIcons() {
    this.powerUpPool = this.add.group();
    this.powerUpPool.enableBody = true;
    this.powerUpPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.powerUpPool.createMultiple(5, 'powerup1');
    this.powerUpPool.setAll('anchor.x', 0.5);
    this.powerUpPool.setAll('anchor.y', 0.5);
    this.powerUpPool.setAll('outOfBoundsKill', true);
    this.powerUpPool.setAll('checkWorldBounds', true);
    this.powerUpPool.setAll(
      'reward', Constants.powerupReward, false, false, 0, true
    );
    
    this.lives = this.add.group();
    var firstLifeIconX = this.game.width - 10 - (Constants.playerExtraLives * 10);
    for(var i = 0; i < Constants.playerExtraLives; i++) {
      var life = this.lives.create(firstLifeIconX + (10 * i), 10, 'life');
      life.anchor.setTo(0.5, 0.5);
    }
  }
  
  setupText () {
    this.instructions = this.add.text(
      this.game.width / 2,
      this.game.height - 100,
      'Use Arrow Keys to Move\n' +
      'Press Z to Fire\n' +
      'Tapping/clicking does both',
      { font: '20px monospace', fill: '#fff', align: 'center' });
      
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + Constants.instructionExpire;
    
    this.score = 0;
    this.scoreText = this.add.text(
      this.game.width / 2, 13, '' + this.score,
      { font: '20px monospace', fill: '#fff', align: 'center' }
    );
    this.scoreText.anchor.setTo(0.5, 0.5);
  }
  
  setupAudio () {
    this.sound.volume = 0.3;
    this.explosionSFX = this.add.audio('explosion');
    this.playerExplosionSFX = this.add.audio('playerExplosion');
    this.enemyFireSFX = this.add.audio('enemyFire');
    this.playerFireSFX = this.add.audio('playerFire');
    this.powerUpSFX = this.add.audio('powerUp');
  }
  
  update () {
    this.checkCollisions();
    this.spawnEnemies();
    this.enemyFire();
    this.processPlayerInput();
    this.processDelayedEffects();
  }
  
  enemyFire () {
    this.shooterPool.forEachAlive(function (enemy) {
      if (this.time.now > enemy.nextShotAt && this.enemyBulletPool.countDead() > 0) {
        var bullet = this.enemyBulletPool.getFirstExists(false);
        bullet.reset(enemy.x, enemy.y);
        
        this.physics.arcade.moveToObject(
          bullet, this.player, Constants.enemyBulletVelocity
        );
        
        var angle = this.physics.arcade.angleToXY(bullet, this.player.x, this.player.y);
        bullet.rotation = angle - (Math.PI / 2);
        
        enemy.nextShotAt = this.time.now + Constants.shooterShotDelay;
        this.enemyFireSFX.play();
      }
    }, this);
    
    if (this.bossApproaching === false && this.boss.alive &&
      this.bossNextShotAt < this.time.now &&
      this.enemyBulletPool.countDead() >= 10) {
      this.bossNextShotAt = this.time.now + Constants.bossShotDelay;
      this.enemyFireSFX.play();
      
      for (var i = 0; i < 5; i++) {
        // process 2 bullets at a time
        var leftBullet = this.enemyBulletPool.getFirstExists(false);
        leftBullet.reset(this.boss.x - 10 - i * 10, this.boss.y + 20);
        
        var rightBullet = this.enemyBulletPool.getFirstExists(false);
        rightBullet.reset(this.boss.x + 10 + i * 10, this.boss.y + 20);
        
        if (this.boss.health > Constants.bossHealth / 2) {
          // aim directly at the player
          this.physics.arcade.moveToObject(
            leftBullet, this.player, Constants.enemyBulletVelocity
          );
          var angle = this.physics.arcade.angleToXY(leftBullet, this.player.x, this.player.y);
          leftBullet.rotation = angle - (Math.PI / 2);
        
          this.physics.arcade.moveToObject(
            rightBullet, this.player, Constants.enemyBulletVelocity
          );
          angle = this.physics.arcade.angleToXY(rightBullet, this.player.x, this.player.y);
          rightBullet.rotation = angle - (Math.PI / 2);
        } else {
          // aim slightly off center of the player
          this.physics.arcade.moveToXY(
            leftBullet, this.player.x - i * 100, this.player.y,
            Constants.enemyBulletVelocity
          );
          angle = this.physics.arcade.angleToXY(leftBullet, this.player.x - i * 100, this.player.y);
          leftBullet.rotation = angle - (Math.PI / 2);
          
          this.physics.arcade.moveToXY(
            rightBullet, this.player.x + i * 100, this.player.y,
            Constants.enemyBulletVelocity
          );
          angle = this.physics.arcade.angleToXY(rightBullet, this.player.x + i * 100, this.player.y);
          rightBullet.rotation = angle - (Math.PI / 2);
        }
      }
    }
  }
  
  checkCollisions () {
    this.physics.arcade.overlap(
      this.bulletPool,
      this.enemyPool,
      this.enemyHit,
      null,
      this);
      
    this.physics.arcade.overlap(
      this.bulletPool, this.shooterPool, this.enemyHit, null, this
    );
      
    this.physics.arcade.overlap(
      this.player,
      this.enemyPool,
      this.playerHit,
      null,
      this);
      
    this.physics.arcade.overlap(
      this.player, this.shooterPool, this.playerHit, null, this
    );
    
    this.physics.arcade.overlap(
      this.player, this.enemyBulletPool, this.playerHit, null, this
    );
    
    this.physics.arcade.overlap(
      this.player, this.powerUpPool, this.playerPowerUp, null, this
    );

    if (this.bossApproaching === false) {
      this.physics.arcade.overlap(
        this.bulletPool, this.bossPool, this.enemyHit, null, this
      );
    
      this.physics.arcade.overlap(
        this.player, this.bossPool, this.playerHit, null, this
      );
    }
  }
  
  playerPowerUp (player, powerUp) {
    this.addToScore(powerUp.reward);
    powerUp.kill();
    this.powerUpSFX.play();
    if (this.weaponLevel < 5) {
      this.weaponLevel++;
    }
  }
  
  processPlayerInput() {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.speed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.speed;
    }
    
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.speed;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.speed;
    }
    
    if (this.input.activePointer.isDown &&
    this.physics.arcade.distanceToPointer(this.player) > 15) {
      this.physics.arcade.moveToPointer(
        this.player,
        this.speed);
    }
    
    if (this.input.keyboard.isDown(Phaser.Keyboard.Z) ||
      this.input.activePointer.isDown) {
      if (this.returnText && this.returnText.exists) {
        this.quitGame();
      } else {
        this.fire();
      }
    }
  }
  
  processDelayedEffects () {
    if (this.instructions.exists &&
      this.time.now > this.instExpire) {
      this.instructions.destroy();
    }
    
    if (this.ghostUntil && this.ghostUntil < this.time.now) {
      this.ghostUntil = null;
      //this.player.play('fly');
    }
    
    if (this.player.alive) { 
      if (this.player.body.velocity.x === 0) {
        this.player.frame = 2;
      } else if (this.player.body.velocity.x > 0) {
        this.player.frame = 3;
      } else if (this.player.body.velocity.x < 0) {
        this.player.frame = 1;
      }
    }
    
    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2,
        this.game.height / 2 + 20,
        'Press Z or Tap to go back to the Main Menu',
        { font: '16px sans-serif', fill: '#fff' }
      );
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = 0;
    }
    
    if (this.bossApproaching && this.boss.y >= 80) {
      this.bossApproaching = false;
      this.bossNextShotAt = 0;
      this.boss.body.velocity.y = 0;
      this.boss.body.velocity.x = Constants.bossXVelocity;
      
      // allow bouncing off world bounds
      this.boss.body.bounce.x = 1;
      this.boss.body.collideWorldBounds = true;
    }
  }

  spawnEnemies () {
    if (this.nextEnemyAt < this.time.now &&
      this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      
      var enemy = this.enemyPool.getFirstExists(false);
      
      // spawn at a random location top of the screen
      enemy.reset(
        this.rnd.integerInRange(20, this.game.width - 20),
        0, Constants.enemyHealth);
      
      // also randomize the speed
      enemy.body.velocity.y = this.rnd.integerInRange(
        Constants.enemyMinYVelocity, 
        Constants.enemyMaxYVelocity);
      //enemy.play('fly');
    }
      
    if (this.nextShooterAt < this.time.now && this.shooterPool.countDead() > 0) {
      this.nextShooterAt = this.time.now + this.shooterDelay;
      
      var shooter = this.shooterPool.getFirstExists(false);
      // spawn at a random location at the top
      shooter.reset(
        this.rnd.integerInRange(20, this.game.width - 20), 0,
        Constants.shooterHealth
      );

      // choose a random target location at the bottom
      var target = this.rnd.integerInRange(20, this.game.width - 20);
      // move to target and rotate the sprite accordingly
      shooter.rotation = this.physics.arcade.moveToXY(
        shooter,
        target,
        this.game.height,
        this.rnd.integerInRange(
          Constants.shooterMinVelocity,
          Constants.shooterMaxVelocity)) - Math.PI / 2;
      //shooter.play('fly');
      // each shooter has their own shot timer
      shooter.nextShotAt = 0;
    }
  }
   
  explode (sprite) {
    if (this.explosionPool.countDead() === 0) {
      return;
    }
    
    var explosion = this.explosionPool.getFirstExists(false);
    explosion.reset(sprite.x, sprite.y);
    explosion.play('boom', 15, false, true);
    
    // add the original sprite's velocity to the explosion
    explosion.body.velocity.x = sprite.body.velocity.x;
    explosion.body.velocity.y = sprite.body.velocity.y;
  }

  playerHit(player, enemy) {
    if (this.ghostUntil && this.ghostUntil > this.time.now) {
      return;
    }
    
    this.playerExplosionSFX.play();
    
    this.damageEnemy(enemy, Constants.crashDamage);
    
    var life = this.lives.getFirstAlive();
    if (life !== null) {
      life.kill();
      this.weaponLevel = 0;
      this.ghostUntil = this.time.now + Constants.playerGhostTime;
      //this.player.play('ghost');
    } else {
      this.explode(player);
      player.kill();
      this.displayEnd(false);
    }
  }
  
  enemyHit (bullet, enemy) {
    bullet.kill();
    this.damageEnemy(enemy, Constants.bulletDamage);
  }

  damageEnemy(enemy, damage) {
    enemy.damage(damage);
    
    if(enemy.alive) {
      enemy.play('hit');
    } else {
      this.explode(enemy);
      this.explosionSFX.play();
      this.spawnPowerUp(enemy);
      this.addToScore(enemy.reward);
      
      // We check the sprite key (e.g. 'greenEnemy') to see if the sprite is a boss
      // For full games, it would be better to set flags on the sprites themselves
      if (enemy.key === 'boss') {
        this.enemyPool.destroy();
        this.shooterPool.destroy();
        this.bossPool.destroy();
        this.enemyBulletPool.destroy();
        this.displayEnd(true);
      }  
    }
  }
  
  spawnPowerUp (enemy) {
    if (this.powerUpPool.countDead() === 0 || this.weaponLevel === 5) {
      return;
    }

    if (this.rnd.frac() < enemy.dropRate) {
      var powerUp = this.powerUpPool.getFirstExists(false);
      powerUp.reset(enemy.x, enemy.y);
      powerUp.body.velocity.y = Constants.powerupVelocity;
    }
  }

  spawnBoss () {
    this.bossApproaching = true;
    this.boss.reset(this.game.width / 2, -80, Constants.bossHealth);
    this.physics.enable(this.boss, Phaser.Physics.ARCADE);
    this.boss.body.velocity.y = Constants.bossYVelocity;
    //this.boss.play('fly');
  }

  addToScore(score) {
    this.score += score;
    this.scoreText.text = this.score.toFixed();

    
    if (this.score >= 10000 &&
      // this approach prevents the boss from spawning again upon winning
      this.bossPool.countDead() == 1) {
      this.spawnBoss();
    }
  }

  fire () {
    if (!this.player.alive || this.nextShotAt > this.time.now) {
      return;
    }
    
    this.nextShotAt = this.time.now + this.shotDelay;
    this.playerFireSFX.play();
    
    var bullet;
    if (this.weaponLevel === 0) {
      if (this.bulletPool.countDead() === 0) {
        return;
      }
      
      bullet = this.bulletPool.getFirstExists(false);
      bullet.reset(this.player.x, this.player.y - 20);
      bullet.body.velocity.y = -Constants.bulletVelocity;
    } else {
      if (this.bulletPool.countDead() < this.weaponLevel * 2) {
        return;
      }
      
      for (var i = 0; i < this.weaponLevel; i++) {
        bullet = this.bulletPool.getFirstExists(false);
        
        // spawn left bullet slightly left off center
        bullet.reset(this.player.x - (10 + i * 6), this.player.y - 20);
        
        // the left bullets spread from -95 degrees to -135 degrees
        this.physics.arcade.velocityFromAngle(
          -95 - i * 10, Constants.bulletVelocity, bullet.body.velocity
        );
        
        bullet = this.bulletPool.getFirstExists(false);
        
        // spawn right bullet slightly right off center
        bullet.reset(this.player.x + (10 + i * 6), this.player.y - 20);
        
        // the right bullets spread from -85 degrees to -45
        this.physics.arcade.velocityFromAngle(
          -85 + i * 10, Constants.bulletVelocity, bullet.body.velocity
        );
      }
    }
  }
  
  displayEnd(win) {
    if(this.endText && this.endText.exists) {
      return;
    }
    
    var msg = win ? 'You Win!!!' : 'Game Over';
    this.endText = this.add.text(
      this.game.width / 2,
      this.game.height / 2 - 60,
      msg,
      { font: '60px serif', fill: '#fff' }
    );
    
    this.endText.anchor.setTo(0.5, 0);
    this.showReturn = this.time.now + Constants.returnMessageDelay;
  }

/*
  render () {
    if (this.boss.alive) {
      this.game.debug.body(this.boss);
    }
    
    this.enemyPool.forEachAlive(function (enemy) {
      this.game.debug.body(enemy);
    }, this);
    
    this.shooterPool.forEachAlive(function (enemy) {
      this.game.debug.body(enemy);
    }, this);
  }
  */
  
  quitGame () {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    this.sea.destroy();
    this.player.destroy();
    this.enemyPool.destroy();
    this.bulletPool.destroy();
    this.explosionPool.destroy();
    this.shooterPool.destroy();
    this.enemyBulletPool.destroy();
    this.powerUpPool.destroy();
    this.bossPool.destroy();
    this.instructions.destroy();
    this.scoreText.destroy();
    this.endText.destroy();
    this.returnText.destroy();

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');
  }
}