class Scoreboard extends Phaser.Group {
    scoreboard: Phaser.Sprite;
    scoreText: Phaser.BitmapText;
    bestScoreText: Phaser.BitmapText;
    startButton: Phaser.Button;

    constructor(game: Phaser.Game) {
        super(game);

        var gameover : Phaser.Sprite = this.create(this.game.width / 2, 100, 'gameover');
        gameover.anchor.setTo(0.5, 0.5);

        this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
        this.add(this.scoreText);

        this.bestScoreText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyfont', '', 18);
        this.add(this.bestScoreText);

        this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5, 0.5);

        this.add(this.startButton);

        this.y = this.game.height;
        this.x = 0;
    }

    show(score: number) {
        var bestScoreText: string, medal: Phaser.Sprite;

        this.scoreText.setText(score.toString());
        
        if (localStorage) {
            var value: string = localStorage.getItem('bestScore');
            var bestScore = parseInt(value);

            if (bestScore < score) {
                bestScoreText = bestScore.toString();
                localStorage.setItem('bestScore', bestScoreText);
            } else if (isNaN(bestScore)) {
                bestScoreText = "N/A";
            } else {
                bestScoreText = bestScore.toString();
            }
        } else {
            // Fallback. LocalStorage isn't available
            bestScoreText = 'N/A';
        }

        this.bestScoreText.setText(bestScoreText);

        if (score >= 10 && score < 20) {
            medal = this.game.add.sprite(-65, 7, 'medals', 1);
            medal.anchor.setTo(0.5, 0.5);
            this.scoreboard.addChild(medal);
        } else if (score >= 20) {
            medal = this.game.add.sprite(-65, 7, 'medals', 0);
            medal.anchor.setTo(0.5, 0.5);
            this.scoreboard.addChild(medal);
        }

        if (medal) {
            var emitter = this.game.add.emitter(medal.x, medal.y, 400);
            this.scoreboard.addChild(emitter);
            emitter.width = medal.width;
            emitter.height = medal.height;

            emitter.makeParticles('particle');

            emitter.setRotation(-100, 100);
            emitter.setXSpeed(0, 0);
            emitter.setYSpeed(0, 0);
            emitter.minParticleScale = 0.25;
            emitter.maxParticleScale = 0.5;
            emitter.setAll('body.allowGravity', false);

            emitter.start(false, 1000, 1000);

        }

        this.game.add.tween(this).to({ y: 0 }, 1000, Phaser.Easing.Bounce.Out, true);
    }

    startClick() {
        this.game.state.start('play');
    }
} 