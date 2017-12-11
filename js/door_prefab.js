var gameEngine = gameEngine || {};

gameEngine.door_prefab = function(game, pos_x, pos_y, imagePath, interactable, level){    
    Phaser.Sprite.call(this, game, pos_x, pos_y,imagePath, 0);
    this.interactable = interactable;
    this.open = false;
    this.x = pos_x;
    this.y = pos_y;
    this.game = game;
    this.imagePath = imagePath;
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.moves = false;
    this.body.immovable = true;
    this.interactButtonReady = true;
    this.textActive = false;
    this.masterSwordOpened = false;
    this.actionSprite = null;
    this.hasInteracted = false;
    
    this.timer = this.game.time.create(false);
    this.timer.loop(1200, function(){
        this.destroy();
        this.level.link.canMove = true;
        this.level.link.frame = 0;
        this.timer.stop();
        this.open = true;
    }, this);
};

gameEngine.door_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.door_prefab.prototype.constructor = gameEngine.door_prefab;

gameEngine.door_prefab.prototype.update = function(){ 
    //Collision with walls and other map collidables
    this.paused = false;
    this.game.physics.arcade.collide(this, this.level.link);
    if(!this.hasInteracted){
        if(this.interactable.activated == true){
            if(this.level.link.hasMasterSword){
                this.timer.start();
                this.masterSwordOpened = true;
                this.level.link.canMove = false;
                this.level.link.frame = 13;
                this.actionSprite = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.MASTER_SWORD, this.level.link.x -2, this.level.link.y, this.level);
                this.game.add.existing(this.actionSprite);
                this.hasInteracted = true;
            } else if(this.level.link.lettersCounter == 4){
                this.timer.start();
                this.level.link.frame = 13;
                this.level.link.canMove = false;
                this.actionSprite = new gameEngine.pickup_prefab(this.game, SYSTEM_CONSTANTS.PICKUPS.LETTER, this.level.link.x -4, this.level.link.y, this.level);
                this.game.add.existing(this.actionSprite);
                this.hasInteracted = true;
            }
        }
        else if(this.interactable.activated == true && this.level.pause.paused == false && this.interactButtonReady == true){
            TEXT_RENDERER.create(["If you want to pass you must gather the four letters or show your true power"]);
            this.level.pause.paused = true;
            this.interactButtonReady = false;
            this.textActive = true;
        }
        else if(this.level.pause.paused == true && InputManager.A.isDown && this.interactButtonReady == true && this.textActive == true){
            this.level.pause.paused = false;
            TEXT_RENDERER.reset();
            this.interactButtonReady = false;
            this.textActive = false;
        }

        if(InputManager.A.isDown == false){
            this.interactButtonReady = true;
        }
    }
    
    if(this.open){
        this.interactable.kill();
        this.actionSprite.kill();
        this.kill();
        
    }
    TEXT_RENDERER.getUpdatedText();

};