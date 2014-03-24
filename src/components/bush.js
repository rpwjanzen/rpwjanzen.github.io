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