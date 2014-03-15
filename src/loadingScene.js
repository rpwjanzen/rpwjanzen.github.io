// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function() {
    // Draw some text for the player to see in case the file
    // takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.pixleHeight / 2 - 24, w: Game.pixelWidth })
        .textFont($text_css);
 
    // Load our sprite map image
    Crafty.load(['assets/graphics/Master.png'], function() {
        // Once the images are loaded...
 
        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        // to remind us that they simply cause the entity
        // to be drawn with a certain sprite
        Crafty.sprite(16,
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