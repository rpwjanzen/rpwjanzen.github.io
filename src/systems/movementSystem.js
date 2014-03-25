function MovementSystem() {
   update: function() {
        Crafty('Position Velocity')
            .each(function(i) {
                this.position.x = this.position.x + this.velocity.x;
                this.position.y = this.position.y + this.velocity.y;
            });
   } 
});
