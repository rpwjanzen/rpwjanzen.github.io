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