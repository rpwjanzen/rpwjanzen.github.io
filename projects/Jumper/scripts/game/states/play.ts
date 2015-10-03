class Play extends Phaser.State {
    player: Phaser.Sprite
    groundGroup: Phaser.Group

    maxSpeed: number
    drag: number
    gravity: number

    create() {
        this.maxSpeed = 32 * 6;
        this.drag = 15;
        this.gravity = 10;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.add.sprite(this.game.width / 2, this.game.height - 32, 'player');
        this.game.physics.enable(this.player);
        var pb: Phaser.Physics.Arcade.Body = this.player.body;
        pb.collideWorldBounds = true;
        pb.maxVelocity.set(this.maxSpeed);
        pb.drag.setTo(this.drag, 0);

        this.groundGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < this.game.width / 16; i++) {
            var platform : Phaser.Sprite = this.groundGroup.create(i * 16, this.game.height - 16, 'platform');
            var b: Phaser.Physics.Arcade.Body = platform.body;
            b.allowGravity = false;
        }

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);
    }

    update() {
        this.physics.arcade.collide(this.player, this.groundGroup);

        if (this._isLeftInputActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.body.velocity.x = -this.maxSpeed;
        } else if (this._isRightInputActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.body.velocity.x = this.maxSpeed;
        } else {
            // Stop the player from moving horizontally
            this.player.body.velocity.x = 0;
        }
    }

    _isLeftInputActive() {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        isActive = isActive || (this.input.activePointer.isDown && this.input.activePointer.x < this.game.width / 4);

        return isActive;
    }

    _isRightInputActive() {
        var isActive = false;

        isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        isActive = isActive || (this.game.input.activePointer.isDown && this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

        return isActive;
    }

    _isJumpInputActive() {
        return false;
    }
}