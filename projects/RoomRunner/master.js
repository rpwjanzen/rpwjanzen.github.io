window.onload = function () {
    var game = new Phaser.Game(640, 360, Phaser.AUTO, 'game-div');
    game.state.add('boot', new Boot());
    game.state.add('preload', new Preload());
    game.state.add('play', new Play());
    game.state.start('boot');
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Chest = (function (_super) {
    __extends(Chest, _super);
    function Chest(game, x, y, frame) {
        _super.call(this, game, x, y, 'chest', frame);
        this.anchor.setTo(0.5, 0.5);
        this.alive = true;
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
    }
    return Chest;
})(Phaser.Sprite);
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game, x, y, frame) {
        _super.call(this, game, x, y, 'enemy', frame);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.body.velocity.y = 100;
    }
    Enemy.prototype.update = function () {
        if (this.y <= 0) {
            this.body.velocity.y = Math.abs(this.body.velocity.y);
        }
        if (this.y >= this.game.height) {
            this.body.velocity.y = -Math.abs(this.body.velocity.y);
        }
    };
    return Enemy;
})(Phaser.Sprite);
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(game, x, y, frame) {
        _super.call(this, game, x, y, 'hero', frame);
        this.anchor.setTo(0.5, 0.5);
        this.alive = true;
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
    }
    Hero.prototype.moveUp = function () {
        this.body.velocity.y = -150;
    };
    Hero.prototype.moveDown = function () {
        this.body.velocity.y = 150;
    };
    Hero.prototype.moveRight = function () {
        this.body.velocity.x = 150;
    };
    Hero.prototype.moveLeft = function () {
        this.body.velocity.x = -150;
    };
    return Hero;
})(Phaser.Sprite);
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        _super.apply(this, arguments);
    }
    Boot.prototype.preload = function () {
        this.load.image('preloader', 'assets/preloader.gif', true);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    };
    Boot.prototype.create = function () {
        this.game.state.start('preload');
    };
    return Boot;
})(Phaser.State);
var Play = (function (_super) {
    __extends(Play, _super);
    function Play() {
        _super.apply(this, arguments);
    }
    Play.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.floor = this.game.add.sprite(0, 0, 'floor');
        this.chest = new Chest(this.game, 580, this.game.height / 2);
        this.game.add.existing(this.chest);
        this.hero = new Hero(this.game, 50, this.game.height / 2);
        this.game.add.existing(this.hero);
        this.hero.events.onOutOfBounds.add(this.deathHandler, this);
        this.enemies = [];
        var enemy0 = new Enemy(this.game, 250, this.game.height / 2);
        this.game.add.existing(enemy0);
        this.enemies.push(enemy0);
        var enemy1 = new Enemy(this.game, 375, this.game.height / 2);
        this.game.add.existing(enemy1);
        this.enemies.push(enemy1);
        var enemy2 = new Enemy(this.game, 500, this.game.height / 2);
        this.game.add.existing(enemy2);
        this.enemies.push(enemy2);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    };
    Play.prototype.update = function () {
        if (!this.hero.alive) {
            return;
        }
        this.hero.body.velocity.x = 0;
        this.hero.body.velocity.y = 0;
        if (this.cursors.up.isDown) {
            this.hero.moveUp();
        }
        if (this.cursors.down.isDown) {
            this.hero.moveDown();
        }
        if (this.cursors.right.isDown) {
            this.hero.moveRight();
        }
        if (this.cursors.left.isDown) {
            this.hero.moveLeft();
        }
        this.game.physics.arcade.collide(this.hero, this.chest, this.deathHandler, null, this);
        this.game.physics.arcade.collide(this.hero, this.enemies[0], this.deathHandler, null, this);
        this.game.physics.arcade.collide(this.hero, this.enemies[1], this.deathHandler, null, this);
        this.game.physics.arcade.collide(this.hero, this.enemies[2], this.deathHandler, null, this);
    };
    Play.prototype.deathHandler = function () {
        this.hero.kill();
    };
    Play.prototype.startGame = function () {
        this.hero.alive = true;
        this.hero.exists = true;
    };
    Play.prototype.shutdown = function () {
        this.hero.destroy();
        this.floor.destroy();
        this.chest.destroy();
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].destroy();
        }
    };
    return Play;
})(Phaser.State);
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
        this.load.image('floor', 'assets/floor.png');
        this.load.image('chest', 'assets/chest.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('hero', 'assets/hero.png');
    };
    Preload.prototype.update = function () {
        if (this.ready) {
            this.game.state.start('play');
        }
    };
    Preload.prototype.onLoadComplete = function () {
        this.ready = true;
    };
    return Preload;
})(Phaser.State);
//# sourceMappingURL=master.js.map