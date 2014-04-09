// Draw/Visibility system - Turns items visibility on/off where appropriate

function RenderSystem() {

	// only runs update when there is a request to draw from browser
	update: function() {
		// foreach entity with Sprite, only if visible then render to scene
		Crafty('Sprite').each(function(i) {
			if(this.visible) {
				// TODO: render
			}
		});
	}
});