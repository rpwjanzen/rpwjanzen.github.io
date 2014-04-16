// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		for(var x = 0; x < 50; x++) {
			for(var y = 0; y < 32; y++) {
				var tile = Crafty.e('Canvas, Spr_emptyTile, Tile, Selectable');
				tile.tileX = x;
				tile.tileY = y;
				tile.x = x * 16;
				tile.y = y * 16;
			}
		}
		
		for(var i = 0; i < 10; i++) {
			var dwarf = Crafty.e('Canvas, Spr_dwarf, Tile, AIController, Physics, Bounce, Collision, Selectable');
			dwarf.tileX = i;
			dwarf.tileY = i;
			dwarf.x = i * 16;
			dwarf.y = i * 16;
			dwarf.z = 5;
		}

		for(var i = 0; i < 10; i++) {
			var tree = Crafty.e('Canvas, Spr_tree, Tile, Selectable');
			var tileX = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
			var tileY = Math.floor(Math.random() * (32 - 0 + 1)) + 0;
			tree.tileX = tileX;
			tree.tileY = tileY;
			tree.x = tileX * 16;
			tree.y = tileY * 16;
		}

		for(var i = 0; i < 100; i++) {
			var rock = Crafty.e('Canvas, Spr_rock, Tile, Solid, Collision, Selectable');
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
		var selectionSystem = new SelectionSystem();

		var updateSystemsEntity = Crafty.e('Delay')
			.delay(function ()  {
				aiControllerSystem.update(1000);
				physicsSystem.update(1000);
				collisionSystem.update(1000);
				mapBoundaryCollisionSystem.update(1000);
				solidCollisionSystem.update(1000);
				selectionSystem.update(1000);
			}, 1000, -1);
	},
	function () {
		// on destory
	});