// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		var ship = Crafty.e('Spr_ship, 2D, Canvas, Collision, PlayerShip, KeyboardControlled, Physics, Tween');
		ship.attr({ x:32, y: 32, rotation: 270, linearDrag: 0.9, rotationDrag: 0.9 });
		ship.origin("center");
		ship.collision();
		
		for(var i = 0; i < 20; i++) {
			var asteroid = Crafty.e('Spr_ship, 2D, Canvas, Collision, Asteroid, Physics, Tween');
			asteroid.attr({
				px: Math.random() * 32 * 25,
				py: Math.random() * 32 * 20,
				pr: Math.random() * 360,

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
		var physicsToUISystem = new PhysicsToUISystem();

		var d0 = Crafty.e('Delay')
			.delay(function () {
				physicsToUISystem.update(50);
			}, 50, -1);

		var d1 = Crafty.e('Delay')
			.delay(function () {
				keyboardControllerSystem.update(100);
			}, 100, -1);

		var d2 = Crafty.e('Delay')
			.delay(function () {
				physicsSystem.update(100);
				collisionHandleSystem.update(100);
			}, 100, -1);

	},
	function () {
		// on destory
	});