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
        this.cameraMoving = false;
    },
    create:function(){
        this.game.stage.backgroundColor = "#489ad8";
        this.map = this.game.add.tilemap('overworld');
        this.map.addTilesetImage('overworld');
        
        this.map.createLayer('background');
        
        this.mapCollisions = this.map.createLayer('overworld');
        this.map.setCollisionBetween(1,31,true,'overworld');
        
        //Link creation
        this.link = new gameEngine.link_prefab(this.game, this.worldCellSize / 2 + this.worldCellSize * this.actualCellX  , this.worldCellSize / 2 + this.worldCellSize * this.actualCellY, this);
        this.game.add.existing(this.link);
        //Link attack hitbox created
        this.hitbox = new gameEngine.hitbox_prefab(this.game, this.link, false, 500, 600, 70, 50, 16, 0, this);
        this.game.add.existing(this.hitbox);
        //Simple camera movement
        this.game.camera.x = this.link.x - this.worldCellSize / 2;
        this.game.camera.y = this.link.y - this.worldCellSize / 2;
        //this.game.camera.follow(this.link, Phaser.Camera.FOLLOW_PLATAFORMER);
        
        //Camera reference point
        //this.newCameraPosition = this.game.add.sprite(this.game.camera.x + this.worldCellSize /2,this.game.camera.y + this.worldCellSize /2, 'hitbox',0);
        //this.newCameraPosition.anchor.setTo(.5);
        this.newCameraPositionX = this.game.camera.x;
        this.newCameraPositionY = this.game.camera.y;
        
        //Enemy creation
        this.enemy = new gameEngine.enemy_prefab(this.game, SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK, this.link.position.x + 32, this.link.position.y, this);
        this.game.add.existing(this.enemy);

    },
    update:function(){
        this.game.debug.body(this.link);
        if(this.hitbox.active){
            this.game.debug.body(this.hitbox);
        }
        
        this.smoothCamera();

        
    },
    smoothCamera:function(){
                
        this.newPositionFound;
        
        if( this.math.difference(this.link.x, this.game.camera.x + this.worldCellSize / 2) > this.worldCellSize / 2 ){
            
            console.log("detected link cell change in X");
            console.log("Camera position: " + this.game.camera.x + " " + this.game.camera.y);
            
            this.newPositionFound = true;
            this.link.body.velocity.x = 0;
            this.link.body.velocity.y = 0;
            
            if (this.link.x - this.game.camera.x < 0){
                
                this.newCameraPositionX -= this.worldCellSize;
                //this.game.camera.x -= 8;

                
                this.actualCellX -= 1;
            }
            else if(this.link.x - this.game.camera.x > this.worldCellSize){
                
                this.newCameraPositionX += this.worldCellSize;
                //this.game.camera.x += 8;

                this.actualCellX += 1;
            }
            console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
        }
        else if( this.math.difference(this.link.y, this.game.camera.y + this.worldCellSize / 2) > this.worldCellSize / 2 ){
            
            console.log("detected link cell change in Y");
            console.log("Camera position: " + this.game.camera.x + " " + this.game.camera.y);
            
            this.newPositionFound = true;
            this.link.body.velocity.x = 0;
            this.link.body.velocity.y = 0;
            
            if (this.link.y - this.game.camera.y < 0){
                
                this.newCameraPositionY -= this.worldCellSize;
                //this.game.camera.y -= 8;

                this.actualCellY -= 1;
            }
            else if(this.link.y - this.game.camera.y > this.worldCellSize){
                
                this.newCameraPositionY += this.worldCellSize;
                //this.game.camera.y += 8;

                this.actualCellY += 1;
            }
            console.log("New camera position: " + this.newCameraPositionX + " " + this.newCameraPositionY);
        }
        
        if(this.newPositionFound == true){
            
            if (this.newCameraPositionX - this.game.camera.x < 0){
                
                this.game.camera.x -= 8;

            }
            
            else if(this.newCameraPositionX - this.game.camera.x > this.worldCellSize){
                
                this.game.camera.x += 8;

            }
            
            if (this.newCameraPositionY - this.game.camera.y < 0){
                
                this.game.camera.y -= 8;

            }
            else if(this.newCameraPositionY - this.game.camera.y > this.worldCellSize){
                
                this.game.camera.y += 8;

            }
        }
        
        if(this.newCameraPositionX == this.game.camera.x && this.newCameraPositionY == this.game.camera.Y){
            this.newPositionFound = false;
        }
    }

}