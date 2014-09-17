// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() {
      game.stage.backgroundColor = '#71c5cf';
      game.load.image('bird', 'assets/bird.png');
    },

    create: function() { 
      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.bird = this.game.add.sprite(100, 245, 'bird');

      game.physics.arcade.enable(this.bird);
      this.bird.body.gravity.y = 1000;

      var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.jump, this);
    },

    update: function() {
      if (this.bird.inWorld == false) {
        this.restartGame();
      }
    },

    jump: function() {
      this.bird.body.velocity.y = -350;
    },

    restartGame: function() {
      game.state.start('main');
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');  
