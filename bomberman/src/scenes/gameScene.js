Crafty.scene('Game',
    function() {
        Crafty.e('TimePerFrame');

        // TODO: Create map
        var map = [];
        for(var x = 0; x < 10; x++) {
        	map[x] = [];
        	for(var y = 0; y < 10; y++) {
        		// TODO: New tile?
        		map[x][y] = null;
        	}
        }

        var player = Crafty.c('');
    },
    function() {
    });