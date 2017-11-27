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
    },
    create:function(){
        this.game.stage.backgroundColor = "#489ad8";
        this.map = this.game.add.tilemap('overworld');
        this.map.addTilesetImage('overworld');
        
        this.map.createLayer('background');
        
        this.mapCollisions = this.map.createLayer('overworld');
        this.map.setCollisionBetween(1,31,true,'overworld');
                               
        //Teleport creation
        this.tp = new gameEngine.teleport_prefab(this.game, 27 * 16, 16 * 16, 7 * 16, 24 * 16, 1, this);
        this.game.add.existing(this.tp);
        
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
        
        //Enemy creation
        this.enemy = new gameEngine.enemy_prefab(this.game, SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK, this.link.position.x + 32, this.link.position.y, this);
        this.game.add.existing(this.enemy);
        

        
        //HUD creation
        this.createHud();
        
        this.pause = new gameEngine.pauseMenu_prefab(this.game, this);
        this.game.add.existing(this.pause);

    },
    update:function(){
        
        this.game.debug.body(this.link);
        if(this.hitbox.active){
            this.game.debug.body(this.hitbox);
        }
        
        this.smoothCamera();
        
        
    },
    smoothCamera:function(){
                
        if( this.math.difference(this.link.x, this.game.camera.x + this.worldCellSize / 2) > this.worldCellSize / 2 && this.newPositionFound == false){
            
            console.log("detected link cell change in X");
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