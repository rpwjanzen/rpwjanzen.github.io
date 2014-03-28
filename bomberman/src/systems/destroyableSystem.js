// destoryable system
function DestroyableSystem() {
	this.update = function(dt) {
		Crafty('Destroyable').each(function(i) {
			this.destroy();
		});
	};
};