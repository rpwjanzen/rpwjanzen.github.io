class PlayState {
    game: Phaser.Game;
    menuState: string;
    globalState: GlobalState;

    labelScore: Phaser.Text;
    bird: Phaser.Sprite;
    pipes: Phaser.Group;
    timer: Phaser.TimerEvent;
    touched: boolean;

    constructor(game: Phaser.Game, menuState: string, globalState: GlobalState) {
        this.game = game;
        this.menuState = menuState;
        this.globalState = globalState;
    }

    create = () => {
        this.labelScore = this.game.add.text(20, 20, "0", { fill: "#FFFF00" });
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.name = "bird";
        this.bird.anchor.setTo(-0.2, 0.5);

        this.game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        this.bird.body.setSize(32, 34, 10, 0);

        this.pipes = this.game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');
        this.pipes.forEach(p => p.body.setSize(32, 30, 10, 0), this);

        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.game.stage.backgroundColor = "#2d2d2d";
    }

    update = () => {
        if (this.bird.inWorld === false) {
            this.restartGame();
        }

        //if (this.bird.angle < 5) {
        //    this.bird.angle += 1;
        //}

        // touch support
        if (this.game.input.activePointer.isDown && !this.touched) {
            this.touched = true;
            this.jump();
        }

        if (this.game.input.activePointer.isUp) {
            this.touched = false;
        }

        this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    }

    //render = () => {
    //    this.game.debug.body(this.bird);
    //    this.pipes.forEachAlive(p => this.game.debug.body(p), this);
    //}

    jump = () => {
        if (this.bird.alive === false) {
            return;
        }

        this.bird.body.velocity.y = -350;

        //var animation = this.game.add.tween(this.bird);
        //animation.to({ angle: -20 }, 100);
        //animation.start();
    }    

    restartGame = () => {
        this.game.state.start(this.menuState);
    }

    addOnePipe = (x: number, y: number) => {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;

        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }

    addRowOfPipes = () => {
        var i, hole = Math.floor(Math.random() * 5) + 1;
        for (i = 0; i < 8; i += 1) {
            if (i !== hole && i !== hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }

        this.globalState.score++;
        this.labelScore.text = this.globalState.score.toString();
    }

    hitPipe = () => {
        if (this.bird.alive === false) {
            return;
        }

        this.bird.alive = false;

        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(p => {
            p.body.velocity.x = 0;
        }, this);
    }
}
