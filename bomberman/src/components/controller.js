// controller component?
var actionTypes = {
	moveUp : 0,
	moveLeft : 1,
	moveRight: 2,
	moveDown : 3,
	dropBomb : 4,
};

Crafty.c('Controller', {
	this.actionType = null,
});