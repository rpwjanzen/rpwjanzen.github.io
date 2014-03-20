// mouse tools


// chop wood tool
// TODO
// click to select region
// add chop wood jobs for all trees in selected region

function ChopWoodTool(tiles) {
    if (!this instanceof ChopWoodTool) {
        return new ChopWoodTool(tiles);
    }
    
    this._tiles = tiles;
    this._previousTile = null;
    

    var that = this;
    this._onMouseDown = function(e) {
        var tile = this;
        that._firstTile = tile;
        tile.selected(true);
        that._previousTile = this;
    };

    this._onMouseUp = function(e) {
        var tile = this;
        var l0 = that._firstTile.at();
        var l1 = this.at();
        that._selectRegion(l0, l1, false);
        that._previousTile = null;
    };
    
    this._onMouseOver = function(e) {
        if (e.which === 1) {
            // left mouse button is down
            var tile = this;
            var l0 = that._firstTile.at();
            var l1 = this.at();

            if(that._previousTile) {
                var p0 = that._previousTile.at();
                that._selectRegion(l0, p0, false);
            }

            that._selectRegion(l0, l1, true);
            that._previousTile = tile;
        }
    };

    this._selectRegion = function(l0, l1, value) {
        var minX = Math.min(l0.x, l1.x);
        var minY = Math.min(l0.y, l1.y);
        var maxX = Math.max(l0.x, l1.x);
        var maxY = Math.max(l0.y, l1.y);

        for(var x = minX; x <= maxX; x++) {
            var row = that._tiles[x];
            for(var y = minY; y <= maxY; y++) {
                row[y].selected(value);
            }
        }
    };

    this._registerEventHandlers();
    return this;
};

ChopWoodTool.prototype._registerEventHandlers = function() {
    var tiles = this._tiles;
    for(var x = 0; x < tiles.length; x++) {
        var row = tiles[x];
        for(var y = 0; y < row.length; y++) {
            var tile = row[y];
            tile.bind('MouseDown', this._onMouseDown)
                .bind('MouseUp', this._onMouseUp)
                .bind('MouseOver', this._onMouseOver);
        }
    }
};

// create stockpile tool

