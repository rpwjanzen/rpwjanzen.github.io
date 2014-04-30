function PhysicsSystem() {
	
}

PhysicsSystem.prototype.update = function (dt) {
	Crafty('Physics 2D').each(function (index) {
		this.px += this.dx;
		this.py += this.dy;
		this.pr += this.dr;
		
		this.dx *= this.linearDrag;
		this.dy *= this.linearDrag;
		this.dr *= this.rotationDrag;
	});
}