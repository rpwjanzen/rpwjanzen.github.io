Crafty.c('TimePerFrame', {
    init: function() {
        this.requires('2D, Canvas');
        this.bind('MeasureFrameTime', function(e) {
            if (e > 17) {
                if(!Game.isSlow) {
                    console.log('Update time:' + e);
                    Game.isSlow = true;
                }
            } else {
                Game.isSlow = false;
            }
        });
    },
});