Crafty.c('TileDisplayManager', {
	init: function () {
		this.requires('Delay')
			// Every 500 ms update each tile's drawn image
            .delay(this._drawItems, 500, -1);
        this._tiles = null;

        return this;
	},

	tileDisplayManager: function (tiles) {
		this._tiles = tiles;
	},

	_drawItems: function() {
		for(var x = 0; x < this._tiles.length; x++) {
			var row = this._tiles[x];
			for(var y = 0; y < this._tiles[x].length; y++) {
				row[y].drawNextItem();
			}
		}
	}
});