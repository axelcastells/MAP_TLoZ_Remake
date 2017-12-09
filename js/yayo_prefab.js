var gameEngine = gameEngine || {};

gameEngine.yayo_prefab = function(game, pos_x, pos_y, interactable, level){    
    Phaser.Sprite.call(this, game, pos_x, pos_y,'', 0);
    this.interactable = interactable;
    this.x = pos_x;
    this.y = pos_y;
    this.game = game;
    this.level = level;
    this.interactButtonReady = true;
    this.textActive = false;
};

gameEngine.yayo_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.yayo_prefab.prototype.constructor = gameEngine.yayo_prefab;

gameEngine.yayo_prefab.prototype.update = function(){ 
        

    if(this.interactable.activated == true && this.level.pause.paused == false && this.interactButtonReady == true){
        TEXT_RENDERER.create(["The statues must HIDE an alternative key to the temple. Maybe you can find it! Nye he he!"]);
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
    
};