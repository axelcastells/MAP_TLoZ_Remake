var gameEngine = gameEngine || {}

var dX, dY;

gameEngine.teleport_prefab = function(game, x,y, _dX, _dY, tpType, level){
    if(tpType == 0){
        Phaser.Sprite.call(this,game,x,y,'teleport',0);
    }
    else if(tpType == 1){
        Phaser.Sprite.call(this,game,x,y,'teleport',1);
    }
    this.anchor.setTo(.5);
    game.physics.arcade.enable(this);
    
    this.body.setSize(5, 5, 0, 0);
    
    this.level = level;
    dX = _dX;
    dY = _dY;
    
};

gameEngine.teleport_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.teleport_prefab.prototype.constructor = gameEngine.teleport_prefab;

gameEngine.teleport_prefab.prototype.update = function(){
    
    this.game.physics.arcade.overlap(this, this.level.link, function(teleport, link){
        link.reset(dX, dY);
    })
};