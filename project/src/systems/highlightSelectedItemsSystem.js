function HighlightSelectedItemsSystem() {
	if(!(this instanceof HighlightSelectedItemsSystem)) {
		return new HighlightSelectedItemsSystem();
	}
}

HighlightSelectedItemsSystem.prototype.update = function (dt) {
	Crafty('Selectable Tint').each(this._updateHighlight);
}

HighlightSelectedItemsSystem.prototype._updateHighlight = function(index) {
	if (this.isSelected) {
		//this.tint('#00FFFF', 0.7);
		this.tint('#000000', 0.0);
	} else if (!this.isSelected) {
		//this.tint('#000000', 0.0);
		this.tint('#00FFFF', 0.7);
	}
}