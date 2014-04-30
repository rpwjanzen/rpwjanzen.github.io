function PhysicsSystem() {
	
}

PhysicsSystem.prototype.update = function (dt) {
	Crafty('Physics').each(function (index) {
		this.x += this.dx;
		this.y += this.dy;
	});
}