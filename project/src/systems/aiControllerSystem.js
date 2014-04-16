function AIControllerSystem() {
	if (!(this instanceof AIControllerSystem)) {
		return new AIControllerSystem();
	}
	
	this.update = function(dt) {
		Crafty('AIController Physics').each(function (index) {
			// move randomly
			var max = 1;
			var min = -1;

			var dx = Math.floor(Math.random() * (max - min + 1)) + min;
			var dy = Math.floor(Math.random() * (max - min + 1)) + min;
			
			this.dx = dx;
			this.dy = dy;
		});
	};
	
	return this;
}