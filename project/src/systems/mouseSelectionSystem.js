function MouseSelectionSystem() {
	if (!(this instanceof MouseSelectionSystem)) {
		return new MouseSelectionSystem();
	}
}

MouseSelectionSystem.prototype.update = function(dt) {
	if (!Crafty.lastEvent) {
		return;
	}
	return;
	
	if (Crafty.lastEvent.mouseButton === Crafty.mouseButtons.LEFT) {
		if (Crafty.over === null) {
			return;
		}
		
		if (this._startX === null) {
			this._startX = Crafty.over.tileX;
			this._startY = Crafty.over.tileY;
		} else {
			this._endX = Crafty.over.tileX;
			this._endY = Crafty.over.tileY;
		}
	} else {
		// left mouse button not down
		if (this._startX === null) {
			return;
		}
		
		var maxX = Math.max(this._startX, this._endX);
		var minX = Math.min(this._startX, this._endX);
		var maxY = Math.max(this._startY, this._endY);
		var minY = Math.min(this._startY, this._endY);
		
		Crafty('Tile Selectable').each(function (index) {
			if (this.tileX < minX || this.tileX > maxX || this.tileY < minY || this.tileY > maxY) {
				this.isSelected = false;
			} else {
				this.isSelected = true;
			}
		});
		
		this._startX = null;
		this._startY = null;
		this._endX = null;
		this._endY = null;
	}
}