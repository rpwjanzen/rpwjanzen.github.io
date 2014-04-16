function CollisionSystem() {
	if (!(this instanceof CollisionSystem)) {
		return new CollisionSystem();
	}
}

CollisionSystem.prototype.update = function (dt) {
	Crafty('Collision').each(this._updateCollisions);
};

CollisionSystem.prototype._updateCollisions = function (index) {
	this.collisions = this.hit('Collision');
}