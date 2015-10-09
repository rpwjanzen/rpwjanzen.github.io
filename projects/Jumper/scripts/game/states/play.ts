class Play extends Phaser.State {
    player: Phaser.Sprite
    platformGroup: Phaser.Group

    maxSpeed: number
    acceleration: number
    drag: number
    gravity: number
    jumpSpeed: number

    create() {
        this.maxSpeed = 250;
        this.acceleration = 750;
        this.drag = 300;
        this.gravity = 1300;
        this.jumpSpeed = -500;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.add.sprite(this.game.width / 2, this.game.height - 32, 'player');
        this.game.physics.enable(this.player);
        var pb: Phaser.Physics.Arcade.Body = this.player.body;
        pb.collideWorldBounds = true;
        pb.maxVelocity.setTo(this.maxSpeed, this.maxSpeed * 10);
        pb.drag.setTo(this.drag, 0);

        this.physics.arcade.gravity.y = this.gravity;

        this.platformGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < this.game.width / 16; i++) {
            var platform : Phaser.Sprite = this.platformGroup.create(i * 16, this.game.height - 16, 'platform');
            var b: Phaser.Physics.Arcade.Body = platform.body;
            b.immovable = true;
            b.allowGravity = false;
        }

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);
    }

    update() {
        this.physics.arcade.collide(this.player, this.platformGroup);

        if (this._isLeftInputActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.body.acceleration.x = -this.acceleration;
        } else if (this._isRightInputActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.body.acceleration.x = this.acceleration;
        } else {
            // Stop the player from moving horizontally
            this.player.body.acceleration.x = 0;
        }

        var onTheGround = this.player.body.touching.down;
        if (onTheGround && this._isJumpInputActive(5)) {
            this.player.body.velocity.y = this.jumpSpeed;
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

    _isJumpInputActive(duration: number) {
        var isActive = false;

        isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
        isActive = isActive || (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
            this.game.input.activePointer.x > this.game.width / 4 &&
            this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

        return isActive;
    }

    _createPlatform() {
        var platform = this.platformGroup.getFirstDead();
        if (platform) {

        } else {

        }
    }
}