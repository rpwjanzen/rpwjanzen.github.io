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