function CollisionHandleSystem() {
	
}

CollisionHandleSystem.prototype.update = function (dt) {
	Crafty('PlayerShip Collision').each(function (index) {
		var collisions = this.hit('Asteroid');
		if (!collisions) {
			return;
		}
		
		for(var i = 0; i < collisions.length; i++) {
			var collision = collisions[i];
			var asteroid = collision.obj;
			asteroid.destroy();
		}
	});
}