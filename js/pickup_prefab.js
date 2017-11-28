var gameEngine = gameEngine || {};

gameEngine.pickup_prefab = function(game,type,pos_x,pos_y,level){
    
    this.game = game;
    
    switch(type)
        {
            case SYSTEM_CONSTANTS.PICKUPS.SWORD:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'sword', 0);
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD:
            {
               Phaser.Sprite.call(this, game, pos_x, pos_y,'master_sword', 0);
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.HEART:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'heart', 0);
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.LETTER:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'letter', 0);
            }break;
                
            default:
            {
    
            }break;
        }


    this.anchor.setTo(.5);
    game.physics.arcade.enable(this);
    this.body.moves = false;
    this.body.ummovable = true;
    
    this.timer = this.game.time.create(false);
    this.timer.loop(1200, function(){
        this.destroy();
        console.log("Destroying");
        this.level.link.canMove = true;
        this.timer.stop();
    }, this);
    
    this.type = type;
    this.level = level;
    this.game.physics.arcade.enable(this); 
};

gameEngine.pickup_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.pickup_prefab.prototype.constructor = gameEngine.pickup_prefab;

gameEngine.pickup_prefab.prototype.update = function(){
    switch(this.type){
            case SYSTEM_CONSTANTS.PICKUPS.SWORD:
            {
                 this.game.physics.arcade.overlap(this, this.level.link, function(sword, link){
                     sword.x = link.x;
                     sword.y = link.y - 15;
                     link.frame = 13;
                     link.hasSword = true;
                     link.canMove = false;
                     sword.timer.start();
                 });

            }break;
            
            case SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD:
            {
                 this.game.physics.arcade.overlap(this, this.level.link, function(master_sword, link){
                     master_sword.x = link.x;
                     master_sword.y = link.y - 15;
                     link.frame = 13;
                     link.hasSword = true;
                     link.hasMasterSword = true;
                     link.canMove = false;
                     master_sword.timer.start();
                 });
            }break;
            
            case SYSTEM_CONSTANTS.PICKUPS.HEART:
            {
                 this.game.physics.arcade.overlap(this, this.level.link, function(heart, link){
                     link.heal(2);
                     heart.kill();
                     
                 });
            }break;
            
            case SYSTEM_CONSTANTS.PICKUPS.LETTER:
            {
                 this.game.physics.arcade.overlap(this, this.level.link, function(letter, link){
                     link.lettersCounter++;
                     letter.kill();
                     
                 });
            }break;
            
            default:
            {
    
            }break; 
    }
};