// continuously moves toward any of the specified targets
Crafty.c('MoveTowardTargets', {
    init: function() {
        'use strict';
        this.requires('PathFind, Delay, Grid2D');
        this._blockedCount = 0;
        this._path = [];
        this.targets = [];

        var onDelay = function(e) {
            this._moveTowardTargets();
        };

        this.delay(onDelay, 1000, -1);
    },

    _moveTowardTargets: function() {
        'use strict';
        var targets = this.targets;
        var loc = this.at();

        if(targets.length === 0) {
            // no targets
            this._path = [];
            this._blockedCount = 0;
            return;
        }

        if (this._blockedCount > Math.floor(Math.random() * 20)) {
            this._blockedCount = 0;
            // re-calculate path
            this._path = this.aStars(loc, targets);
        }

        if (this._path.length === 0) {
            this._blockedCount = this._blockedCount + 1;
            // no path
            return;
        }

        // try to move to next place
        var nloc = this._path.pop();
        if (nloc.x === loc.x && nloc.y === loc.y) {
            this.trigger('ArrivedAtTarget', this);
            this._blockedCount = 0;
            return;
        }
        this.at(nloc.x, nloc.y);

        // check if move succeeded
        var cloc = this.at();
        if (cloc.x === loc.x && cloc.y === loc.y) {
            this._blockedCount = this._blockedCount + 1;
            // restore path
            this._path.push(nloc);
            // just wait; assume that path will eventually be unblocked
        } else {
            // move succeeded; reset blocked count
            this._blockedCount = 0;
        }
    }
});

