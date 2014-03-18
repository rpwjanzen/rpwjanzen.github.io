Game = {
    // This defines our grid's size and the size of each of its tiles
    map_grid: {
        width:  50,
        height: 50,
        tile: {
            width:  16,
            height: 16
        },
        
        _tiles: [0][0],

        // all Grid2D entities in the game
        _mapEntities: [],

        track: function(entity) {
            this._mapEntities.push(entity);
            var loc = entity.at();
            this._tiles[loc.x][loc.y].addEntity(entity);


            var that = this;
            var onMoved = function (e) {
                // HACK: Ignore undefined and 0,0
                /*
                if (e.sourceX && e.sourceY && e.sourceX !== 0 && e.sourceY !== 0) {
                    that._tiles[e.sourceX][e.sourceY].removeEntity(entity);
                }
                */
                
                that._tiles[e.sourceX][e.sourceY].removeEntity(entity);
                that._tiles[e.x][e.y].addEntity(entity);
            };
            
            // cancel illegal moves
            var onMoving = function (e) {
                if (e.sourceX && e.sourceY) {
                    if(!that._tiles[e.x][e.y].passable()) {
                        e.cancel = true;
                    }
                }
            };

            var onRemove = function(e) {
                entity.unbind('Moved', onMoved);
                entity.unbind('Moving', onMoving);

                var cloc = entity.at();
                that._tiles[cloc.x][cloc.y].removeEntity(entity);
                ArrayEx.remove(that._mapEntities, entity);
            };

            entity.bind('Moved', onMoved)
                .bind('Moving', onMoving)
                .bind('Remove', onRemove);
        },

        tileAt: function(x,y) {
            return this._tiles[x][y];
        },

        passable: function(x,y) {
            return this.tileAt(x,y).passable();
        },
    },
    
    isSlow: false,

    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    pixelWidth: 50 * 16,
 
    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    pixelHeight: 50 * 16,
 
    // Initialize and start our game
    start: function() {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.pixelWidth, Game.pixelHeight);
        //Crafty.background(Crafty.toRGB("#FF00FF", 1.0));
        // as long as we do not use 'EnterFrame' and use Delay instead of custom code for any timing-based calculations this should work
        Crafty.timer.steptype("variable");
 
        // Simply start the "Loading" scene to get things going
        Crafty.scene('Loading');
        //Crafty.DrawManager.debugDirty = true;
    }
};
 


$text_css = { 'size': '24px', 'family': 'Arial', 'color': 'red', 'text-align': 'center' };
