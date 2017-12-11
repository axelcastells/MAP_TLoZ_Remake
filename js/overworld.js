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
        this.enemySpawnPool.octorok = [];
        this.enemySpawnPool.tektite = [];
        this.enemySpawnPool.octorok.push(new Phaser.Point(35,50));
        this.enemySpawnPool.tektite.push(new Phaser.Point(44,50));
        this.enemySpawnPool.octorok.push(new Phaser.Point(34,45));
        this.enemySpawnPool.tektite.push(new Phaser.Point(45,45));

        this.enemySpawnPool.octorok.push(new Phaser.Point(18,45));
        this.enemySpawnPool.tektite.push(new Phaser.Point(29,45));
        this.enemySpawnPool.octorok.push(new Phaser.Point(22,37));
        this.enemySpawnPool.tektite.push(new Phaser.Point(22,41));

        this.enemySpawnPool.octorok.push(new Phaser.Point(18,18));
        this.enemySpawnPool.tektite.push(new Phaser.Point(29,18));
        this.enemySpawnPool.octorok.push(new Phaser.Point(21,24));

        this.enemySpawnPool.tektite.push(new Phaser.Point(34,18));
        this.enemySpawnPool.octorok.push(new Phaser.Point(45,18));

        this.enemySpawnPool.tektite.push(new Phaser.Point(50,34));
        this.enemySpawnPool.octorok.push(new Phaser.Point(61,34));
        this.enemySpawnPool.tektite.push(new Phaser.Point(50,45));
        
        this.enemySpawnPool.octorok.push(new Phaser.Point(60,29));
        this.enemySpawnPool.tektite.push(new Phaser.Point(50,20));
        this.enemySpawnPool.octorok.push(new Phaser.Point(58,22));
        
        this.enemySpawnPool.tektite.push(new Phaser.Point(35,12));
        this.enemySpawnPool.octorok.push(new Phaser.Point(44,12));        
        
        this.enemySpawnPool.tektite.push(new Phaser.Point(21,9));
        this.enemySpawnPool.octorok.push(new Phaser.Point(26,9));



        this.enemySpawnPool.water = [];
        this.enemySpawnPool.water.push(new Phaser.Point(53,44));
        this.enemySpawnPool.water.push(new Phaser.Point(57,44));

        this.enemySpawnPool.water.push(new Phaser.Point(42,20));
        this.enemySpawnPool.water.push(new Phaser.Point(44,24));

        this.enemySpawnPool.water.push(new Phaser.Point(37,21));
        this.enemySpawnPool.water.push(new Phaser.Point(36,25));
        
        
        
        this.enemySpawnPool.bossSpawn = new Phaser.Point(44,50);

        //-----------
        //console.log(this.enemySpawnPool);

    },
    create:function(){


        this.game.stage.backgroundColor = "#489ad8";
        this.map = this.game.add.tilemap('overworld');
        this.map.addTilesetImage('overworld');
        
        this.map.createLayer('background');
        
        this.water = this.map.createLayer('water');
        this.map.setCollisionBetween(20,31,true,'water');
        
        this.mapCollisions = this.map.createLayer('overworld');
        this.map.setCollisionBetween(1,26,true,'overworld');
                               
        //Teleport creation
        this.tp = new gameEngine.teleport_prefab(this.game, 27 * 16, 16 * 16, 8 * 16, 24 * 16 , 1, this);
        this.game.add.existing(this.tp);
        
        this.tp2 = new gameEngine.teleport_prefab(this.game, 7 * 16, 25 * 16, 27 * 16 + 8, 17 * 16 + 8, 0, this);
        this.game.add.existing(this.tp2);
        
        this.tp3 = new gameEngine.teleport_prefab(this.game, 8 * 16, 25 * 16, 27 * 16 + 8, 17 * 16 + 8, 0, this);
        this.game.add.existing(this.tp3);
        
        this.tp4 = new gameEngine.teleport_prefab(this.game, 45 * 16, 3 * 16, 7 * 16 + 8, 43 * 16 + 8, 0, this);
        this.tp4.isActive = false;
        this.tp4.body.setSize(8, 6, 4, 0);
        this.game.add.existing(this.tp4);
        
        this.tp5 = new gameEngine.teleport_prefab(this.game, 7 * 16, 44 * 16, 46 * 16 + 8 , 3 * 16 + 8, 0, this);
        this.game.add.existing(this.tp5);
        
        this.tp6 = new gameEngine.teleport_prefab(this.game, 8 * 16, 44 * 16, 46 * 16 + 8 , 3 * 16 + 8, 0, this);
        this.game.add.existing(this.tp6);
        
        //Level change
        this.lvlC1 = new gameEngine.level_change(this.game, 39 * 16, 3 * 16, this);
        this.game.add.existing(this.lvlC1);
        this.lvlC2 = new gameEngine.level_change(this.game, 40 * 16, 3 * 16, this);
        this.game.add.existing(this.lvlC2);
        
        //Interactable
        this.inter = new gameEngine.interactables_prefab(this.game, 39 * 16, 8 * 16, 2, 0.5, this);
        this.game.add.existing(this.inter);
        
        this.inter2 = new gameEngine.interactables_prefab(this.game, 55 * 16, 7 * 16, 1, 0.5, this);
        this.game.add.existing(this.inter2);
        
        //Yayo
        this.yayo = new gameEngine.yayo_prefab(this.game, 0, 0, this.inter2, this);
        this.game.add.existing(this.yayo);
        
        //Door creation
        this.door = new gameEngine.door_prefab(this.game, 39 * 16, 7 * 16, 'statue', this.inter, this);
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
        
        this.loadEnemies();
        
        this.spawnEnemies();
        
        //-------------------
        
        //Audio creation
        this.backgroundMusic = this.add.audio('overworldMusic', 1, true, true);
        this.backgroundMusic.play();
        
        //Movables creation and arrangement
        this.loadMovables();
        this.createMapMovables();
        
        //HUD creation
        this.createHud();
        
        this.pause = new gameEngine.pauseMenu_prefab(this.game, this);
        
        //Pickups
        
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
        
        this.pickup7 = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.KEY,  this.worldCellSize * 2 + 36, this.worldCellSize * 2 + 36, this);
        this.game.add.existing(this.pickup7);
        


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
                
        this.game.debug.body(this.link);
        if(this.hitbox.active){
            this.game.debug.body(this.hitbox);
        }
        this.game.debug.body(this.tp4);
        
        this.smoothCamera();
        
        if(this.cellChange && !this.newPositionFound){
            this.spawnEnemies();
            this.cellChange = false;
        }
        
        
        if(this.movables.children[2].locked){
           this.tp4.isActive = true;
        }
    },
    smoothCamera:function(){
        //console.log("Current Screen: (X: "+this.actualCellX+" | Y: "+this.actualCellY+" )");
        if(!this.pause.paused){        
            if( this.math.difference(this.link.x, this.game.camera.x + this.worldCellSize / 2) > this.worldCellSize / 2 && this.newPositionFound == false){

                //console.log("detected link cell change in X");
                //console.log("Current Screen: (X: "+this.actualCellX+" | Y: "+this.actualCellY+" )");
                //console.log("Camera position: " + this.game.camera.x + " " + this.game.camera.y);

                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;

                if (this.link.x - this.game.camera.x < 0){

                    this.newCameraPositionX -= this.worldCellSize;                
                    this.actualCellX -= 1;
                    this.newPositionFound = true;
                    this.cellChange = true;
                    //console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
                }

                else if(this.link.x - this.game.camera.x > this.worldCellSize - 1){

                    this.newCameraPositionX += this.worldCellSize;
                    this.actualCellX += 1;
                    this.newPositionFound = true;
                    this.cellChange = true;
                    //console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
                }
            }

            else if( this.math.difference(this.link.y, this.game.camera.y + this.worldCellSize / 2) > this.worldCellSize / 2 && this.newPositionFound == false){

                //console.log("detected link cell change in Y");
                //console.log("Current Screen: (X: "+this.actualCellX+" | Y: "+this.actualCellY+" )");
                //console.log("Camera position: " + this.game.camera.x + " " + this.game.camera.y);

                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;

                if (this.link.y - this.game.camera.y < 0){

                    this.newCameraPositionY -= this.worldCellSize;
                    this.actualCellY -= 1;
                    this.newPositionFound = true;
                    this.cellChange = true;
                    //console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
                }
                else if(this.link.y - this.game.camera.y > this.worldCellSize - 1){

                    this.newCameraPositionY += this.worldCellSize;
                    this.actualCellY += 1;
                    this.newPositionFound = true;
                    this.cellChange = true;
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
    },
    loadMovables: function(){
        this.movables = this.add.group();
        this.movables.enableBody = true;
    },
    createMovable: function(type, directions, x, y){
        var movable = this.movables.getFirstExists(false);
        if(!movable)
        {
            movable = new gameEngine.movable_prefab(this.game, type, directions, x, y, this);
            this.movables.add(movable);
        }
    },
    createMapMovables: function(){
        
        //Top left room movables
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.UP], this.worldCellSize + 16 * 7, 16 * 5);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.RIGHT], this.worldCellSize + 16 * 8, 16 * 5);
        
        //Statue
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.STATUE, [SYSTEM_CONSTANTS.DIRECTIONS.UP], this.worldCellSize * 2 + 16 * 13, 16 * 3);
        
        //Cave entrance
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize + 16 * 10, this.worldCellSize + 16);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.LEFT], this.worldCellSize + 16 * 11, this.worldCellSize + 16 * 2);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.UP], this.worldCellSize + 16 * 12, this.worldCellSize + 16 * 2);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize + 16 * 13, this.worldCellSize + 16);
        
        //Puzzle
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 5, this.worldCellSize * 2 + 16 * 2);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 5, this.worldCellSize * 2 + 16 * 3);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 5, this.worldCellSize * 2 + 16 * 4);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 5, this.worldCellSize * 2 + 16 * 5);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 5, this.worldCellSize * 2 + 16 * 6);
        
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 6, this.worldCellSize * 2 + 16 * 1);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 6, this.worldCellSize * 2 + 16 * 2);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 6, this.worldCellSize * 2 + 16 * 4);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 6, this.worldCellSize * 2 + 16 * 5);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 6, this.worldCellSize * 2 + 16 * 6);     
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.RIGHT, SYSTEM_CONSTANTS.DIRECTIONS.RIGHT, SYSTEM_CONSTANTS.DIRECTIONS.DOWN], this.worldCellSize * 3 + 16 * 6, this.worldCellSize * 2 + 16 * 7);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 6, this.worldCellSize * 2 + 16 * 8);
        
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 7, this.worldCellSize * 2 + 16 * 1);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.LEFT], this.worldCellSize * 3 + 16 * 7, this.worldCellSize * 2 + 16 * 3);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 7, this.worldCellSize * 2 + 16 * 5);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 7, this.worldCellSize * 2 + 16 * 8);
        
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 8, this.worldCellSize * 2 + 16 * 1);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.UP], this.worldCellSize * 3 + 16 * 8, this.worldCellSize * 2 + 16 * 3);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.LEFT], this.worldCellSize * 3 + 16 * 8, this.worldCellSize * 2 + 16 * 4);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 8, this.worldCellSize * 2 + 16 * 5);
        
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 9, this.worldCellSize * 2 + 16 * 1);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 9, this.worldCellSize * 2 + 16 * 2);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.UP, SYSTEM_CONSTANTS.DIRECTIONS.UP, SYSTEM_CONSTANTS.DIRECTIONS.UP], this.worldCellSize * 3 + 16 * 9, this.worldCellSize * 2 + 16 * 6);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, [SYSTEM_CONSTANTS.DIRECTIONS.RIGHT], this.worldCellSize * 3 + 16 * 9, this.worldCellSize * 2 + 16 * 7);
        this.createMovable(SYSTEM_CONSTANTS.MOVABLES.ROCK, null, this.worldCellSize * 3 + 16 * 9, this.worldCellSize * 2 + 16 * 8);
        
    },
    spawnEnemies:function(){
        //ENEMY CREATION
        
        //Octoroks
        for(var i = 0; i < this.enemySpawnPool.octorok.length; i++)
        {
            var temp = this.enemySpawnPool.octorok[i];
            //console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK, temp.x*16, temp.y*16);
        }
        
        //Tektites
        
        for(var i = 0; i < this.enemySpawnPool.tektite.length; i++)
        {
            var temp = this.enemySpawnPool.tektite[i];
            //console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.TEKTITE, temp.x*16, temp.y*16);
        }
        
        //Zoras
        for(var i = 0; i < 3; i++)
        {
            var temp = parseInt(Math.random()*this.enemySpawnPool.water.length);
            //console.log(temp);
            this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA, this.enemySpawnPool.water[temp].x*16, this.enemySpawnPool.water[temp].y*16);
        }
        
        //Boss DEBUG Spawn
        this.createEnemy(SYSTEM_CONSTANTS.ENEMY_TYPES.GLEEOK, this.enemySpawnPool.bossSpawn.x*16, this.enemySpawnPool.bossSpawn.y*16);
    }

    
}