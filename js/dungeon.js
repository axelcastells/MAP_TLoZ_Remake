var gameEngine = gameEngine || {};

gameEngine.dungeon ={
    preload:function(){
        //Set up physics and canvas scaling options
        this.worldCellSize = 240;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(240, 240);
        this.game.world.setBounds(0, 0, 2000, 2000); 
        this.actualCellX = 1;
        this.actualCellY = 2;
        this.newPositionFound = false;    
        this.createLevelChange = false;
        this.once = true;
        
        //SPAWN POINTS
        this.enemySpawnPool = {};
        this.enemySpawnPool.rope = [];
        this.enemySpawnPool.keese = [];
        
        this.enemySpawnPool.rope.push(new Phaser.Point(2,20));
        this.enemySpawnPool.rope.push(new Phaser.Point(7,21));
        this.enemySpawnPool.rope.push(new Phaser.Point(9,24));
        this.enemySpawnPool.rope.push(new Phaser.Point(32,20));
        this.enemySpawnPool.rope.push(new Phaser.Point(37,22));
        
        this.enemySpawnPool.keese.push(new Phaser.Point(3,23));
        this.enemySpawnPool.keese.push(new Phaser.Point(22,41));
        this.enemySpawnPool.keese.push(new Phaser.Point(35,21));
        this.enemySpawnPool.keese.push(new Phaser.Point(31,25));
        this.enemySpawnPool.keese.push(new Phaser.Point(21,24));


    },
    create:function(){
        SYSTEM_CONSTANTS.LINK_DATA.ACTUAL_LEVEL = 1;
        gameEngine.saveGame();
        //Link default location
        this.defaultLocationX = this.worldCellSize / 2 + this.worldCellSize * this.actualCellX;
        this.defaultLocationY = this.worldCellSize / 2 + this.worldCellSize * this.actualCellY;
        
        //Map Creation
        this.game.stage.backgroundColor = '#000000';
        this.map = this.game.add.tilemap('dungeon');
        this.map.addTilesetImage('dungeonTileset');
        
        this.map.createLayer('background');
        
        this.walls = this.map.createLayer('walls');
        this.map.setCollisionBetween(1,222,true,'walls');
        
        this.map.createLayer('decorative');
        
        this.mapCollisions = this.map.createLayer('collisions');
        this.map.setCollisionBetween(1,178,true,'collisions');
        
        this.map.createLayer('opened');
        
        this.map.createLayer('interactables');
        
        //Interactable
        this.inter = new gameEngine.interactables_prefab(this.game, 21 * 16 + 8, 34 * 16 + 8, 2, 0.5, this);
        this.game.add.existing(this.inter);

        
        //Link creation
        this.link = new gameEngine.link_prefab(this.game, this.worldCellSize / 2 + this.worldCellSize * this.actualCellX  , this.worldCellSize / 2 + this.worldCellSize * this.actualCellY, this);
        this.game.add.existing(this.link);
        
        //Link attack hitbox created
        this.hitbox = new gameEngine.hitbox_prefab(this.game, this.link, false, 500, 600, 70, 50, 16, 0, this);
        this.game.add.existing(this.hitbox);
        
        //Simple camera movement
        this.game.camera.x = this.link.x - this.worldCellSize / 2;
        this.game.camera.y = this.link.y - this.worldCellSize / 2;
        
        //Camera reference point
        this.newCameraPositionX = this.game.camera.x;
        this.newCameraPositionY = this.game.camera.y;
        
        //Audio creation
        this.backgroundMusic = this.add.audio('dungeonMusic', 1, true, true);
        this.backgroundMusic.play();
        
        //Teleports startup
        //Teleport creation
        this.tp = new gameEngine.teleport_prefab(this.game, 17 * 16 + 8, 35 * 16 + 8, 6 * 16, 38 * 16 , 0, this);
        this.game.add.existing(this.tp);
        
        this.tp2 = new gameEngine.teleport_prefab(this.game, 3 * 16 + 8, 35 * 16 + 8, 36 * 16 + 8, 25 * 16 + 8, 0, this);
        this.game.add.existing(this.tp2);
        
        this.tp3 = new gameEngine.teleport_prefab(this.game, 10 * 16 + 8, 35 * 16 + 8, this.defaultLocationX, this.defaultLocationY, 0, this);
        this.game.add.existing(this.tp3);
        
        this.tp4 = new gameEngine.teleport_prefab(this.game, 36 * 16 + 8, 19 * 16 + 8, 37 * 16, 10 * 16, 0, this);
        this.game.add.existing(this.tp4);
        
        this.tp5 = new gameEngine.teleport_prefab(this.game, 42 * 16 + 8, 4 * 16 + 8, this.defaultLocationX, this.defaultLocationY, 0, this);
        this.game.add.existing(this.tp5);
        
        this.tp6 = new gameEngine.teleport_prefab(this.game, 31 * 16 + 8, 4 * 16 + 8, 6 * 16 , 25 * 16, 0, this);
        this.game.add.existing(this.tp6);
        
        this.tp7 = new gameEngine.teleport_prefab(this.game, 7 * 16 + 8, 19 * 16 + 8, 7 * 16 , 11 * 16, 0, this);
        this.game.add.existing(this.tp7);
        
        this.tp8 = new gameEngine.teleport_prefab(this.game, 5 * 16 + 8, 10 * 16 + 8, this.defaultLocationX, this.defaultLocationY, 0, this);
        this.game.add.existing(this.tp8);
        
        this.tp9 = new gameEngine.teleport_prefab(this.game, 8 * 16 + 8, 10 * 16 + 8, 36 * 16 , 40 * 16, 0, this);
        this.game.add.existing(this.tp9);
        
        this.tp10 = new gameEngine.teleport_prefab(this.game, 32 * 16 + 8, 39 * 16 + 8, this.defaultLocationX, this.defaultLocationY, 0, this);
        this.game.add.existing(this.tp10);
        
        this.tp11 = new gameEngine.teleport_prefab(this.game, 41 * 16 + 8, 39 * 16 + 8, 22 * 16 , 10 * 16, 0, this);
        this.game.add.existing(this.tp11);
        
        this.tp12 = new gameEngine.teleport_prefab(this.game, 25 * 16 + 8, 10 * 16 + 8, this.defaultLocationX, this.defaultLocationY, 0, this);
        this.game.add.existing(this.tp12);
        
        //Pickup
        this.pickup = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.KEY,  22 * 16 + 8, 6 * 16 + 8, this);
        this.game.add.existing(this.pickup);
        
        //Load enemies
        this.loadEnemies();
        
        //HUD creation
        this.createHud();
        
        this.pause = new gameEngine.pauseMenu_prefab(this.game, this);

    },
    loadEnemies:function()
    {
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
    },
    createEnemy:function(type, x, y)
    {
        var enemy = this.enemies.getFirstExists(false);
        //Cell positioning
    
        this.cell = 0;
        while(x > (this.cell + 1)* 256){
            this.cell++;
        }
        this.cellX = this.cell;

        this.cell = 0;
        while(y > (this.cell + 1)* 256){
            this.cell++;
        }
        this.cellY = this.cell;
        
        if(!enemy && this.actualCellX == this.cellX && this.actualCellY == this.cellY)
        {
            enemy = new gameEngine.enemy_prefab(this.game, type, x, y, this);
            this.enemies.add(enemy);
        }
    },
    
    update:function(){
                
//        this.game.debug.body(this.link);
//        if(this.hitbox.active){
//            this.game.debug.body(this.hitbox);
//        }
        
        if(this.inter.activated && this.link.keysCounter > 0){
            this.createLevelChange = true;
        }
        
        if(this.cellChange && !this.newPositionFound){
            this.spawnEnemies();
            this.cellChange = false;
        }
        
        if(this.createLevelChange == true && this.once == true){
            //Level change
            this.lvlC = new gameEngine.level_change(this.game, 22 * 16, 33 * 16, 'boss_room', this);
            this.game.add.existing(this.lvlC);
            this.map.removeTile( 21, 33,'interactables');
            this.map.removeTile( 22, 33,'interactables');
            this.map.removeTile( 21, 34,'interactables');
            this.map.removeTile( 22, 34,'interactables');
            this.createLevelChange = false;
            this.once = false;
        }
        
        this.smoothCamera();    
        
    },
    smoothCamera:function(){
        if(!this.pause.paused){        
            if( this.math.difference(this.link.x, this.game.camera.x + this.worldCellSize / 2) > this.worldCellSize / 2 && this.newPositionFound == false){

                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;

                if (this.link.x - this.game.camera.x < 0){

                    this.newCameraPositionX -= this.worldCellSize;                
                    this.actualCellX -= 1;
                    this.newPositionFound = true;
                    this.cellChange = true;

                }

                else if(this.link.x - this.game.camera.x > this.worldCellSize - 1){

                    this.newCameraPositionX += this.worldCellSize;
                    this.actualCellX += 1;
                    this.newPositionFound = true;
                    this.cellChange = true;
                }
            }

            else if( this.math.difference(this.link.y, this.game.camera.y + this.worldCellSize / 2) > this.worldCellSize / 2 && this.newPositionFound == false){

                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;

                if (this.link.y - this.game.camera.y < 0){

                    this.newCameraPositionY -= this.worldCellSize;
                    this.actualCellY -= 1;
                    this.newPositionFound = true;
                    this.cellChange = true;
                }
                else if(this.link.y - this.game.camera.y > this.worldCellSize - 1){

                    this.newCameraPositionY += this.worldCellSize;
                    this.actualCellY += 1;
                    this.newPositionFound = true;
                    this.cellChange = true;
                }
            }

            if(this.newPositionFound == true){

                if (this.newCameraPositionX - this.game.camera.x < 0){                
                    this.game.camera.x -= 8;
                }

                if(this.newCameraPositionX - this.game.camera.x > 0){                
                    this.game.camera.x += 8;
                }

                if (this.newCameraPositionY - this.game.camera.y < 0){                
                    this.game.camera.y -= 8;
                }
                if(this.newCameraPositionY - this.game.camera.y > 0){
                    this.game.camera.y += 8;
                }
            }


            if(this.newCameraPositionX == this.game.camera.position.x && this.newCameraPositionY == this.game.camera.position.y){
                this.newPositionFound = false;
            }
        }
    },
    
    createHud:function(){
        //Hud creation
        this.hudCounter = new gameEngine.HUD_counter_prefab(this.game, this.worldCellSize - 21, 10, 'letter', this.link.lettersCounter, this);
        this.hudCounter.fixedToCamera = true;
        this.game.add.existing(this.hudCounter);
        
        this.hudCounter2 = new gameEngine.HUD_counter_prefab(this.game, this.worldCellSize - 21, 28, 'key', this.link.keysCounter, this);
        this.hudCounter2.fixedToCamera = true;
        this.game.add.existing(this.hudCounter2);
        
        this.hudItem = new gameEngine.HUD_item_prefab(this.game, this.worldCellSize - 10, this.worldCellSize - 20, 'buttonB', this);
        this.hudItem.fixedToCamera = true;
        this.game.add.existing(this.hudItem);
        
        this.hudItem2 = new gameEngine.HUD_item_prefab(this.game, this.worldCellSize - 32, this.worldCellSize - 20, 'buttonA', this);
        this.hudItem2.fixedToCamera = true;
        this.game.add.existing(this.hudItem2);
        
        this.hudHealth = new gameEngine.HUD_health_prefab(this.game, 10, 10, this.link.life,  this);
        this.hudHealth.fixedToCamera = true;
        this.game.add.existing(this.hudHealth);
    },
    spawnEnemies:function(){
        //ENEMY CREATION
        
        //Ropes
        for(var i = 0; i < this.enemySpawnPool.rope.length; i++)
        {
            var temp = this.enemySpawnPool.rope[i];
            //console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.ROPE, temp.x*16, temp.y*16);
        }
        
        //Keeses
        
        for(var i = 0; i < this.enemySpawnPool.keese.length; i++)
        {
            var temp = this.enemySpawnPool.keese[i];
            //console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.KEESE, temp.x*16, temp.y*16);
        }
        
    }
}