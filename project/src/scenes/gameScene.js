// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		for(var x = 0; x < 50; x++) {
			for(var y = 0; y < 32; y++) {
				var tile = Crafty.e('Canvas, spr_emptyTile, tile');
				tile.tileX = x;
				tile.tileY = y;
				tile.x = x * 16;
				tile.y = y * 16;
			}
		}
		
		for(var i = 0; i < 10; i++) {
			var tile = Crafty.e('Canvas, spr_dwarf, tile, aiController, physics');
			tile.tileX = i;
			tile.tileY = i;
			tile.x = i * 16;
			tile.y = i * 16;
		}

		var physicsSystem = new PhysicsSystem();		
		var aiControllerSystem = new AIControllerSystem();

		var updateSystemsEntity = Crafty.e('Delay')
			.delay(function ()  {
				aiControllerSystem.update(100);
				physicsSystem.update(100);
			}, 100, -1);
	},
	function () {
		// on destory
	});