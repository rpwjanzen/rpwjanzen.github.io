class Hero extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, frame?: string | number) {
        super(game, x, y, 'hero', frame);

        this.anchor.setTo(0.5, 0.5);

        this.alive = true;

        this.game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
    }

    moveUp() {
        this.body.velocity.y = -150;
    }
    
    moveDown() {
        this.body.velocity.y = 150;
    }
    
    moveRight() {
        this.body.velocity.x = 150;
    }
    
    moveLeft() {
        this.body.velocity.x = -150;
    }
}