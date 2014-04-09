// collision system
Crafty.c('CollisionSystem', {
	update: function() {
		var that = this;
		// for each entity with Position, check collision with any other enity. if so, set collision object(s) (list)
		var ids = Crafty('Position Collision2D');
		if(ids.length === 0) {
			return;
		} else if (ids.length === 1) {
			var entity = Crafty(ids[0]);
			entity.collisions = [];
		} else {
			// O(n^2)
			_.forEach(ids, function(id) {
				var entity = Crafty(id);
				entity.collisions = [];

				Crafty('Position Collision2D')
					.each(function(i) {
						if (this === entity) {
							return;
						}

						var collision = that._getCollision(entity, this);
						if (collision) {
							entity.collisions.push(collision);
						}
					});
			});
		}
	},

	_getCollision: function(entity, other) {
		var entityBounds = entity.bounds;
		var otherBounds = other.bounds;

		// bounding box
		var intersects = (Math.abs(entity.position.x - other.position.x) * 2 < (entityBounds.w + otherBounds.w)) &&
			(Math.abs(entity.position.y - other.position.y) * 2 < (entityBounds.h + otherBounds.h));

		return intersects;
	}
});