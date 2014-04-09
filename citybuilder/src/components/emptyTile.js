Crafty.c('EmptyTile', {
    init: function() {
        this.requires('spr_emptyTile, Actor')
            .tint(ArrayEx.random(["#005500", "#008800", "#00AA00", "#00FF00"]), 0.7);
        this.visible = false;

        return this;
    },
});