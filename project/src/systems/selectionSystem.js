function SelectionSystem() {
	if (!(this instanceof SelectionSystem)) {
		return new SelectionSystem();
	}
}

SelectionSystem.prototype.update = function(dt) {
	Crafty('Selectable Mouse').each(function (index) {
		// TODO: use Crafty.lastEvent to determine mouse state and set isSelected status
		// TODO: use highlight selected items system to highlight Tint + Selectable items
		
	});
}