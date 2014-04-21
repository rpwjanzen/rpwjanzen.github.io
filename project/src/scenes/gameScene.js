// game scene
Crafty.scene(
	'game',
	function () {
		// on start
		
		for(var x = 0; x < 50; x++) {
			for(var y = 0; y < 32; y++) {
				var tile = Crafty.e('Canvas, 2D, Spr_sapling, Tile, Selectable, Tint');
				tile.tileX = x;
				tile.tileY = y;
				tile.x = x * 16;
				tile.y = y * 16;
			}
		}
		/*
		for(var i = 0; i < 10; i++) {
			var dwarf = Crafty.e('Canvas, 2D, Spr_dwarf, Tile, AIController, Physics, Bounce, Collision, Selectable, Tint');
			dwarf.tileX = i;
			dwarf.tileY = i;
			dwarf.x = i * 16;
			dwarf.y = i * 16;
			dwarf.z = 5;
		}
		
		
		for(var i = 0; i < 10; i++) {
			var tree = Crafty.e('Canvas, 2D, Spr_tree, Tile, Selectable, Tint');
			var tileX = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
			var tileY = Math.floor(Math.random() * (32 - 0 + 1)) + 0;
			tree.tileX = tileX;
			tree.tileY = tileY;
			tree.x = tileX * 16;
			tree.y = tileY * 16;
		}

		for(var i = 0; i < 100; i++) {
			var rock = Crafty.e('Canvas, 2D, Spr_rock, Tile, Solid, Collision, Selectable, Tint');
			var tileX = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
			var tileY = Math.floor(Math.random() * (32 - 0 + 1)) + 0;
			rock.tileX = tileX;
			rock.tileY = tileY;
			rock.x = tileX * 16;
			rock.y = tileY * 16;	
		}
		*/
		
		// HACK: Need mouse entity so that mouse-related systems will update
		var myEntity = Crafty.e("2D, Canvas, Mouse, Tile, Color")
		     .attr({x: 0, y: 0, w: 32, h: 32, z:0 })
			 .color('green');
		myEntity.tileY = 0;
		myEntity.tileX = 0;
		
		//var physicsSystem = new PhysicsSystem();		
		//var aiControllerSystem = new AIControllerSystem();
		//var collisionSystem = new CollisionSystem();
		//var mapBoundaryCollisionSystem = new MapBoundaryCollisionSystem();
		//var solidCollisionSystem = new SolidCollisionSystem();
		
		var mouseSelectionSystem = new MouseSelectionSystem();
		var highlightSelectedItemsSystem = new HighlightSelectedItemsSystem();

		var updateSystemsEntity = Crafty.e('Delay')
			.delay(function ()  {
				//aiControllerSystem.update(1000);
				//physicsSystem.update(1000);
				//collisionSystem.update(1000);
				//mapBoundaryCollisionSystem.update(1000);
				//solidCollisionSystem.update(1000);
			}, 1000, -1);
			
		var updateUISystemsEntity = Crafty.e('Delay')
			.delay(function () {
				mouseSelectionSystem.update(500);
				highlightSelectedItemsSystem.update(500);
			}, 500, -1);
	},
	function () {
		// on destory
	});