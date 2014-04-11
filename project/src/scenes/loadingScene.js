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
                spr_transparent:  [0, 0],
                spr_dead_dwarf:   [1, 0],
                spr_dead_soldier: [2, 0],
                spr_sapling:      [3, 0],
                spr_tree:         [5, 0],
                spr_bush:         [2, 1],
                spr_village:      [1, 9],
                spr_rock:         [2, 2],
                spr_emptyTile:    [0, 6],
                spr_woodpile:     [6, 1],
                spr_dwarf:        [17, 0]
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