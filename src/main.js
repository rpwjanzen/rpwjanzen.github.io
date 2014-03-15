Game = {
    start: function () {
        Crafty.init();

        Crafty.sprite(32, "assets/images/blocks.png", {
            spr_grass: [5,4],
            //spr_grassHighlight: [5,5],
            spr_stone: [0,1],
            //spr_stoneHighlight: [1,1],
        });

        Crafty.sprite(32, "assets/images/objects.png", {
            spr_highlight: [3,16],
        });

        Crafty.c('highlight_blue', {
            init: function() {
                this.requires('Tint, Mouse')
                    .bind("MouseOver", function(e) {
                        this.tint('#0000FF', 0.7);
                    }).bind("MouseOut", function(e) {
                        this.tint('#000000', 0);
                    });
                //this.tint("#000000", 0);
                return this;
            },
        });

        Crafty.c('Tile', {
            init: function() {
                this.requires('2D, Canvas, highlight_blue')
                    // restrict mouse events to area block is visible for
                    .areaMap([16,0],[32,8],[32,24],[16,32],[0,24],[0,8]);
            }
        });

        Crafty.c('grass', {
            init: function() {
                this.requires('spr_grass, Tile');
            },
        });

        Crafty.c('stone', {
            init: function() {
                this.requires('spr_stone, Tile');
            },
        });
        
        var iso = Crafty.isometric.size(32);
        var z = 0;
        for(var x = 20; x >= 0; x--) {
            for(var y = 0; y < 64; y++) {
                var which = Math.floor(Math.random() * 2);
                var tile = Crafty.e((!which ? "grass" : "stone"))
                    .attr('z', x + 1 * y + 1)
                    // restrict mouse events to area block is visible for
                    .areaMap([16,0],[32,8],[32,24],[16,32],[0,24],[0,8])
                    .bind("Click", function(e) {
                        //destroy on left click
                        if(e.mouseButton === Crafty.mouseButtons.LEFT) {
                            this.destroy();
                        }
                    });
                
                iso.place(x, y, 0, tile);
            }
        }
        /*

        Crafty.addEvent(this, Crafty.stage.elem, "MouseDown", function(e) {
            if(e.button > 1) {
                return;
            }
            var base = { x: e.clientX, y: e.clientY };

            function scroll(e) {
                var dx = base.x - e.clientX,
                    dy = base.y - e.clientY;
                    base = {x: e.clientX, y: e.clientY};
                Crafty.viewport.x -= dx;
                Crafty.viewport.y -= dy;
            };

            Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
            Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
                Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
            });
        });
*/
    }
};