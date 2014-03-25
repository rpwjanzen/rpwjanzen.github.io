// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene(
    'Game',
    function() {
        Game.map_grid._tiles = new Array(Game.map_grid.width);
        for (var x = 0; x < Game.map_grid.width; x++) {
            Game.map_grid._tiles[x] = new Array(Game.map_grid.height);
            for (var y = 0; y < Game.map_grid.height; y++) {
                Game.map_grid._tiles[x][y] = Crafty.e('Tile');
                Game.map_grid._tiles[x][y].at(x,y);
            }
        }

        // Place a tree at every edge square on our grid of 16x16 tiles
        for (var x = 0; x < Game.map_grid.width; x++) {
            for (var y = 0; y < Game.map_grid.height; y++) {
                var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

                if (at_edge) {
                    // Place a tree entity at the current tile
                    var rock = Crafty.e('Rock').at(x, y);
                } else if (Math.random() < 0.3) {
                    var bush = Crafty.e('Bush').at(x, y);
                } else if (Math.random() < 0.3) {
                    var tree = Crafty.e('Tree').at(x, y);
                } else if (Math.random() < 0.3) {
                    var rock = Crafty.e('Rock').at(x, y);
                } else {
                    var et = Crafty.e('EmptyTile').at(x,y);
                }
            }
        }

        var allTrees = Crafty('Tree').get();
        var n = 0;
        do {
            var px = Math.floor(Math.random() * 48) + 1;
            var py = Math.floor(Math.random() * 48) + 1;
            if(Game.map_grid.tileAt(px,py).passable()) {
                var dwarf = Crafty.e('Dwarf');
                dwarf.at(px, py);

                for(var i = 0; i < allTrees.length; i++) {
                    dwarf.chopDownTree(allTrees[i]);
                }

                n = n + 1;
            }
        } while(n < 10);

        var tm = Crafty.e('TileDisplayManager');
        tm.tileDisplayManager(Game.map_grid._tiles);
        var chopWoodTool = new ChopWoodTool(Game.map_grid._tiles);

        Crafty.e('TimePerFrame');
    },
    function() {
    });