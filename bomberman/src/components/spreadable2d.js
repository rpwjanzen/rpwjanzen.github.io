Crafty.c('Spreadable2D', {
	// decreases by 1 each square. at 0 it runs out
	this.depth = 0,
	// 'FlowAroundObstacles', 'FlowCartesian', 'FlowIgnoreObstacles'
	this.spreadPattern = 'FlowAroundObstacles',
});