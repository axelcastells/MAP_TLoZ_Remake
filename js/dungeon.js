var gameEngine = gameEngine || {};

gameEngine.dungeon ={
    preload:function(){
        //Set up physics and canvas scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(400, 400);
        this.game.world.setBounds(0, 0, 2000, 2000);        
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
        
        //Teleports startup
        this.tp = new gameEngine.teleport_prefab(this.game, 224, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp);
        this.tp2 = new gameEngine.teleport_prefab(this.game, 336, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp2);
        
        //Link creation
        this.link = new gameEngine.link_prefab(this.game, 550, 740, this);
        this.game.add.existing(this.link);
        
        //Teleports startup
        this.tp = new gameEngine.teleport_prefab(this.game, 224, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp);
        this.tp2 = new gameEngine.teleport_prefab(this.game, 336, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp2);       

        
        //Enemy Provisional startup
        this.enemy = new gameEngine.enemy_prefab(this.game, SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK, this.link.position.x + 80, this.link.position.y, this);
        this.game.add.existing(this.enemy);
        
        this.enemy2 = new gameEngine.enemy_prefab(this.game, SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA, this.link.position.x + 80, this.link.position.y, this);
        this.game.add.existing(this.enemy2);
        
        this.hitbox = new gameEngine.hitbox_prefab(this.game, this.link, false, 500, 600, 70, 50, 16, 0, this);
        this.game.add.existing(this.hitbox);
        
        this.game.camera.follow(this.link, Phaser.Camera.FOLLOW_PLATAFORMER);

    },
    update:function(){

        
        this.game.debug.body(this.link);
        this.game.debug.body(this.tp);
        this.game.debug.body(this.tp2);
        if(this.hitbox.active){
            this.game.debug.body(this.hitbox);
        }
    }
}