function CollisionSystem() {
	if (!(this instanceof CollisionSystem)) {
		return new CollisionSystem();
	}

	this.update = function (dt) {
		Crafty('Collision').each(function (indeX) {
			var collisions = this.hit('Collision');
			this.collisions = collisions;
			if(collisions) {
				// TODO: Handle collisions?
				for(var i = 0; i < collisions.length; i++) {
					var item = collisions[i];
					var entity = item.obj;
					var overlap = item.overlap;

					if (entity.has('Solid')) {

					}
				}
			}
		});
	};
}