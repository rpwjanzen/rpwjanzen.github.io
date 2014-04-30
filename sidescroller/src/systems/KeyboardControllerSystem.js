function KeyboardControllerSystem () {
	var k = Crafty.e('Keyboard');
}

KeyboardControllerSystem.prototype.update = function(dt) {
	Crafty('KeyboardControlled Physics').each(function (index) {
		if (Crafty.keydown[Crafty.keys.W]) {
			this.dy += -1;
		}
		if (Crafty.keydown[Crafty.keys.A]) {
			this.dx += -1;
		}
		if (Crafty.keydown[Crafty.keys.S]) {
			this.dy += 1;
		}
		if (Crafty.keydown[Crafty.keys.D]) {
			this.dx += 1;
		}

		// limit total velocity
		this.dy = Math.max(this.dy, -5);
		this.dy = Math.min(this.dy, 5);
		this.dx = Math.max(this.dx, -5);
		this.dx = Math.min(this.dx, 5);
	});
}