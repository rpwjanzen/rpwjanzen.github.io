function PhysicsToUISystem () {
	
}

PhysicsToUISystem.prototype.update = function(dt) {
	Crafty('Physics 2D Tween').each(function (index) {
		this.cancelTween({x: 0, y: 0, rotation: 0 });
		this.tween({
			x: this.px,
			y: this.py,
			rotation: this.pr
		}, dt);
		//this.x = this.px;
		//this.y = this.py;
		//this.rotation = this.pr;
	});
}