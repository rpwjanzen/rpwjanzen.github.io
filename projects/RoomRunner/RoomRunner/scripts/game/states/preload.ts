class Preload extends Phaser.State {
    sprite: Phaser.Sprite;
    ready: boolean;

    constructor() {
        super();

        this.sprite = null;
        this.ready = false;
    }

    preload() {
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
    }

    update() {
        if (this.ready) {
            this.game.state.start('menu');
        }
    }

    onLoadComplete() {
        this.ready = true;
    }
}