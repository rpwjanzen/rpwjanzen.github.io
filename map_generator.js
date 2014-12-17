"use strict";
    
function Sector(name, x, y, objects) {
	if (!(this instanceof Sector)) {
		return new Sector(name, x, y, objects);
	}
	
    this.name = name || '';
    this.x = x || 0;
    this.y = y || 0;
    this.objects = object || [];

	return this;
};

function SectorGenerator() {
	this.types = [{ name: 'P', p: 0.5 },
		{ name: 'A', p: 0.25 },
		{ name: ' ', p:0.65 }];
	
    this.generateSector = function () {
		var x = 0;
		var y = 0;
		var name = x + ' ' + y;
		var objects = [[]];
		for(x = 0;  x < 10; x++) {
			for(y = 0; y < 10; y++) {
				var index = Math.floor(Math.random() * this.types.length);
				var itemName = this.types[index].name;
				var e = Crafty.e('2D, DOM, Color')
					.attr({x: x * 20, y: y * 20, w: 20, h: 20})
			    	.color(index == 0 ? '#FF0000' : (index == 1 ? '#00FF00' : '#0000FF'));
				objects[x][y] = e;
			}
		}
		
		var sector = new Sector(x, y, name, objects);
		return sector;
    };
    
    return this;
}