Crafty.c('MouseSelectable', {
    init: function() {
        this.requires('Mouse, Selectable');
        var handleClick = function(e) {
            if (e.mouseButton === Crafty.mouseButtons.LEFT) {
                this.isSelected = true;
            }
        };

        this.bind('Click', handleClick)
            .bind('RemoveComponent', function(id) {
                if (id === 'MouseSelectable') {
                    this.unbind('Click', handleClick);
                }
            });
    }
});