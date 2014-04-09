Crafty.c('Highlight', {
    init: function() {
        this.requires('Multitint');

        this._activeTintId = 'Active';
        this._activeTint = "#0000FF";
        this._activeStrength = 0.75;

        this._inactiveTintId = 'Inactive';
        this._inactiveTint = "#000000";
        this._inactiveStrength = 0.0;

        this.addOrUpdateTint(this._inactiveTint, this._inactiveStrength, this._inactiveTintId);
        this.addOrUpdateTint(this._activeTint, this._activeStrength, this._activeTintId);
        this.active(false);

        return this;
    },

    inactiveTint: function(color, strength) {
        this._inactiveTint = color;
        this._inactiveStrength = strength;
        this.addOrUpdateTint(this._inactiveTint, this._inactiveStrength, this._inactiveTintId);
    },

    activeTint: function(color, strength) {
        this._activeTint = color;
        this._activeStrength = strength;
        this.addOrUpdateTint(this._activeTint, this._activeStrength, this._activeTintId);
    },

    active: function(val) {
        if(val === undefined) {
            return this.currentTint() === this._activeTintId;
        } else {
            if (val) {
                this.currentTint(this._activeTintId);
            } else {
                this.currentTint(this._inactiveTintId);
            }
        }
    }
});