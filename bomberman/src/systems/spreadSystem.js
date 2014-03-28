// spread system
function SpreadSystem({
	this.update = function(dt) {
		Crafty('Spreadable').each(function(i) {
			if (this.depth === 0) {
				return;
			}

			var spreadType = this.spreadType;
			if (spreadType === spreadTypes.FlowAroundObstacles) {
				// TODO: flwo around obstacles
				throw new Error("unhandled spread type");
			} else if (spreadType === spreadTypes.FlowCartesian) {
				// TODO: Flow left/right and up/down in a line with obstacles
				throw new Error("unhandled spread type");
			} else if (spreadType === spreadTypes.FlowIgnoreObstacles) {
				// HACK: Assumes has CellPosition
				var up = this.clone();
				up.cellX = this.cellX;
				up.cellY = this.cellY - 1;
				up.depth = this.depth - 1;
				up.spreadType = spreadType;

				var down = this.clone();
				down.cellX = this.cellX;
				down.cellY = this.cellY + 1;
				down.depth = this.depth - 1;
				down.spreadType = spreadType;

				var left = this.clone();
				left.cellX = this.cellX - 1;
				left.cellY = this.cellY;
				left.depth = this.depth - 1;
				left.spreadType = spreadType;

				var right = this.clone();
				right.cellX = this.cellX + 1;
				right.cellY = this.cellY;
				right.depth = this.depth - 1;
				right.spreadType = spreadType;
			} else {
				throw new Error("unhandled spread type");
			}
		});
	};
});