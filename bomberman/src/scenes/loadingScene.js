Crafty.scene('Loading', function() {
    Crafty.e('2D, DOM, Text')
        .text('Loading...');
 
    Crafty.load(['assets/sprite.png'], function() {
        Crafty.sprite(16,
            'assets/sprite.png', {
                spr_grass0: [0, 0],
                spr_grass1: [1, 0],
                spr_grass2: [2, 0],
                spr_grass3: [3, 0],
                spr_bomb0:  [4, 0],
                spr_bomb1:  [5, 0],

                spr_rose0:  [0, 1],
                spr_rose1:  [1, 1],
                spr_rose2:  [2, 1],
                spr_rose3:  [3, 1],

                spr_bush0:  [0, 2],
                spr_bush1:  [1, 2],
                
                spr_walkdown0:  [0, 3],
                spr_walkdown1:  [1, 3],
                spr_walkdown2:  [2, 3],
                spr_walkup0:    [3, 3],
                spr_walkup1:    [4, 3],
                spr_walkup2:    [5, 3],
                spr_walkleft0:  [6, 3],
                spr_walkleft1:  [7, 3],
                spr_walkleft2:  [8, 3],
                spr_walkright0: [9, 3],
                spr_walkright1: [10, 3],
                spr_walkright2: [11, 3],
            });

        // Now that our sprites are ready to draw, start the game
        Crafty.scene('Game');
    },
    function(e) {
        // progress
    },
    function(e) {
        // error loading
    });
});