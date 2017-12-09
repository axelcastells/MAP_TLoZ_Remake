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
};

gameEngine.door_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.door_prefab.prototype.constructor = gameEngine.door_prefab;

gameEngine.door_prefab.prototype.update = function(){ 
    //Collision with walls and other map collidables
    this.paused = false;
    this.game.physics.arcade.collide(this, this.level.link);
    
    if(this.interactable.activated == true && (this.level.link.hasMasterSword || this.level.link.lettersCounter == 4)){
        this.open = true;
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
    
    
    if(this.open){
        this.kill();
        this.interactable.kill();
    }
    TEXT_RENDERER.getUpdatedText();

};