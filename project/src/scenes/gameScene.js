// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		for(var x = 0; x < 50; x++) {
			for(var y = 0; y < 32; y++) {
				var tile = Crafty.e('Canvas, spr_emptyTile, Tile');
				tile.tileX = x;
				tile.tileY = y;
				tile.x = x * 16;
				tile.y = y * 16;
			}
		}
		
		for(var i = 0; i < 10; i++) {
			var dwarf = Crafty.e('Canvas, spr_dwarf, Tile, AIController, Physics, Bounce, Collision');
			dwarf.tileX = i;
			dwarf.tileY = i;
			dwarf.x = i * 16;
			dwarf.y = i * 16;
			dwarf.z = 5;
		}

		for(var i = 0; i < 10; i++) {
			var tree = Crafty.e('Canvas, spr_tree, Tile');
			var tileX = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
			var tileY = Math.floor(Math.random() * (32 - 0 + 1)) + 0;
			tree.tileX = tileX;
			tree.tileY = tileY;
			tree.x = tileX * 16;
			tree.y = tileY * 16;
		}

		for(var i = 0; i < 20; i++) {
			var rock = Crafty.e('Canvas, spr_rock, Tile, Solid, Collision');
			var tileX = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
			var tileY = Math.floor(Math.random() * (32 - 0 + 1)) + 0;
			rock.tileX = tileX;
			rock.tileY = tileY;
			rock.x = tileX * 16;
			rock.y = tileY * 16;	
		}

		var physicsSystem = new PhysicsSystem();		
		var aiControllerSystem = new AIControllerSystem();
		var collisionSystem = new CollisionSystem();
		var mapBoundaryCollisionSystem = new MapBoundaryCollisionSystem();
		var solidCollisionSystem = new SolidCollisionSystem();

		var updateSystemsEntity = Crafty.e('Delay')
			.delay(function ()  {
				aiControllerSystem.update(100);
				physicsSystem.update(100);
				collisionSystem.update(100);
				mapBoundaryCollisionSystem.update(100);
				solidCollisionSystem.update(100);
			}, 100, -1);
	},
	function () {
		// on destory
	});