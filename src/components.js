// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid2D, HideShow2D, Tracked, Solid2D, DarkerTint, MouseSelectable');
    }
});

Crafty.c('Tracked', {
    init: function() {
        Game.map_grid.track(this);
    }
});

Crafty.c('Tile', {
    init: function() {
        this._itemIndex = 0;
        this._items = [];
        this._itemDirty = true;

        this.requires('2D, Canvas, Grid2D, PassableEntities, DarkerTint, Sprite, Delay, spr_transparent')
            // Every 500 ms get sprite coordinate of item and tint and apply it to self via the .sprite(x,y) and tint methods
            .delay(this._drawItem, 500, -1);

        // HACK
        //this.__padding = [0,0];
        return this;
    },

    addEntity: function(entity) {
        this.addPassableEntity(entity);
        this._items.push(entity);
        this._itemDirty = true;
        return this;
    },

    removeEntity: function(entity) {
        this.removePassableEntity(entity);
        ArrayEx.remove(this._items, entity);

        if (this._items.length !== 0) {
            this._itemIndex = this._itemIndex % this._items.length;
        } else {
            this._itemIndex = 0;
        }
        this._itemDirty = true;
        this._drawItem;
        
        return this;
    },

    passable: function() {
        return this.passable0();
    },

    _drawItem: function() {
        if (!this._itemDirty) {
            return;
        }

        if (this._items.length === 0) {
            this.sprite(0,0);
            this.tint('#000000', 0);
            this._itemDirty = false;
            return;
        }

        var item = this._items[this._itemIndex];
        var coord = item.__coord;
        var tintColor = item._color;
        var strength = item._strength;

        if (coord) {
            var x = Math.floor(coord[0] / 16);
            var y = Math.floor(coord[1] / 16);
            this.sprite(x,y);
        } else {
            this.sprite(0,0);
        }

        if (tintColor && strength) {
            this.tint(tintColor, strength);
        } else {
            this.tint('#000000', 0);
        }

        this._itemIndex = (this._itemIndex + 1) % this._items.length;
        this._itemDirty = true;
    }
});

Crafty.c('PassableEntities', {
    init: function() {
        this._passableEntities = [];
        this._passableDirty = true;
        this._passable = true;

        return this;
    },

    addPassableEntity: function(entity) {
        this._passableEntities.push(entity);
        this._passableDirty = true;
    },

    removePassableEntity: function(entity) {
        var removed = ArrayEx.remove(this._passableEntities, entity);
        if (!removed) {
            return this;
        }
        this._passableDirty = true;
    },

    passable0: function() {
        if (!this._passableDirty) {
            return this._passable;
        } else {
            this._passable = true;
            var arr = this._passableEntities;
            for(var i = 0; i < arr.length; i++) {
                if (arr[i].isSolid()) {
                    this._passable = false;
                    break;
                }
            }
            this._passableDirty = false;

            return this._passable;
        }
    },
});

Crafty.c('EmptyTile', {
    init: function() {
        this.requires('spr_emptyTile, Actor')
            .tint(ArrayEx.random(["#005500", "#008800", "#00AA00", "#00FF00"]), 0.7);
        this.visible = false;

        return this;
    },
});

Crafty.c('Tree', {
    init: function() {
        this.requires('spr_tree, Actor')
            .tint("#00FF00", 0.7);
        this.visible = false;

        return this;
    },

    chopDown: function() {
        var loc = this.at();
        Crafty.e('Woodpile')
            .at(loc.x, loc.y);
        this.destroy();
        Crafty.trigger('TreeChoppedDown', this);
    }
});

Crafty.c('Bush', {
    init: function() {
        this.requires('spr_bush, Actor')
            .tint(ArrayEx.random(["#336600", "#883300"]), 0.7);
        this.visible = false;
        return this;
    },

    gather: function() {
        this.destroy();
        Crafty.trigger('BushGathered', this);
    }
});

Crafty.c('Woodpile', {
    init: function() {
        this.requires('spr_woodpile, Actor')
            .tint("#8B4513", 0.7);
        this.visible = false;
        return this;
    },

    pickUp: function() {
    }
});

Crafty.c('Rock', {
    init: function() {
        this.requires('spr_rock, Actor')
            .tint(ArrayEx.random(["#708090", "#999966", "#222217"]), 0.7);
        this.solid2D(true);
        this.visible = false;

        return this;
    },

    mine: function() {
        this.destroy();
        Crafty.trigger('RockMined', this);
    }
});

Crafty.c('LogTimePerFrame', {
    init: function() {
        this.requires('2D, Canvas');
        this.bind('MeasureFrameTime', function(e) {
            if (e > 17) {
                if(!Game.isSlow) {
                    console.log('Update time:' + e);
                    Game.isSlow = true;
                }
            } else {
                Game.isSlow = false;
            }
        });
    },
});