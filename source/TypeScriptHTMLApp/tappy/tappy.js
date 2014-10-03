var TappyGame = (function () {
    function TappyGame() {
        this.game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');
    }
    TappyGame.prototype.preload = function () {
        this.game.load.image('bird', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');
    };

    TappyGame.prototype.jump = function () {
        if (this.bird.alive === false) {
            return;
        }

        this.bird.body.velocity.y = -350;

        var animation = this.game.add.tween(this.bird);
        animation.to({ angle: -20 }, 100);
        animation.start();
    };

    TappyGame.prototype.create = function () {
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", undefined);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.anchor.setTo(-0.2, 0.5);

        this.game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = this.game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');

        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
    };

    TappyGame.prototype.update = function () {
        if (this.bird.inWorld === false) {
            this.restartGame();
        }

        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }

        // touch support
        if (this.game.input.activePointer.isDown && !this.touched) {
            this.touched = true;
            this.jump();
        }

        if (this.game.input.activePointer.isUp) {
            this.touched = false;
        }

        this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    };

    TappyGame.prototype.restartGame = function () {
        this.game.state.start('main');
    };

    TappyGame.prototype.addOnePipe = function (x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;

        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    };

    TappyGame.prototype.addRowOfPipes = function () {
        var i, hole = Math.floor(Math.random() * 5) + 1;
        for (i = 0; i < 8; i += 1) {
            if (i !== hole && i !== hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }

        this.score++;
        this.labelScore.text = this.score.toString();
    };

    TappyGame.prototype.hitPipe = function () {
        if (this.bird.alive === false) {
            return;
        }

        this.bird.alive = false;

        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function (p) {
            p.body.velocity.x = 0;
        }, this);
    };
    return TappyGame;
})();

window.onload = function () {
    var game = new TappyGame();
    game.preload();
    game.create();
};
//# sourceMappingURL=tappy.js.map
