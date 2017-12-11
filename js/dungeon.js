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
    },
    create:function(){


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
        
        this.map.createLayer('interactables');
        
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
        
        //HUD creation
        this.createHud();
        
        this.pause = new gameEngine.pauseMenu_prefab(this.game, this);
        
        //Audio creation
        this.backgroundMusic = this.add.audio('dungeonMusic', 1, true, true);
        this.backgroundMusic.play();
        
        //Teleports startup
             

    },
    
    update:function(){
                
        this.game.debug.body(this.link);
        if(this.hitbox.active){
            this.game.debug.body(this.hitbox);
        }
        
        this.smoothCamera();    
        
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
}