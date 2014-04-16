// handles Solid + non-solid collisions
function SolidCollisionSystem() {
	if (!(this instanceof SolidCollisionSystem)) {
		return new SolidCollisionSystem();
	}
}

SolidCollisionSystem.prototype.update = function (dt) {
	Crafty('Collision Solid').each(this._handleCollision);
};

SolidCollisionSystem.prototype._handleCollision = function (index) {
	var collisions = this.collisions;
	if (collisions) {
		for(var i = 0; i < collisions.length; i++) {
			var c = collisions[i];
			var item = c.obj;
			if (item.has('Solid')) {
				// ignore Solid <-> Solid collisions
				continue;
			}

			if (item.has('Bounce') && item.has('Physics') && item.has('2D') && item.has('Tile')) {
				// move back
				item.tileX = item.tileX - item.dx;
				item.tileY = item.tileY - item.dy;
				item.x = item.tileX * 16;
				item.y = item.tileY * 16;
			}
		}
	}
}