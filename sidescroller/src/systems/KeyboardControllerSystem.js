function KeyboardControllerSystem () {
	var k = Crafty.e('Keyboard');
}

KeyboardControllerSystem.prototype.update = function(dt) {
	Crafty('KeyboardControlled Physics').each(function (index) {
		if (Crafty.keydown[Crafty.keys.W]) {
			var theta = (this.pr + 90) * (Math.PI / 180);
			this.dx += Math.cos(theta);
			this.dy += Math.sin(theta);
		}
		if (Crafty.keydown[Crafty.keys.S]) {
			var theta = (this.pr - 90) * (Math.PI / 180);
			this.dx += Math.cos(theta);
			this.dy += Math.sin(theta);
		}
		if (Crafty.keydown[Crafty.keys.A]) {
			this.dr += -3;
		}
		if (Crafty.keydown[Crafty.keys.D]) {
			this.dr += 3;
		}

		// limit total velocity per turn
		this.dy = Math.max(this.dy, -5);
		this.dy = Math.min(this.dy, 5);
		this.dx = Math.max(this.dx, -5);
		this.dx = Math.min(this.dx, 5);
		// limit total rotation per turn
		this.dr = Math.max(this.dr, -12);
		this.dr = Math.min(this.dr, 12);
	});
}