// loading scene
Crafty.scene('loading', function () {
	Crafty.background("#000");
    Crafty.e("2D, DOM, Text")
          .attr({ w: 100, h: 20, x: 150, y: 120 })
          .text("Loading...")
          .css({ "text-align": "center"})
          .textColor("#FFFFFF");

	Crafty.load(
		["assets/graphics/Master.png"],
		function() {
			// on load

			// Define the individual sprites in the image
	        // Each one (spr_tree, etc.) becomes a component
	        // These components' names are prefixed with "spr_"
	        // to remind us that they simply cause the entity
	        // to be drawn with a certain sprite
        	Crafty.sprite(
        		16,
            	'assets/graphics/Master.png', {
                Spr_transparent:  [0, 0],
                Spr_dead_dwarf:   [1, 0],
                Spr_dead_soldier: [2, 0],
                Spr_sapling:      [3, 0],
                Spr_tree:         [5, 0],
                Spr_bush:         [2, 1],
                Spr_village:      [1, 9],
                Spr_rock:         [2, 2],
                Spr_emptyTile:    [0, 6],
                Spr_woodpile:     [6, 1],
                Spr_dwarf:        [17, 0]
            });
			Crafty.scene('game');
		},
		function(e) {
			// on progress
		},
		function(e) {
			// on error
		});
});