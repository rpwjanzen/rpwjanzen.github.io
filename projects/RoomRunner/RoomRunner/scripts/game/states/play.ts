class Play extends Phaser.State {
    floor: Phaser.Sprite;
    hero: Hero;
    chest: Chest;
    enemies: Enemy[];
    
    rightKey: Phaser.Key;
    leftKey: Phaser.Key;
    upKey: Phaser.Key;
    downKey: Phaser.Key;
    
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.floor = this.game.add.sprite(0, 0, 'floor');

        this.chest = new Chest(this.game, 580, this.game.height / 2);
        this.game.add.existing(this.chest);

        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.rightKey.onDown.add(this.hero.moveRight, this.hero);
        
        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.leftKey.onDown.add(this.hero.moveLeft, this.hero);
        
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.upKey.onDown.add(this.hero.moveUp, this.hero);

        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.downKey.onDown.add(this.hero.moveDown, this.hero);
        
        this.hero.events.onOutOfBounds.add(this.deathHandler, this);
        
        var enemy0 = new Enemy(this.game, 250, this.game.height / 2);
        this.game.add.existing(enemy0);
        this.enemies.push(enemy0);
        
        var enemy1 = new Enemy(this.game, 375, this.game.height / 2);
        this.game.add.existing(enemy1);
        this.enemies.push(enemy1);
        
        var enemy2 = new Enemy(this.game, 500, this.game.height / 2);
        this.game.add.existing(enemy2);
        this.enemies.push(enemy2);
    }

    update() {
        if (!this.hero.alive) {
            return;
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