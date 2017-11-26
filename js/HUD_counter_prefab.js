var gameEngine = gameEngine || {};

gameEngine.HUD_counter_prefab = function(game, pos_x, pos_y, imagePath, counter, level){
    Phaser.Sprite.call(this, game, pos_x, pos_y,imagePath, 0);
    this.anchor.setTo(0.5);
    
    this.counterText = game.add.text(pos_x + 7,pos_y-5,'x'+counter);
    //this.gemTextUI.font = 'Press Start 2P';
    this.counterText.fill = 'white';
    this.counterText.fontSize = 10;
    this.counterText.fixedToCamera = true;
    
    console.log("HUD CREATED");
    this.level = level;
};

gameEngine.HUD_counter_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.HUD_counter_prefab.prototype.constructor = gameEngine.HUD_counter_prefab;

gameEngine.HUD_counter_prefab.prototype.update = function(){
    
    
};