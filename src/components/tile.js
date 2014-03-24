Crafty.c('Tile', {
    init: function() {
        this._itemIndex = 0;
        this._items = [];
        this._itemDirty = true;
        this._isSelected = false;

        this.requires('2D, Canvas, Grid2D, PassableEntities, DarkerTint, Sprite, spr_transparent, Mouse');
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
        this.drawNextItem();
        
        return this;
    },

    passable: function() {
        return this.passable0();
    },

    selected : function(val) {
        if (val === 'undefined') {
            return this._isSelected;
        } else {
            if (this._isSelected === val) {
                return;
            }

            this._isSelected = val;
            this._itemDirty = true;
        }
    },

    drawNextItem: function() {
        if (!this._itemDirty) {
            return;
        }

        var tintColor;
        var strength;
        var coord;
        if (this._items.length === 0) {
            this._itemDirty = false;
        } else if (this._items.length === 1) {
            this._itemIndex = 0;

            item = this._items[this._itemIndex];
            coord = item.__coord;
            tintColor = item._color;
            strength = item._strength;
            this._itemDirty = false;
        } else {
            this._itemIndex = (this._itemIndex + 1) % this._items.length;

            item = this._items[this._itemIndex];
            coord = item.__coord;
            tintColor = item._color;
            strength = item._strength;
            this._itemDirty = false;
        }

        if (coord) {
            var x = Math.floor(coord[0] / 16);
            var y = Math.floor(coord[1] / 16);
            this.sprite(x,y);
        } else {
            this.sprite(0,0);
        }

        if (this._isSelected) {
            this.tint('#FFFF00', 0.7);
        } else if (tintColor && strength) {
            this.tint(tintColor, strength);
        } else {
            this.tint('#000000', 0);
        }
    }
});