// Timed effect system


function TimeEffectSystem() {
	this.update = function (dt) {
		Crafty('TimedEffect').each(function(i) {
			// Spreah or Destroy
			this.timeRemaining -= dt;
			if (this.timeRemaining > 0) {
				return;
			}

			var effectType = this.effectType;
			if (effectType === effectTypes.Spread) {
				this.addComponent('Spreadable');
				this.spreadType = spreadTypes.FlowAroundObstacles;
				this.depth = 5;
			} else if (effectType === effectType.Destroy) {
				this.addComponent('Destroyable');
			} else {
				throw new Error("unhandled timed effect type");
			}

			this.removeComponent('TimeEffect');
		});
	};
}