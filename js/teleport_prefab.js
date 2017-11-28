var gameEngine = gameEngine || {}

var dX, dY;

gameEngine.teleport_prefab = function(game, x,y, _dX, _dY, tpType, level){
    if(tpType == 0){
        Phaser.Sprite.call(this,game,x,y,'teleport',0);
    }
    else if(tpType == 1){
        Phaser.Sprite.call(this,game,x,y,'teleport',1);
    }
    //this.anchor.setTo(.5);
    game.physics.arcade.enable(this);
    this.body.moves = false;
    this.body.ummovable = true;
    //this.body.setSize(5, 5, 0, 0);
    
    this.level = level;
    this.game = game;
    this.dX = _dX;
    this.dY = _dY;
    
    //Audio creation
    this.teleportSound = this.level.add.audio('teleportSound');
    
};

gameEngine.teleport_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.teleport_prefab.prototype.constructor = gameEngine.teleport_prefab;

gameEngine.teleport_prefab.prototype.update = function(){
    
    this.game.physics.arcade.overlap(this, this.level.link, function(teleport, link){
        teleport.teleportSound.play();
        link.level.camera.fade(0x000000,10);
        this.timer = link.level.game.time.create(true);
        link.reset(teleport.dX, teleport.dY);
        this.timer.add(3000,function(){            
            link.level.camera.resetFX();
        }, this);
        this.timer.start();
        
        //link.level.camera.onFadeComplete.add(, this);
            

    })
};