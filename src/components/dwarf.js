Crafty.c('Dwarf', {
    init: function() {
        this._treesToChopDown = [];
        this.requires('spr_dwarf, Actor, MoveTowardTargets')
            .bind('ArrivedAtTarget', function(e) {
            this._chopDownTreeHere();
        });
        this.visible = false;

        this.solid2D(true);
        return this;
    },

    chopDownTree: function(tree) {
        var treeLoc = tree.at();
        this._treesToChopDown.push(tree);
        this.targets.push(treeLoc);
        var that = this;
        tree.bind('Remove', function(e) {
            // ignore trees once cut down
            ArrayEx.remove(that._treesToChopDown, tree);
            ArrayEx.remove(that.targets, treeLoc);
        });
    },

    _chopDownTreeHere: function() {
        var loc = this.at();
        for(var i = 0; i < this._treesToChopDown.length; i++) {
            var tree = this._treesToChopDown[i];
            var treeLoc = tree.at();
            if (treeLoc.x === loc.x && treeLoc.y === loc.y) {
                tree.chopDown();
                return;
            }
        }
    },
});