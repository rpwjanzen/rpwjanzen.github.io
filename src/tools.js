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
    this._registerEventHandlers();

    return this;
};

ChopWoodTool.prototype._onMouseDown = function(e) {
    this._firstTile = e;
};

ChopWoodTool.prototype._onMouseUp = function(e) {
    this._lastTile = e;
};

ChopWoodTool.prototype._onMouseOver = function(e) {
    console.log(this);
};

ChopWoodTool.prototype._registerEventHandlers = function() {
    var tiles = this._tiles;
    for(var x = 0; x < tiles.length; x++) {
        var row = tiles[x];
        for(var y = 0; y < row.length; y++) {
            var tile = row[y];
            tile.bind('MouseDown', this._onMouseDown.bind(this))
                .bind('MouseUp', this._onMouseUp.bind(this))
                .bind('MouseOver', this._onMouseOver);
        }
    }
};

// create stockpile tool

