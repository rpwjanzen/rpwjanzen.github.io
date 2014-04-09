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