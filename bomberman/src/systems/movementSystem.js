// movement system
function MovementSystem() {
	this.update = function(dt) {
		Crafty.c('Physics').each(function(i) {
			this.positionX += (this.velocityX * dt);
			this.positionY += (this.velocityY * dt);
		});
	};
}