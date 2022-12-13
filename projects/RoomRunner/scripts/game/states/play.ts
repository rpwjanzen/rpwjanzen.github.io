class Play extends Phaser.State {
    floor: Phaser.Sprite;
    hero: Hero;
    chest: Chest;
    enemies: Enemy[];
    cursors: Phaser.CursorKeys;
    
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.floor = this.game.add.sprite(0, 0, 'floor');

        this.chest = new Chest(this.game, 580, this.game.height / 2);
        this.game.add.existing(this.chest);

        this.hero = new Hero(this.game, 50, this.game.height / 2);
        this.game.add.existing(this.hero);
        
        this.hero.events.onOutOfBounds.add(this.deathHandler, this);
        
        this.enemies = [];

        var enemy0 = new Enemy(this.game, 250, this.game.height / 2);
        this.game.add.existing(enemy0);
        this.enemies.push(enemy0);
        
        var enemy1 = new Enemy(this.game, 375, this.game.height / 2);
        this.game.add.existing(enemy1);
        this.enemies.push(enemy1);
        
        var enemy2 = new Enemy(this.game, 500, this.game.height / 2);
        this.game.add.existing(enemy2);
        this.enemies.push(enemy2);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        if (!this.hero.alive) {
            return;
        }

        this.hero.body.velocity.x = 0;
        this.hero.body.velocity.y = 0;

        if (this.cursors.up.isDown) {
            this.hero.moveUp();
        }

        if (this.cursors.down.isDown) {
            this.hero.moveDown();
        }

        if (this.cursors.right.isDown) {
            this.hero.moveRight();
        }

        if (this.cursors.left.isDown) {
            this.hero.moveLeft();
        }

        this.game.physics.arcade.collide(this.hero, this.chest, this.deathHandler, null, this);
        
        this.game.physics.arcade.collide(this.hero, this.enemies[0], this.deathHandler, null, this);
        this.game.physics.arcade.collide(this.hero, this.enemies[1], this.deathHandler, null, this);
        this.game.physics.arcade.collide(this.hero, this.enemies[2], this.deathHandler, null, this);
    }

    deathHandler() {
        this.hero.kill();
    }

    startGame() {
        this.hero.alive = true;
        this.hero.exists = true;
    }

    shutdown() {
        this.hero.destroy();
        this.floor.destroy();
        this.chest.destroy();
        for(var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].destroy();
        }
    }
}