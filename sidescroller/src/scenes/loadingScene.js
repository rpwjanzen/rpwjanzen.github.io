// loading scene
Crafty.scene('loading', function () {
	Crafty.background("#000");
    Crafty.e("2D, DOM, Text")
          .attr({ w: 100, h: 20, x: 150, y: 120 })
          .text("Loading...")
          .css({ "text-align": "center"})
          .textColor("#FFFFFF");

	Crafty.load(
		["assets/graphics/enemies/13.png"],
		function() {
			// on load
        	Crafty.sprite(
        		32,
            	'assets/graphics/enemies/13.png',
				{
                	Spr_ship:  [0, 0]
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