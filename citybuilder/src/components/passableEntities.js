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