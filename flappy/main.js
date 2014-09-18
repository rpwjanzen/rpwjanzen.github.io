/// <reference path="~/flappy/phaser.js" />
/*global Phaser */

// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {
    
    preload: function () {
        "use strict";
        game.stage.backgroundColor = '#71c5cf';
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function () {
        "use strict";
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.anchor.setTo(-0.2, 0.5);

        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        
        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');
        
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    },

    update: function () {
        "use strict";
        if (this.bird.inWorld === false) {
            this.restartGame();
        }

        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }

        if (this.pipe && this.pipe.body.x < 100 && !this.pipe.isScored) {
            this.score += 1;
            this.labelScore.text = this.score;
            this.pipe.isScored = true;
        }

        // touch support
        if (game.input.activePointer.isDown && !this.touched) {
            this.touched = true;
            this.jump();
        }

        if (game.input.activePointer.isUp) {
            this.touched = false;
        }

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    },

    jump: function() {
        "use strict";
        if (this.bird.alive === false) {
            return;
        }

        this.bird.body.velocity.y = -350;

        var animation = game.add.tween(this.bird);
        animation.to({ angle: -20 }, 100);
        animation.start();
    },

    restartGame: function () {
        "use strict";
        game.state.start('main');
    },
    
    addOnePipe: function (x, y) {
        "use strict";
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
        pipe.isScored = false;

        this.pipe = pipe;
    },
    
    addRowOfPipes: function () {
        "use strict";
        var i, hole = Math.floor(Math.random() * 5) + 1;
        for (i = 0; i < 8; i += 1) {
            if (i !== hole && i !== hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }
    },

    hitPipe: function () {
        "use strict";
        if (this.bird.alive === false) {
            return;
        }

        this.bird.alive = false;

        game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function (p) {
            p.body.velocity.x = 0;
        }, this)
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');
