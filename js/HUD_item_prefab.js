var gameEngine = gameEngine || {};

gameEngine.HUD_item_prefab = function(game, pos_x, pos_y, imagePath, level){
    Phaser.Sprite.call(this, game, pos_x, pos_y,imagePath, 0);
    this.anchor.setTo(0.5);
    console.log("HUD CREATED");
    this.level = level;
};

gameEngine.HUD_item_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.HUD_item_prefab.prototype.constructor = gameEngine.HUD_item_prefab;

gameEngine.HUD_item_prefab.prototype.update = function(){
    
    
};