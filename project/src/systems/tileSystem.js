function TileSystem() {
	if (!(this instanceof TileSystem)) {
		return new TileSystem();
	}
}

TileSystem.prototype.entitiesAt = function (x, y) {
	var items = [];
	Crafty('Tile').each(function (index) {
		if (this.tileX === x && this.tileY === y) {
			items.push(this);
		}
	});
	
	return items;
}

TileSystem.prototype.entitiesInBox = function (x0, y0, x1, y1) {
	var maxX = Math.max(x0, x1);
	var minX = Math.min(x0, x1);
	var maxY = Math.max(y0, y1);
	var minY = Math.min(y0, y1);
	
	var items = [];
	Crafty('Tile').each(function (index) {
		if (this.tileX < minX || this.tileX > maxX || this.tileY < minY || this.tileY > maxY) {
			continue;
		} else {
			items.push(this);
		}
	});
	return items;
}