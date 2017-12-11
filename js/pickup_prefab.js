var gameEngine = gameEngine || {};

gameEngine.pickup_prefab = function(game,type,pos_x,pos_y,level){
    
    this.game = game;

    switch(type)
        {
            case SYSTEM_CONSTANTS.PICKUPS.SWORD:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'sword', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(5, 15, 1, 1);
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'master_sword', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(5, 15, 1, 1);
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.HEART:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'heart', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(8, 8);
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.LETTER:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'letter', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(8, 8);
            }break;
                
            default:
            {
    
            }break;
        }


    this.anchor.setTo(.5);

    this.body.moves = false;
    this.body.ummovable = true;
    
    this.timer = this.game.time.create(false);
    this.timer.loop(1200, function(){
        this.destroy();
        console.log("Destroying");
        this.level.link.canMove = true;
        this.level.link.frame = 0;
        if(this.type == SYSTEM_CONSTANTS.PICKUPS.LETTER && this.level.link.lettersCounter < 4){
            this.level.link.lettersCounter++;
            SYSTEM_CONSTANTS.LINK_DATA.NUMBER_LETTERS = this.level.link.lettersCounter;
        }
        if(this.type == SYSTEM_CONSTANTS.PICKUPS.SWORD){
            SYSTEM_CONSTANTS.LINK_DATA.HAS_SWORD = true;
        }
        if(this.type == SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD){
            SYSTEM_CONSTANTS.LINK_DATA.HAS_MASTER_SWORD = true;
        }
        
        if (this.level.link.attacking){
            this.level.link.attacking = false;
            this.animations.play("move_" + this.facingDirection);
            this.level.hitbox.active = false;
            this.swordThrown = false;
            this.attackTimeCounter = 0;
        }
        this.timer.stop();
        
    }, this);
    
    this.type = type;
    this.level = level;
    this.game.physics.arcade.enable(this); 
};

gameEngine.pickup_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.pickup_prefab.prototype.constructor = gameEngine.pickup_prefab;

gameEngine.pickup_prefab.prototype.update = function(){
    this.game.debug.body(this);
    switch(this.type){
            case SYSTEM_CONSTANTS.PICKUPS.SWORD:
            {
                 this.game.physics.arcade.overlap(this, this.level.link, function(sword, link){
                     sword.x = link.body.x + 4;
                     sword.y = link.body.y - 12;
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
                     heart.kill();
                     link.heal(2);
                     SYSTEM_CONSTANTS.LINK_DATA.HP = link.life;
                 });
            }break;
            
            case SYSTEM_CONSTANTS.PICKUPS.LETTER:
            {
                 this.game.physics.arcade.overlap(this, this.level.link, function(letter, link){
                     letter.x = link.x;
                     letter.y = link.y - 15;
                     link.frame = 13;
                     link.canMove = false;
                     letter.timer.start();
                 });
            }break;
            
            default:
            {
    
            }break; 
    }
};