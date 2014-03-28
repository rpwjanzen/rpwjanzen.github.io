var spreadTypes = {
	'FlowAroundObstacles': 0,
	'FlowCartesian': 1,
	'FlowIgnoreObstacles' : 2,
};

Crafty.c('Spreadable', {
	// decreases by 1 each square. at 0 it runs out
	depth : 0,
	spreadType : spreadTypes.FlowAroundObstacles,
});