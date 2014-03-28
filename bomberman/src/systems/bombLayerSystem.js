// bomb layer system
function BombLayerSystem() {
	this.update = function(dt) {
		Crafty('BombLayer').each(function(i) {
			if (this.dropBomb) {
				var bomb = Crafty.e('CellPosition Damager ScreenPosition TimeEffect');
				bomb.inflictDamage = 1;
				bomb.timeRemaining = 3000;
				bomb.effectType = effectTypes.Destroy;

				// HACK: Assume bomblayer has cell position
				bomb.cellX = this.cellX;
				bomb.cellY = this.cellY;

				// HACK: Assume bomblayer has screen position
				bomb.screenX = this.screenX;
				bomb.screenY = this.screenY;

				this.dropBomb = false;
			}
		});
	}
}