// 2D collision system
function CollisionSystem() {
	this.update = function() {
		var that = this;
		var ids = Crafty('Collidable');
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

				Crafty('Collidable')
					.each(function(i) {
						if (this === entity) {
							return;
						}

						var intersects = that._getCollision(entity, this);
						if (intersects) {
							entity.collisions.push(this);
						}
					});
			});
		}
	},

	_getCollision: function(entity, other) {
		// bounding box
		var intersects =
			(Math.abs(entity.cellBoundsX - other.cellBoundsX) < (entityBounds.cellBoundsHalfwidth + otherBounds.cellBoundsHalfwidth)) &&
			(Math.abs(entity.cellBoundsY - other.cellBoundsY) < (entityBounds.cellBoundsHalfheight + otherBounds.cellBoundsHalfheight));

		return intersects;
	}
};