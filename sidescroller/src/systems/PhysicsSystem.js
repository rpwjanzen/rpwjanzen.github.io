function PhysicsSystem() {
	
}

PhysicsSystem.prototype.update = function (dt) {
	Crafty('Physics 2D').each(function (index) {
		this.x += this.dx;
		this.y += this.dy;
		this.rotation += this.dr;
		
		this.dx *= this.drag;
		this.dy *= this.drag;
		this.dr *= this.drag;
	});
}