var gameEngine = gameEngine || {};

gameEngine.dungeon ={
    preload:function(){
        
        //Physics start
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.load.tilemap('dungeon', 'tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('dungeonTileset', 'img/dungeonTileset.png');

    },
    create:function(){
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
        
        
    },
    update:function(){

        
    }    

}