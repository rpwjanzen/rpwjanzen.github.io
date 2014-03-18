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

Crafty.c('Multitint', {
    init: function() {
        this.requires('DarkerTint');

        this._colors = {};
        this._activeColorId = null;
    },

    addOrUpdateTint: function (color, strength, id) {
        this._colors[id] = { 'color': color, 'strength': strength };

        if (this._activeColorId === id) {
            this.tint(color, strength);
        }

        return this;
    },

    currentTint: function (id) {
        if (id === undefined) {
            return this._activeColorId;
        } else {
            this._activeColorId = id;
            var c = this._colors[id];
            this.tint(c.color, c.strength);
        }
    },  
});

Crafty.c("DarkerTint", {
    _rgbaColor: null,
    _color: null,
    _strength: 1.0,

    init: function () {
        var draw = function (e) {
            var context = e.ctx || Crafty.canvas.context;

            context.globalCompositeOperation = "darker";
            context.fillStyle = this._rgbaColor || "rgba(0,0,0,0)";
            context.fillRect(e.pos._x, e.pos._y, e.pos._w, e.pos._h);
        };

        this.bind("Draw", draw)
            .bind("RemoveComponent", function (id) {
                if (id === "DarkerTint") {
                    this.unbind("Draw", draw);
                }
        });
    },

    tint: function (color, strength) {
        this._strength = strength;
        this._color = color;
        this._rgbaColor = Crafty.toRGB(color, this._strength);

        this.trigger("Invalidate");
        return this;
    },
});

Crafty.c('MouseSelectable', {
    init: function() {
        this.requires('Mouse, Selectable');
        var handleClick = function(e) {
            if (e.mouseButton === Crafty.mouseButtons.LEFT) {
                this.select(!this.select);
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

Crafty.c('Selectable', {
    init: function() {
        this._isSelected = false;
    },

    select: function(val) {
        if (val === undefined)
        {
            return this._isSelected;
        } else {
            this._isSelected = val;
            return this;
        }
    }
})