var timedEffects = {
	'Spread' : 0,
	'Vanish' : 1,
};

Crafty.c('TimedEffect', {
	// in milliseconds
	timeRemaining : 0,
	effectType : timedEffects.Spread,
});