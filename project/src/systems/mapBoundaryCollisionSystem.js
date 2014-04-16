// Keeps all items within the map boundaries
function MapBoundaryCollisionSystem() {
	if (!(this instanceof MapBoundaryCollisionSystem)) {
		return new MapBoundaryCollisionSystem();
	}
}

MapBoundaryCollisionSystem.prototype.update = function (dt) {
	Crafty('Tile 2D').each(this._keepInBounds);
};

MapBoundaryCollisionSystem.prototype._keepInBounds = function (index) {
	if (this.tileX < 0) {
		this.tileX = 0;
		this.x = 0;
	} else if (this.tileX > 49) {
		this.tileX = 49;
		this.x = 49 * 16;
	}

	if (this.tileY < 0) {
		this.tileY = 0;
		this.y = 0;
	} else if (this.tileY > 31) {
		this.tileY = 31;
		this.y = 31 * 16;
	}
};
