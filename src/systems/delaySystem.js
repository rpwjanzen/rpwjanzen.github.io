// delay system
function DelaySystem() {
	// for each entity with Delay, only if delay has elapsed then set delay elapsed flag?
	update: function() {
		var now = Date.now();
		if (!this._lastTime)
		{
			return;
		}

		var elapsedTime = now - this._lastTime;

		Crafty('Delay').each(function(i) {
			this.timeleft = this.timeleft - elapsedTime;
			if(this.timeleft <= 0) {
				this.elapsed = true;
			}
		});

		this._lastTime = now;
	}
};