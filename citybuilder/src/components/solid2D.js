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