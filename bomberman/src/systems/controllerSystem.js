// controller system
function ControllerSystem() {
	this.update = function(dt) {
		Crafty('Controller').each(function (i) {
			var actionType = this.actionType;
			if (!actionType) {
				return;
			}

			if(actionType === actionTypes.moveUp) {
				// HACK: Assumes velocity component
				this.velocityX = 0;
				this.velocityY = -1;
			} else if (actionType === actionTypes.moveDown) {
				this.velocityX = 0;
				this.velocityY = 1;
			} else if (actionType === actionTypes.moveLeft) {
				this.velocityX = -1;
				this.velocityY = 0;
			} else if (actionType === actionTypes.moveRight) {
				this.velocityX = 1;
				this.velocityY = 0;				
			} else if (actionType === actionTypes.dropBomb) {
				// HACK: assumes bomb layer component
				this.dropBomb = true;
			}

			// reset the action?
			this.actionType = null;
		});
	};
};