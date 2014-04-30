// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		var ship = Crafty.e('Spr_ship, 2D, Canvas, Collision, PlayerShip, KeyboardControlled, Physics');
		ship.attr({ x:32, y: 32, rotation:0 });
		ship.collision();
		
		for(var i = 0; i < 20; i++) {
			var asteroid = Crafty.e('Spr_ship, 2D, Canvas, Collision, Asteroid');
			asteroid.attr({
				x: Math.random() * 32 * 25,
				y: Math.random() * 32 * 20,
				rotation: Math.random() * 360
			});
			asteroid.collision();
		}
		
		var collisionHandleSystem = new CollisionHandleSystem();
		var physicsSystem = new PhysicsSystem();
		var keyboardControllerSystem = new KeyboardControllerSystem();

		var delay = Crafty.e('Delay')
			.delay(function () {
				keyboardControllerSystem.update(100);
				physicsSystem.update(100);
			}, 100, -1);

		var delay2 = Crafty.e('Delay')
			.delay(function () {
				collisionHandleSystem.update(200);
			}, 200, -1);
	},
	function () {
		// on destory
	});