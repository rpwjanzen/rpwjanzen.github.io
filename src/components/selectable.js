Crafty.c('Selectable', {
    init: function() {
        this._isSelected = false;
    },

    select: function(val) {
        if (val === undefined)
        {
            return this._isSelected;
        } else {
            this._isSelected = val;
            return this;
        }
    }
});