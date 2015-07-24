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

        this.load.image('floor', 'assets/floor.png');
        this.load.image('chest', 'assets/chest.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('hero', 'assets/hero.png');
    }

    update() {
        if (this.ready) {
            this.game.state.start('play');
        }
    }

    onLoadComplete() {
        this.ready = true;
    }
}