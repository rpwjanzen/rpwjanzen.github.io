var PlayState = (function () {
    function PlayState(game, menuState, globalState) {
        var _this = this;
        this.create = function () {
            _this.labelScore = _this.game.add.text(20, 20, "0", { fill: "#FFFF00" });
            _this.game.physics.startSystem(Phaser.Physics.ARCADE);

            _this.bird = _this.game.add.sprite(100, 245, 'bird');
            _this.bird.name = "bird";
            _this.bird.anchor.setTo(-0.2, 0.5);

            _this.game.physics.arcade.enable(_this.bird);
            _this.bird.body.gravity.y = 1000;
            _this.bird.body.setSize(32, 34, 10, 0);

            _this.pipes = _this.game.add.group();
            _this.pipes.enableBody = true;
            _this.pipes.createMultiple(20, 'pipe');
            _this.pipes.forEach(function (p) {
                return p.body.setSize(32, 30, 10, 0);
            }, _this);

            _this.timer = _this.game.time.events.loop(1500, _this.addRowOfPipes, _this);

            var spaceKey = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(_this.jump, _this);

            _this.game.stage.backgroundColor = "#2d2d2d";
        };
        this.update = function () {
            if (_this.bird.inWorld === false) {
                _this.restartGame();
            }

            //if (this.bird.angle < 5) {
            //    this.bird.angle += 1;
            //}
            // touch support
            if (_this.game.input.activePointer.isDown && !_this.touched) {
                _this.touched = true;
                _this.jump();
            }

            if (_this.game.input.activePointer.isUp) {
                _this.touched = false;
            }

            _this.game.physics.arcade.overlap(_this.bird, _this.pipes, _this.hitPipe, null, _this);
        };
        //render = () => {
        //    this.game.debug.body(this.bird);
        //    this.pipes.forEachAlive(p => this.game.debug.body(p), this);
        //}
        this.jump = function () {
            if (_this.bird.alive === false) {
                return;
            }

            _this.bird.body.velocity.y = -350;
            //var animation = this.game.add.tween(this.bird);
            //animation.to({ angle: -20 }, 100);
            //animation.start();
        };
        this.restartGame = function () {
            _this.game.state.start(_this.menuState);
        };
        this.addOnePipe = function (x, y) {
            var pipe = _this.pipes.getFirstDead();

            pipe.reset(x, y);
            pipe.body.velocity.x = -200;

            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        };
        this.addRowOfPipes = function () {
            var i, hole = Math.floor(Math.random() * 5) + 1;
            for (i = 0; i < 8; i += 1) {
                if (i !== hole && i !== hole + 1) {
                    _this.addOnePipe(400, i * 60 + 10);
                }
            }

            _this.globalState.score++;
            _this.labelScore.text = _this.globalState.score.toString();
        };
        this.hitPipe = function () {
            if (_this.bird.alive === false) {
                return;
            }

            _this.bird.alive = false;

            _this.game.time.events.remove(_this.timer);

            _this.pipes.forEachAlive(function (p) {
                p.body.velocity.x = 0;
            }, _this);
        };
        this.game = game;
        this.menuState = menuState;
        this.globalState = globalState;
    }
    return PlayState;
})();
//# sourceMappingURL=play.js.map
