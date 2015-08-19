class Prefab extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, frame?: string | number) {
        super(game, x, y, 'prefab', frame);
    }
}