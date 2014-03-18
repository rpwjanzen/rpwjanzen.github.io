// http://eloquentjavascript.net/appendix2.html
function BinaryHeap(scoreFunction){
    if (!(this instanceof BinaryHeap)) {
        return new BinaryHeap(scoreFunction);
    }

    this._content = [];
    this._scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    // O(1)
    push: function(element) {
        // Add the new element to the end of the array.
        this._content.push(element);
        // Allow it to bubble up.
        this._bubbleUp(this._content.length - 1);
    },

    pop: function() {
        // Store the first element so we can return it later.
        var result = this._content[0];
        // Get the element at the end of the array.
        var end = this._content.pop();
        // If there are any elements left, put the end element at the start, and let it sink down.
        if (this._content.length > 0) {
            this._content[0] = end;
            this._sinkDown(0);
        }
        return result;
    },

    peek: function() {
        var root = this._content[0];
        return root;
    },

    // O(log n)
    remove: function(node) {
        var length = this._content.length;
        // To remove a value, we must search through the array to find it.
        for (var i = 0; i < length; i++) {
            if (this._content[i] !== node) {
                // node not found; keep searching
                continue;
            }
            
            // When it is found, the process seen in 'pop' is repeated to fill up the hole.
            var end = this._content.pop();
            if (i === length - 1) {
                // Element we popped was the one we needed to remove, we're done.
                break;
            }

            // Otherwise, we replace the removed element with the popped one, and allow it to float up or sink down as appropriate.
            this._content[i] = end;
            this._bubbleUp(i);
            this._sinkDown(i);
            break;
        }
    },

    // O(n)
    contains: function(node) {
        // TODO: Use binary tree fact to speed up search
        var length = this._content.length;
        for (var i = 0; i < length; i++) {
            if (this._content[i] === node) {
                return true;
            }
        }

        return false;
    },

    // O(log n)
    contains2: function(node) {
        var cost = this._scoreFunction(node);

        var parentIndex = 0;

        while(true) {
            // check parent
            var item = this._content[parentIndex];
            var itemCost = this._scoreFunction(item);
            if (itemCost === cost && node === item) {
                return true;
            }

            // check left child
            var leftIndex = this._leftChildIndex(index);
            if (leftIndex < this._content.length) {
                var leftItem = this._content[leftIndex];
                var leftCost = this._scoreFunction(leftItem);
                if(leftCost === cost && node === leftItem) {
                    return true;
                }
            }

            // check right child
            var rightIndex = this._rightChildIndex(index);
            if (rightIndex < this._content.length) {
                var rightItem = this._content[rightIndex];
                var rightCost = this._scoreFunction(rightItem);
                if(rightCost === cost && node === rightItem) {
                    return true;
                }
            }

            if (cost <= leftCost) {
                // check left tree
                parentIndex = leftIndex;
            } else {
                // Check right tree
                parentIndex = rightIndex;
            }
        }

        return false;
    },

    size: function() {
        return this._content.length;
    },

    _bubbleUp: function(n) {
        // Fetch the element that has to be moved.
        var element = this._content[n];
        var score = this._scoreFunction(element);
        // When at 0, an element can not go up any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            var parentIndex = this._parentIndex(n);
            var parent = this._content[parentIndex];
            
            if (score >= this._scoreFunction(parent)) {
                // Parent has a lesser score, things are in order and we are done.
                break;
            }

            // Otherwise, swap the parent with the current element and continue.
            this._content[parentIndex] = element;
            this._content[n] = parent;
            n = parentIndex;
        }
    },

    _sinkDown: function(n) {
        // Look up the target element and its score.
        var length = this._content.length;
        var element = this._content[n];
        var elemScore = this._scoreFunction(element);

        while(true) {
            // Compute the indices of the child elements.
            var child2Index = this._rightChildIndex(n);
            var child1Index = this._leftChildIndex(n);
            // This is used to store the new position of the element, if any.
            var swapIndex = null;
            var child1Score;
            // If the first child exists (is inside the array)...
            if (child1Index < length) {
                // Look it up and compute its score.
                var child1 = this._content[child1Index];
                child1Score = this._scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swapIndex = child1Index;
                }
            }

            // Do the same checks for the other child.
            if (child2Index < length) {
                var child2 = this._content[child2Index];
                var child2Score = this._scoreFunction(child2);
                if (child2Score < (swapIndex === null ? elemScore : child1Score)) {
                    swapIndex = child2Index;
                }
            }
            
            if (swapIndex === null) {
                // No need to swap further, we are done.
                break;
            }

            // Otherwise, swap and continue.
            this._content[n] = this._content[swapIndex];
            this._content[swapIndex] = element;
            n = swapIndex;
        }
    },

    _parentIndex: function(n) {
        return Math.floor((n + 1) / 2) - 1;
    },

    _leftChildIndex: function(n) {
        return ((n + 1) * 2) - 1;
    },

    _rightChildIndex: function(n) {
        return (n + 1) * 2;
    }
};