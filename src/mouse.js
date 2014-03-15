Crafty.c('MouseHighlight', {
    init: function() {
    this.requires('Mouse, Highlight')
        .bind('MouseOver', function(e) {
        this.active(true);
        })
        .bind('MouseOut', function (e) {
        this.active(false);
        });
    }
});