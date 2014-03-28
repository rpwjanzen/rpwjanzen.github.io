Crafty.scene('Game',
    function() {
        Crafty.e('TimePerFrame');
        var tileEntityComponents = 'CellPosition Collideable Damageable ScreenPosition';

        // TODO: Create map
        var map = [];
        for(var x = 0; x < 10; x++) {
        	map[x] = [];
        	for(var y = 0; y < 10; y++) {
        		// TODO: New tile?
        		map[x][y] = Crafty.c(tileEntityComponents);
        	}
        }

        var playerComponents = 'CellPosition Collideable Damageable Physics ScreenPosition BombLayer';
        var player = Crafty.c('KeyboardControlled ' + playerComponents);

        Crafty.c(playerComponents);
        Crafty.c(playerComponents);
        Crafty.c(playerComponents);
        Crafty.c(playerComponents);


        var collisionSystem = new CollisionSystem();
        var collisionResolutionSystem = new CollisionResolutionSystem();
        var controllerSystem = new ControllerSystem();
        var keyboardControlSystem = new KeyboardControlSystem();
        var movementSystem = new MovementSystem();

    },
    function() {
    });