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
        if( this.math.difference(this.link.x, this.game.camera.x + this.worldCellSize / 2) > this.worldCellSize / 2 ){
            console.log("detected link cell change in X");
            if (this.link.x - this.game.camera.x < 0){
                this.game.camera.x -= this.worldCellSize;
                this.actualCellX -= 1;
            }
            else if(this.link.x - this.game.camera.x > this.worldCellSize){
                this.game.camera.x += this.worldCellSize;
                this.actualCellX += 1;
            }
        }
        else if( this.math.difference(this.link.y, this.game.camera.y + this.worldCellSize / 2) > this.worldCellSize / 2 ){
            console.log("detected link cell change in Y");
            if (this.link.y - this.game.camera.y < 0){
                this.game.camera.y -= this.worldCellSize;
                this.actualCellY -= 1;
            }
            else if(this.link.y - this.game.camera.y > this.worldCellSize){
                this.game.camera.y += this.worldCellSize;
                this.actualCellX -= 1;
            }
        }
    }

}