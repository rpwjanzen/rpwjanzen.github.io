function PhysicsSystem() {
	if (!(this instanceof PhysicsSystem)) {
		return new PhysicsSystem();
	}
	
	this.update = function (dt) {
		Crafty('Physics Tile 2D').each(function (index) {
			this.x = this.x + (this.dx * 16);
			this.y = this.y + (this.dy * 16);
			
			this.tileX = this.x / 16;
			this.tileY = this.y / 16;
		});
	}
}