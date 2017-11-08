var gameEngine = gameEngine || {};

gameEngine.overworld ={
    preload:function(){
        
        //Physics start
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.load.tilemap('overworld', 'tilemaps/overworld.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('overworld', 'img/overworld.png');

    },
    create:function(){
        this.game.stage.backgroundColor = "#489ad8";
        this.map = this.game.add.tilemap('overworld');
        this.map.addTilesetImage('overworld');
        
        this.map.createLayer('background');
        
        this.mapCollisions = this.map.createLayer('overworld');
        this.map.setCollisionBetween(1,31,true,'overworld');
        
        
        
    },
    update:function(){

        
    }    

}