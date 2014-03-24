Crafty.c('Multitint', {
    init: function() {
        this.requires('DarkerTint');

        this._colors = {};
        this._activeColorId = null;
    },

    addOrUpdateTint: function (color, strength, id) {
        this._colors[id] = { 'color': color, 'strength': strength };

        if (this._activeColorId === id) {
            this.tint(color, strength);
        }

        return this;
    },

    currentTint: function (id) {
        if (id === undefined) {
            return this._activeColorId;
        } else {
            this._activeColorId = id;
            var c = this._colors[id];
            this.tint(c.color, c.strength);
        }
    },  
});