ArrayEx = {
    random: function(arr) {
        if (arr.length == 0)
        {
            throw Error("length must be at least 1");
        }

        var index = Math.floor(Math.random() * arr.length); 
        return arr[index];
    },

    remove: function (arr, elem) {
        var idx = arr.indexOf(elem);
        if (idx > -1) {
            // modify array in place
            arr.splice(idx, 1);
            return true;
        }

        return false;
    },

    where: function(arr, f) {
        var results = [];
        for(var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (f(item)) {
                results.push(item);
            }
        }
    }
};