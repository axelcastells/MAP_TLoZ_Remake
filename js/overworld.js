var gameEngine = gameEngine || {};

gameEngine.overworld ={
    preload:function(){
        this.worldCellSize = 256;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(256, 256);
        this.game.world.setBounds(0, 0, 2000, 2000); 
        this.actualCellX = 2;
        this.actualCellY = 3;
        this.newPositionFound = false;

        //SPAWN POINTS
        this.enemySpawnPool = {};
        this.enemySpawnPool.floor = [];
        this.enemySpawnPool.floor.push(new Phaser.Point(35,50));
        this.enemySpawnPool.floor.push(new Phaser.Point(44,50));
        this.enemySpawnPool.floor.push(new Phaser.Point(34,34));
        this.enemySpawnPool.floor.push(new Phaser.Point(45,34));
        this.enemySpawnPool.floor.push(new Phaser.Point(34,45));
        this.enemySpawnPool.floor.push(new Phaser.Point(45,45));

        this.enemySpawnPool.floor.push(new Phaser.Point(18,45));
        this.enemySpawnPool.floor.push(new Phaser.Point(29,45));
        this.enemySpawnPool.floor.push(new Phaser.Point(17,39));
        this.enemySpawnPool.floor.push(new Phaser.Point(29,34));
        this.enemySpawnPool.floor.push(new Phaser.Point(22,37));
        this.enemySpawnPool.floor.push(new Phaser.Point(22,41));

        this.enemySpawnPool.floor.push(new Phaser.Point(18,18));
        this.enemySpawnPool.floor.push(new Phaser.Point(29,18));
        this.enemySpawnPool.floor.push(new Phaser.Point(18,29));
        this.enemySpawnPool.floor.push(new Phaser.Point(29,29));
        this.enemySpawnPool.floor.push(new Phaser.Point(21,24));

        this.enemySpawnPool.floor.push(new Phaser.Point(34,18));
        this.enemySpawnPool.floor.push(new Phaser.Point(45,18));

        this.enemySpawnPool.floor.push(new Phaser.Point(50,34));
        this.enemySpawnPool.floor.push(new Phaser.Point(61,34));
        this.enemySpawnPool.floor.push(new Phaser.Point(61,45));
        this.enemySpawnPool.floor.push(new Phaser.Point(50,45));



        this.enemySpawnPool.water = [];
        this.enemySpawnPool.water.push(new Phaser.Point(52,43));
        this.enemySpawnPool.water.push(new Phaser.Point(56,45));
        this.enemySpawnPool.water.push(new Phaser.Point(57,45));

        this.enemySpawnPool.water.push(new Phaser.Point(41,19));
        this.enemySpawnPool.water.push(new Phaser.Point(42,19));
        this.enemySpawnPool.water.push(new Phaser.Point(45,19));

        this.enemySpawnPool.water.push(new Phaser.Point(36,20));
        this.enemySpawnPool.water.push(new Phaser.Point(37,20));
        this.enemySpawnPool.water.push(new Phaser.Point(38,20));

        //-----------
        console.log(this.enemySpawnPool);

    },
    create:function(){


        this.game.stage.backgroundColor = "#489ad8";
        this.map = this.game.add.tilemap('overworld');
        this.map.addTilesetImage('overworld');
        
        this.map.createLayer('background');
        
        this.mapCollisions = this.map.createLayer('overworld');
        this.map.setCollisionBetween(1,31,true,'overworld');
                               
        //Teleport creation
        this.tp = new gameEngine.teleport_prefab(this.game, 27 * 16, 16 * 16, 8 * 16, 24 * 16 , 1, this);
        this.game.add.existing(this.tp);
        
        this.tp2 = new gameEngine.teleport_prefab(this.game, 7 * 16, 25 * 16, 27 * 16 + 8, 17 * 16 + 8, 0, this);
        this.game.add.existing(this.tp2);
        
        this.tp3 = new gameEngine.teleport_prefab(this.game, 8 * 16, 25 * 16, 27 * 16 + 8, 17 * 16 + 8, 0, this);
        this.game.add.existing(this.tp3);
        
        this.tp4 = new gameEngine.teleport_prefab(this.game, 45 * 16, 3 * 16, 7 * 16 + 8, 43 * 16 + 8, 0, this);
        this.game.add.existing(this.tp4);
        
        this.tp5 = new gameEngine.teleport_prefab(this.game, 7 * 16, 44 * 16, 46 * 16 + 8 , 3 * 16 + 8, 0, this);
        this.game.add.existing(this.tp5);
        
        this.tp6 = new gameEngine.teleport_prefab(this.game, 8 * 16, 44 * 16, 46 * 16 + 8 , 3 * 16 + 8, 0, this);
        this.game.add.existing(this.tp6);
        
        //Door creation
        this.door = new gameEngine.door_prefab(this.game, 39 * 16, 7 * 16, 'statue', this);
        this.game.add.existing(this.door);
        
        //this.tp2 = new gameEngine.teleport_prefab(this.game, 336, 672, 500, 740, 0, this);
        //this.game.add.existing(this.tp2);     
        
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
        

        //ENEMY CREATION
        this.loadEnemies();

        
        //Octoroks
        for(var i = 0; i < this.enemySpawnPool.floor.length; i+=2)
        {
            var temp = this.enemySpawnPool.floor[i];
            console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK, temp.x*16, temp.y*16);
        }
        
        //Tektites
        for(var i = 1; i < this.enemySpawnPool.floor.length; i+=2)
        {
            var temp = this.enemySpawnPool.floor[i];
            console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.TEKTITE, temp.x*16, temp.y*16);
        }

        //Zoras
        for(var i = 0; i < this.enemySpawnPool.water.length; i++)
        {
            var temp = this.enemySpawnPool.water[i];
            console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA, temp.x*16, temp.y*16);
        }
        //-------------------
        
        //Audio creation
        this.backgroundMusic = this.add.audio('overworldMusic', 1, true, true);
        this.backgroundMusic.play();
        
        //HUD creation
        this.createHud();
        
        this.pause = new gameEngine.pauseMenu_prefab(this.game, this);
        
        this.pickup = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.HEART, this.worldCellSize / 2 + this.worldCellSize * this.actualCellX + 70, this.worldCellSize / 2 + this.worldCellSize * this.actualCellY, this);
        this.game.add.existing(this.pickup);
        
        this.pickup2 = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.SWORD, this.worldCellSize / 2 + this.worldCellSize * this.actualCellX + 70, this.worldCellSize / 2 + this.worldCellSize * this.actualCellY + 70, this);
        this.game.add.existing(this.pickup2);
        
        this.pickup3 = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD, 8 * 16, 36 * 16, this);
        this.game.add.existing(this.pickup3);
        
        this.pickup4 = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.LETTER, 8 * 16, 21 * 16, this);
        this.game.add.existing(this.pickup4);
        
        this.pickup5 = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.LETTER, 56 * 16 + 8, 6 * 16 + 8, this);
        this.game.add.existing(this.pickup5);
        
        this.pickup6 = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.LETTER, 55 * 16 + 8, 34 * 16 + 8, this);
        this.game.add.existing(this.pickup6);
        
        this.pickup7 = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.LETTER, 24 * 16 + 8, 4 * 16 + 8, this);
        this.game.add.existing(this.pickup7);
        
        this.movable1 =new gameEngine.movable_prefab(this.game, SYSTEM_CONSTANTS.MOVABLES.ROCK, SYSTEM_CONSTANTS.DIRECTIONS.UP, this.worldCellSize / 2 + this.worldCellSize * this.actualCellX + 40, this.worldCellSize / 2 + this.worldCellSize * this.actualCellY + 40, this);
        this.game.add.existing(this.movable1);

    },
    loadEnemies:function()
    {
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
    },
    createEnemy:function(type, x, y)
    {
        var enemy = this.enemies.getFirstExists(false);
        if(!enemy)
        {
            enemy = new gameEngine.enemy_prefab(this.game, type, x, y, this);
            this.enemies.add(enemy);
        }
    },
    update:function(){
        
        this.game.debug.body(this.link);
        if(this.hitbox.active){
            this.game.debug.body(this.hitbox);
        }
        
        this.smoothCamera();
        
        
    },
    smoothCamera:function(){
        if(!this.pause.paused){        
            if( this.math.difference(this.link.x, this.game.camera.x + this.worldCellSize / 2) > this.worldCellSize / 2 && this.newPositionFound == false){

                console.log("detected link cell change in X");
                console.log("Current Screen: (X: "+this.actualCellX+" | Y: "+this.actualCellY+" )");
                //console.log("Camera position: " + this.game.camera.x + " " + this.game.camera.y);

                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;

                if (this.link.x - this.game.camera.x < 0){

                    this.newCameraPositionX -= this.worldCellSize;                
                    this.actualCellX -= 1;
                    this.newPositionFound = true;
                    //console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
                }

                else if(this.link.x - this.game.camera.x > this.worldCellSize - 1){

                    this.newCameraPositionX += this.worldCellSize;
                    this.actualCellX += 1;
                    this.newPositionFound = true;
                    //console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
                }
            }

            else if( this.math.difference(this.link.y, this.game.camera.y + this.worldCellSize / 2) > this.worldCellSize / 2 && this.newPositionFound == false){

                console.log("detected link cell change in Y");
                console.log("Current Screen: (X: "+this.actualCellX+" | Y: "+this.actualCellY+" )");
                //console.log("Camera position: " + this.game.camera.x + " " + this.game.camera.y);

                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;

                if (this.link.y - this.game.camera.y < 0){

                    this.newCameraPositionY -= this.worldCellSize;
                    this.actualCellY -= 1;
                    this.newPositionFound = true;
                    //console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
                }
                else if(this.link.y - this.game.camera.y > this.worldCellSize - 1){

                    this.newCameraPositionY += this.worldCellSize;
                    this.actualCellY += 1;
                    this.newPositionFound = true;
                    //console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
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

            //console.log("New Position: " + this.newCameraPositionX + " " + this.newCameraPositionY + " Old Position: " + this.game.camera.x + " " + this.game.camera.y);

            if(this.newCameraPositionX == this.game.camera.position.x && this.newCameraPositionY == this.game.camera.position.y){
                this.newPositionFound = false;
                //console.log('New Position set to false');
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
    }

}