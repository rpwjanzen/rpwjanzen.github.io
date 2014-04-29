// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		var ship = Crafty.e('Spr_ship, 2D, Canvas, Fourway, Collision, PlayerShip');
		ship.attr({ x:32, y: 32, rotation:270 });
		ship.fourway(5);
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
		var delay = Crafty.e('Delay')
			.delay(function () {
				collisionHandleSystem.update(200);
			}, 200, -1);
			
	},
	function () {
		// on destory
	});