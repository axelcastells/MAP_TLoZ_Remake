var gameEngine = gameEngine || {};

gameEngine.pickup_prefab = function(game,type,pos_x,pos_y,level){
    
    this.game = game;
    
    this.type = type;
    this.level = level;
    switch(this.type)
        {
            case SYSTEM_CONSTANTS.PICKUPS.SWORD:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'sword', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(5, 15, 1, 1);
                this.pickUpSound = this.level.add.audio('pickItem');
                this.type = SYSTEM_CONSTANTS.PICKUPS.SWORD;
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'master_sword', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(5, 15, 1, 1);
                this.pickUpSound = this.level.add.audio('pickItem');
                this.type = SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD;
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.HEART:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'heart', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(8, 8);
                this.pickUpSound = this.level.add.audio('pickHeart');
                this.type = SYSTEM_CONSTANTS.PICKUPS.HEART;
            }break;
                
            case SYSTEM_CONSTANTS.PICKUPS.LETTER:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'letter', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(8, 8);
                this.pickUpSound = this.level.add.audio('pickItem');
                this.type = SYSTEM_CONSTANTS.PICKUPS.LETTER;
            }break;
            
            case SYSTEM_CONSTANTS.PICKUPS.KEY:
            {
                Phaser.Sprite.call(this, game, pos_x, pos_y,'key', 0);
                game.physics.arcade.enable(this);
                this.body.setSize(7, 12, 5, 1);
                this.pickUpSound = this.level.add.audio('pickLMAO');
                this.type = SYSTEM_CONSTANTS.PICKUPS.KEY;
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
        this.level.link.canMove = true;
        this.level.link.frame = 0;
        if(this.type == SYSTEM_CONSTANTS.PICKUPS.LETTER && this.level.link.lettersCounter < 4){
            this.level.link.lettersCounter++;
            SYSTEM_CONSTANTS.LINK_DATA.NUMBER_LETTERS = this.level.link.lettersCounter;
            console.log("letter");
        } else if(this.type == SYSTEM_CONSTANTS.PICKUPS.SWORD){
            SYSTEM_CONSTANTS.LINK_DATA.HAS_SWORD = true;
            this.level.link.hasSword = true;
            console.log("sword");
        }
        else if(this.type == SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD){
            SYSTEM_CONSTANTS.LINK_DATA.HAS_MASTER_SWORD = true;
            this.level.link.hasSword = true;
            this.link.hasMasterSword = true;
            console.log("masterswaord");
        }
        else if(this.type == SYSTEM_CONSTANTS.PICKUPS.KEY){
            SYSTEM_CONSTANTS.LINK_DATA.NUMBER_KEYS++;
            this.level.link.keysCounter++;
            console.log("it's wednesday my dudes");
        }
        else if(this.type == SYSTEM_CONSTANTS.PICKUPS.HEART){
            this.level.link.heal(2);
            SYSTEM_CONSTANTS.LINK_DATA.HP = this.level.link.life;
            console.log("heart");
        }
        
        else if (this.level.link.attacking){
            this.level.link.attacking = false;
            this.animations.play("move_" + this.facingDirection);
            this.level.hitbox.active = false;
            this.swordThrown = false;
            this.attackTimeCounter = 0;
        }
        this.timer.stop();
        this.destroy();        
    }, this);

    this.game.physics.arcade.enable(this); 
};

gameEngine.pickup_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.pickup_prefab.prototype.constructor = gameEngine.pickup_prefab;

gameEngine.pickup_prefab.prototype.update = function(){
    this.game.debug.body(this);

    this.game.physics.arcade.overlap(this, this.level.link, function(pickup, link){
         pickup.x = link.body.x + 4;
         pickup.y = link.body.y - 12;
         link.frame = 13;
         link.canMove = false;
         pickup.timer.start();
         pickup.pickUpSound.play();
    });
};