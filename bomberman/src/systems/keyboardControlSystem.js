// keyboard control system
var actionTypes = {
	moveUp : 0,
	moveLeft : 1,
	moveRight: 2,
	moveDown : 3,
	dropBomb : 4,
};

function KeyboardControlSystem() {
	this.updateDown = function(e) {
		var key = e.key;
		Crafty('KeyboardControlled').each(function(i) {
			this.actionType = null;
			
			var actionType = this.keys[key].onDownAction;
			if (!actionType) {
				return;
			}

			// HACK: assumes Controller
			this.actionType = actionType;
		});
	};

	this.updateUp = function(e) {
		var key = e.key;
		Crafty('KeyboardControlled').each(function(i) {
			this.actionType = null;

			var actionType = this.keys[key].onUpAction;
			if (!actionType) {
				return;
			}

			// HACK: assumes Controller
			this.actionType = actionType;
		});
	};

	var entity = Crafty.e('Keyboard');
	entity.bind('KeyDown', this.updateDown);
	entity.bind('KeyUp', this.updateUp);

	this.update = function(dt) {
		// update is done via Crafty's KeyDown/KeyUp events
	};
};