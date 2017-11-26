var gameEngine = gameEngine || {};

gameEngine.HUD_health_prefab = function(game, pos_x, pos_y, level){
    Phaser.Sprite.call(this, game, pos_x, pos_y,'link', 0);
    this.anchor.setTo(0.5);
    console.log("HUD CREATED");
    this.level = level;
};

gameEngine.HUD_health_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.HUD_health_prefab.prototype.constructor = gameEngine.HUD_health_prefab;

gameEngine.HUD_health_prefab.prototype.update = function(){
    
    
};