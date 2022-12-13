window.onload = function () {
    var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn');
    game.state.add('boot', new Boot());
    game.state.add('preload', new Preload());
    game.state.add('menu', new Menu());
    game.state.add('play', new Play());
    game.state.start('boot');
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird(game, x, y, frame) {
        _super.call(this, game, x, y, 'bird', frame);
        this.anchor.setTo(0.5, 0.5);
        this.animations.add('flap');
        this.animations.play('flap', 12, true);
        this.alive = false;
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.flapSound = this.game.add.audio('flap');
        this.checkWorldBounds = true;
    }
    Bird.prototype.update = function () {
        if (!this.alive) {
            return;
        }
        if (this.angle < 90 && this.alive) {
            this.angle += 2.5;
        }
    };
    Bird.prototype.flap = function () {
        if (!this.alive) {
            return;
        }
        this.flapSound.play();
        this.body.velocity.y = -400;
        this.game.add.tween(this).to({ angle: -40 }, 100).start();
    };
    return Bird;
})(Phaser.Sprite);
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(game, x, y, width, height, frame) {
        _super.call(this, game, x, y, width, height, 'ground', frame);
        this.autoScroll(-200, 0);
        this.game.physics.arcade.enableBody(this);
        // HACK
        this.physicsType = Phaser.SPRITE;
        this.body.allowGravity = false;
        this.body.immovable = true;
    }
    Ground.prototype.update = function () {
    };
    return Ground;
})(Phaser.TileSprite);
var Pipe = (function (_super) {
    __extends(Pipe, _super);
    function Pipe(game, x, y, frame) {
        _super.call(this, game, x, y, 'pipe', frame);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
    }
    return Pipe;
})(Phaser.Sprite);
var PipeGroup = (function (_super) {
    __extends(PipeGroup, _super);
    function PipeGroup(game, parent) {
        _super.call(this, game, parent);
        this.topPipe = new Pipe(this.game, 0, 0, 0);
        this.add(this.topPipe);
        this.bottomPipe = new Pipe(this.game, 0, 440, 1);
        this.add(this.bottomPipe);
        this.hasScored = false;
        this.topPipe.body.velocity.x = -200;
        this.bottomPipe.body.velocity.x = -200;
    }
    PipeGroup.prototype.reset = function (x, y) {
        this.topPipe.reset(0, 0);
        this.bottomPipe.reset(0, 440);
        this.x = x;
        this.y = y;
        // magic
        this.setAll('body.velocity.x', -200);
        this.hasScored = false;
        this.exists = true;
    };
    PipeGroup.prototype.checkWorldBounds = function () {
        if (!this.topPipe.inWorld) {
            this.exists = false;
        }
    };
    PipeGroup.prototype.update = function () {
        this.checkWorldBounds();
    };
    return PipeGroup;
})(Phaser.Group);
var Scoreboard = (function (_super) {
    __extends(Scoreboard, _super);
    function Scoreboard(game) {
        _super.call(this, game);
        var gameover = this.create(this.game.width / 2, 100, 'gameover');
        gameover.anchor.setTo(0.5, 0.5);
        this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);
        this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
        this.add(this.scoreText);
        this.bestScoreText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyfont', '', 18);
        this.add(this.bestScoreText);
        this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5, 0.5);
        this.add(this.startButton);
        this.y = this.game.height;
        this.x = 0;
    }
    Scoreboard.prototype.show = function (score) {
        var bestScoreText, medal;
        this.scoreText.setText(score.toString());
        if (localStorage) {
            var value = localStorage.getItem('bestScore');
            var bestScore = parseInt(value);
            if (bestScore < score) {
                bestScoreText = bestScore.toString();
                localStorage.setItem('bestScore', bestScoreText);
            }
            else if (isNaN(bestScore)) {
                bestScoreText = "N/A";
            }
            else {
                bestScoreText = bestScore.toString();
            }
        }
        else {
            // Fallback. LocalStorage isn't available
            bestScoreText = 'N/A';
        }
        this.bestScoreText.setText(bestScoreText);
        if (score >= 10 && score < 20) {
            medal = this.game.add.sprite(-65, 7, 'medals', 1);
            medal.anchor.setTo(0.5, 0.5);
            this.scoreboard.addChild(medal);
        }
        else if (score >= 20) {
            medal = this.game.add.sprite(-65, 7, 'medals', 0);
            medal.anchor.setTo(0.5, 0.5);
            this.scoreboard.addChild(medal);
        }
        if (medal) {
            var emitter = this.game.add.emitter(medal.x, medal.y, 400);
            this.scoreboard.addChild(emitter);
            emitter.width = medal.width;
            emitter.height = medal.height;
            emitter.makeParticles('particle');
            emitter.setRotation(-100, 100);
            emitter.setXSpeed(0, 0);
            emitter.setYSpeed(0, 0);
            emitter.minParticleScale = 0.25;
            emitter.maxParticleScale = 0.5;
            emitter.setAll('body.allowGravity', false);
            emitter.start(false, 1000, 1000);
        }
        this.game.add.tween(this).to({ y: 0 }, 1000, Phaser.Easing.Bounce.Out, true);
    };
    Scoreboard.prototype.startClick = function () {
        this.game.state.start('play');
    };
    return Scoreboard;
})(Phaser.Group);
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
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    };
    return Boot;
})(Phaser.State);
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
    }
    Menu.prototype.create = function () {
        this.background = this.game.add.sprite(0, 0, 'background');
        this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
        this.ground.autoScroll(-200, 0);
        this.titleGroup = this.game.add.group();
        this.title = this.game.add.sprite(0, 0, 'title');
        this.titleGroup.add(this.title);
        this.bird = this.game.add.sprite(200, 5, 'bird');
        this.titleGroup.add(this.bird);
        this.bird.animations.add('flap');
        this.bird.animations.play('flap', 12, true);
        this.titleGroup.x = 30;
        this.titleGroup.y = 100;
        this.game.add.tween(this.titleGroup).to({ y: 115 }, 350, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5, 0.5);
    };
    Menu.prototype.startClick = function () {
        this.game.state.start('play');
    };
    return Menu;
})(Phaser.State);
var Play = (function (_super) {
    __extends(Play, _super);
    function Play() {
        _super.apply(this, arguments);
    }
    Play.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1200;
        this.background = this.game.add.sprite(0, 0, 'background');
        this.bird = new Bird(this.game, 100, this.game.height / 2);
        this.game.add.existing(this.bird);
        this.pipes = this.game.add.group();
        this.ground = new Ground(this.game, 0, 400, 335, 112);
        this.game.add.existing(this.ground);
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.flapKey.onDown.addOnce(this.startGame, this);
        this.flapKey.onDown.add(this.bird.flap, this.bird);
        // mouse/touch
        this.input.onDown.addOnce(this.startGame, this);
        this.input.onDown.add(this.bird.flap, this.bird);
        this.bird.events.onOutOfBounds.add(this.deathHandler, this);
        this.instructionGroup = this.game.add.group();
        this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 100, 'getReady'));
        this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 325, 'instructions'));
        this.instructionGroup.setAll('anchor.x', 0.5);
        this.instructionGroup.setAll('anchor.y', 0.5);
        this.score = 0;
        this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'flappyfont', this.score.toString(), 24);
        this.scoreText.visible = false;
        this.scoreSound = this.game.add.audio('score');
    };
    Play.prototype.update = function () {
        var _this = this;
        if (!this.bird.alive) {
            return;
        }
        this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
        this.pipes.forEach(function (pipeGroup) {
            _this.checkScore(pipeGroup);
            _this.game.physics.arcade.collide(_this.bird, pipeGroup, _this.deathHandler, null, _this);
        }, this);
    };
    Play.prototype.generatePipes = function () {
        var pipeY = this.game.rnd.integerInRange(-100, 100);
        var pipeGroup = this.pipes.getFirstExists(false);
        if (!pipeGroup) {
            pipeGroup = new PipeGroup(this.game, this.pipes);
        }
        pipeGroup.reset(this.game.width + pipeGroup.width / 2, pipeY);
    };
    Play.prototype.deathHandler = function () {
        this.bird.kill();
        this.pipes.callAll('stop', null);
        this.pipeGenerator.timer.stop();
        this.ground.stopScroll();
        this.scoreboard = new Scoreboard(this.game);
        this.game.add.existing(this.scoreboard);
        this.scoreboard.show(this.score);
    };
    Play.prototype.startGame = function () {
        this.bird.body.allowGravity = true;
        this.bird.alive = true;
        this.bird.exists = true;
        this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
        this.pipeGenerator.timer.start();
        this.instructionGroup.destroy();
        this.scoreText.visible = true;
    };
    Play.prototype.shutdown = function () {
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        this.bird.destroy();
        this.pipes.destroy();
        this.scoreboard.destroy();
    };
    Play.prototype.checkScore = function (pipeGroup) {
        if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
            pipeGroup.hasScored = true;
            this.score++;
            this.scoreText.setText(this.score.toString());
            this.scoreSound.play();
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
        this.load.image('background', 'assets/background.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('startButton', 'assets/start-button.png');
        this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
        this.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);
        this.load.image('instructions', 'assets/instructions.png');
        this.load.image('getReady', 'assets/get-ready.png');
        this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');
        this.load.audio('score', 'assets/score.wav');
        this.load.audio('flap', 'assets/flap.wav');
        this.load.audio('pipeHit', 'assets/pipe-hit.wav');
        this.load.audio('groundHit', 'assets/ground-hit.wav');
        this.load.image('scoreboard', 'assets/scoreboard.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.spritesheet('medals', 'assets/medals.png', 44, 46, 2);
        this.load.image('particle', 'assets/particle.png');
    };
    Preload.prototype.update = function () {
        if (this.ready) {
            this.game.state.start('menu');
        }
    };
    Preload.prototype.onLoadComplete = function () {
        this.ready = true;
    };
    return Preload;
})(Phaser.State);
//# sourceMappingURL=master.js.map