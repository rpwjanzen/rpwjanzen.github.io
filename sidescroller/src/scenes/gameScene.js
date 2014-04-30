// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		var ship = Crafty.e('Spr_ship, 2D, Canvas, Collision, PlayerShip, KeyboardControlled, Physics');
		ship.attr({ x:32, y: 32, rotation: 270, drag: 0.99 });
		ship.origin("center");
		ship.collision();
		
		for(var i = 0; i < 20; i++) {
			var asteroid = Crafty.e('Spr_ship, 2D, Canvas, Collision, Asteroid, Physics');
			asteroid.attr({
				x: Math.random() * 32 * 25,
				y: Math.random() * 32 * 20,
				rotation: Math.random() * 360,
				dx: (Math.random() * 4) - 2,
				dy: (Math.random() * 4) - 2,
				dr: 10,
			});
			asteroid.origin("center");
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