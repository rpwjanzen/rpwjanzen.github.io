/// <reference path="./typings/phaser.d.ts" />
define(["require", "exports"], function (require, exports) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.seaScrollSpeed = 12;
        Constants.playerSpeed = 300;
        Constants.enemyMinYVelocity = 30;
        Constants.enemyMaxYVelocity = 60;
        Constants.shooterMinVelocity = 30;
        Constants.shooterMaxVelocity = 80;
        Constants.bossYVelocity = 15;
        Constants.bossXVelocity = 200;
        Constants.bulletVelocity = 500;
        Constants.enemyBulletVelocity = 150;
        Constants.powerupVelocity = 100;
        Constants.spawnEnemyDelay = Phaser.Timer.SECOND;
        Constants.spawnShooterDelay = Phaser.Timer.SECOND * 3;
        Constants.shotDelay = Phaser.Timer.SECOND * 0.1;
        Constants.shooterShotDelay = Phaser.Timer.SECOND * 2;
        Constants.bossShotDelay = Phaser.Timer.SECOND;
        Constants.enemyHealth = 2;
        Constants.shooterHealth = 5;
        Constants.bossHealth = 500;
        Constants.bulletDamage = 1;
        Constants.crashDamage = 5;
        Constants.enemyReward = 100;
        Constants.shooterReward = 400;
        Constants.bossReward = 10000;
        Constants.powerupReward = 100;
        Constants.enemyDropRate = 0.075;
        Constants.shooterDropRate = 0.125;
        Constants.bossDropRate = 0;
        Constants.playerExtraLives = 3;
        Constants.playerGhostTime = Phaser.Timer.SECOND * 3;
        Constants.instructionExpire = Phaser.Timer.SECOND * 3;
        Constants.returnMessageDelay = Phaser.Timer.SECOND * 2;
        Constants.gameScale = 2;
        return Constants;
    })();
    exports.Constants = Constants;
});
//# sourceMappingURL=constants.js.map