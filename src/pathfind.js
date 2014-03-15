Crafty.c('PathFind', {
    init: function() {
        this._map = Game.map_grid;
        return this;
    },

    aStars: function(startLoc, goalLocs) {
        var start = this._map.tileAt(startLoc.x, startLoc.y);
        var goalTiles = [];
        for(var i = 0; i < goalLocs.length; i++) {
            var gloc = goalLocs[i];
            var tile = this._map.tileAt(gloc.x, gloc.y);
            goalTiles.push(tile);
        }

        // Cost from start along best known path.
        var bestScore = {};
        bestScore[start[0]] = 0;
        
        // Estimated total cost from start to goal through y.
        var estScore = {};
        estScore[start[0]] = bestScore[start[0]] + this._heuristic_cost_estimates(startLoc, goalLocs);

        // The set of nodes already evaluated.
        var visited = [];

        // The set of tentative nodes to be evaluated, initially containing the start node
        var getScore = function(e) {
            return estScore[e[0]];
        };
        var toVisit = new BinaryHeap(getScore);
        toVisit.push(start);
        
        // The map of navigated nodes.
        var came_from = {};
 
        while (toVisit.size() > 0) {
            var i = 0,
                // the node in toVisit having the lowest estScore[] value
                currentTile = toVisit.pop();

            // check if found a path to any goal
            for(i = 0; i < goalTiles.length; i++) {
                var goal = goalTiles[i];
                if (currentTile[0] === goal[0]) {
                    // found path to a goal
                    return this._reconstruct_path(came_from, goal);
                }
            }
 
            toVisit.remove(currentTile);
            visited.push(currentTile[0]);

            var neighborTiles = this._neighbor_tiles(currentTile);
            for (var ni = 0; ni < neighborTiles.length; ni++) {
                var neighborTile = neighborTiles[ni];
                if (visited.indexOf(neighborTile[0]) !== -1) {
                    // already checked distance to node
                    continue;
                }
                
                // distance between neighbour nodes in grid is always 1
                var tentativeBestScore = bestScore[currentTile[0]] + 1;
                var isVisited = toVisit.contains(neighborTile);
                if (!isVisited || tentativeBestScore < bestScore[neighborTile[0]]) {
                    // record best path so we can track it later
                    came_from[neighborTile[0]] = currentTile;
                    // update to newest best score
                    bestScore[neighborTile[0]] = tentativeBestScore;
                    estScore[neighborTile[0]] = bestScore[neighborTile[0]] + this._heuristic_cost_estimates(neighborTile.at(), goalLocs);
                    
                    if (!isVisited) {
                        // add neighbor to toVisit
                        toVisit.push(neighborTile);
                    }
                }
            }
        }
        
        // no path to target 
        return [];
    },

    _neighbor_tiles: function(tile) {
        var loc = tile.at();
        var lx = loc.x;
        var ly = loc.y;
        var candidateTile = null;
        
        var ts = [];
        if (ly > 0) {
            candidateTile = this._map.tileAt(lx, ly - 1);
            if (candidateTile.passable()) {
                ts.push(candidateTile);
            }
        }
        if (lx > 0) {
            candidateTile = this._map.tileAt(lx - 1, ly);
            if (candidateTile.passable()) {
                ts.push(candidateTile);
            }
        }

        if (lx < this._map.width - 1) {
            candidateTile = this._map.tileAt(lx + 1, ly);
            if (candidateTile.passable()) {
                ts.push(candidateTile);
            }
        }
        if (ly < this._map.height - 1) {
            candidateTile = this._map.tileAt(lx, ly + 1);
            if (candidateTile.passable()) {
                ts.push(candidateTile);
            }
        }

        return ts;
    },

    _heuristic_cost_estimates: function(startLoc, goalLocs) {
        var minEstDistance = this._manhattanDistance(startLoc, goalLocs[0]);
        for(var i = 1; i < goalLocs.length; i++) {
            minEstDistance = Math.min(minEstDistance, this._manhattanDistance(startLoc, goalLocs[i]));
        }

        return minEstDistance;
    },

    _manhattanDistance: function(startLoc, goalLoc) {
        var dx = Math.abs(startLoc.x - goalLoc.x);
        var dy = Math.abs(startLoc.y - goalLoc.y);
        // * 1.001 to break ties
        return (dx + dy) * 1.001;
    },

    _reconstruct_path: function(came_from, goal) {
        var gloc = goal.at();
        var arr = [{ x: gloc.x, y: gloc.y }];
        var from = came_from[goal[0]];
        do {
            if (from === undefined) {
                return arr;
            } else {
                var loc = from.at();
                arr.push({ x: loc.x, y: loc.y });
                from = came_from[from[0]];
            }
        } while(true);
    }
});