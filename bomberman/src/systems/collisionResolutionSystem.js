// Collision resolution system?
function CollisionResolutionSystem() {
	this.update = function(dt) {
		Crafty.c('Collideable').each(function (i) {
			if (this.collisions.length === 0) {
				return;
			}

			// TODO: resolve collision
		});
	}
};