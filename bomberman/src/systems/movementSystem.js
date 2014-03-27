// movement system
function MovementSystem() {
	this.update = function() {
		Crafty.c('Physics').each(function(i) {
			this.positionX += this.velocityX;
			this.positionY += this.velocityY;
		});
	};
}