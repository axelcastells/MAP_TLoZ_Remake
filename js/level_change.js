var gameEngine = gameEngine || {}

gameEngine.level_change = function(game, x,y, level){
    
    Phaser.Sprite.call(this,game,x,y,'teleport',1);

    //this.anchor.setTo(.5);
    game.physics.arcade.enable(this);
    this.body.moves = false;
    this.body.ummovable = true;
    //this.body.setSize(5, 5, 0, 0);
    
    this.level = level;
    this.game = game;
    
    //Audio creation
    this.teleportSound = this.level.add.audio('teleportSound');

};

gameEngine.level_change.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.level_change.prototype.constructor = gameEngine.level_change;

gameEngine.level_change.prototype.update = function(){
        this.game.physics.arcade.overlap(this, this.level.link, function(teleport, link){
            teleport.teleportSound.play();
            link.level.camera.fade(0x000000,10);
            gameEngine.game.state.start('dungeon');   

        })
};