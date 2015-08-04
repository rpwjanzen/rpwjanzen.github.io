class Play extends Phaser.State {
    background: Phaser.Sprite;
    bird: Bird;
    ground: Ground;
    pipeGenerator: Phaser.TimerEvent;
    pipes: Phaser.Group;
    instructionGroup: Phaser.Group;
    flapKey: Phaser.Key;
    score: number;
    scoreText: Phaser.BitmapText;
    scoreSound: Phaser.Sound;
    scoreboard: Scoreboard;

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1200;
        this.game.time.desiredFps = 30;

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
    }

    update() {
        if (!this.bird.alive) {
            return;
        }

        this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

        this.pipes.forEach(pipeGroup => {
            this.checkScore(pipeGroup);
            this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
        }, this);
    }

    generatePipes() {
        var pipeY = this.game.rnd.integerInRange(-100, 100);
        var pipeGroup : PipeGroup = this.pipes.getFirstExists(false);
        if (!pipeGroup) {
            pipeGroup = new PipeGroup(this.game, this.pipes);
        }
        pipeGroup.reset(this.game.width + pipeGroup.width / 2, pipeY);
    }

    deathHandler() {
        this.bird.kill();

        this.pipes.callAll('stop', null);
        this.pipeGenerator.timer.stop();

        this.ground.stopScroll();

        this.scoreboard = new Scoreboard(this.game);
        this.game.add.existing(this.scoreboard);

        this.scoreboard.show(this.score);
    }

    startGame() {
        this.bird.body.allowGravity = true;
        this.bird.alive = true;
        this.bird.exists = true;

        this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
        this.pipeGenerator.timer.start();
        
        this.instructionGroup.destroy();

        this.scoreText.visible = true;
    }

    shutdown() {
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);

        this.bird.destroy();
        this.pipes.destroy();
        this.scoreboard.destroy();
    }

    checkScore(pipeGroup: PipeGroup) {
        if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
            pipeGroup.hasScored = true;
            this.score++;
            this.scoreText.setText(this.score.toString());
            this.scoreSound.play();
        }
    }
}