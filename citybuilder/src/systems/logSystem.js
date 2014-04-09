// log system
function LogSystem() {
    update: function() {
        Crafty('LogMessage')
            .each(function(i) {
                if (this.message) {
                    console.log(this.message);
                }
            });
    };
};