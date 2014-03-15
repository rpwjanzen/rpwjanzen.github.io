// The Grid component allows an element to be located on a grid of tiles
Crafty.c('Grid2D', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        });
        this._isAtDirty = true;
        this._at = { };
    },
 
    // Locate this entity at the given position on the grid
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            if (!this._isAtDirty) {
                return this._at;
            } else {
                this._at = {
                    'x': this.x / Game.map_grid.tile.width,
                    'y': this.y / Game.map_grid.tile.height
                };      
                this._isAtDirty = false;

                return this._at;
            }
        } else {
            var loc = this.at();
            var e = {
                'x': x,
                'y': y,
                'sourceX': loc.x,
                'sourceX': loc.y,
                'cancel': false
            };
            this.trigger('Moving', e);
            if(e.cancel) {
                return this;
            }

            this.x = x * Game.map_grid.tile.width;
            this.y = y * Game.map_grid.tile.height
            
            this._isAtDirty = true;
            this.trigger('Moved', {
                    'x': x,
                    'y': y,
                    'sourceX': loc.x,
                    'sourceY': loc.y
                });

            return this;
        }
    },
});

Crafty.c('Solid2D', {
    init: function() {
        this._isSolid = false;
        this.requires('2DGrid');
    },

    isSolid: function(val) {
        if(val === undefined) {
            return this._isSolid;
        } else {
            this._isSolid = val;
            return this;
        }
    },

    solid2D: function(isSolid) {
        this._isSolid = isSolid;
    }
});

// http://cykod.github.io/Presentations/HTML5/Crafty/