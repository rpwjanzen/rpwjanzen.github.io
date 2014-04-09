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