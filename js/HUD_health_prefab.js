var gameEngine = gameEngine || {};

gameEngine.HUD_health_prefab = function(game, pos_x, pos_y, currentLife, level){
    Phaser.Sprite.call(this, game, pos_x, pos_y,'health', currentLife);
    this.x = pos_x;
    this.y = pos_y;
    this.anchor.setTo(0, 0.5);
    this.game = game;
    this.level = level;
};

gameEngine.HUD_health_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.HUD_health_prefab.prototype.constructor = gameEngine.HUD_health_prefab;

gameEngine.HUD_health_prefab.prototype.update = function(){
    this.frame = this.level.link.life;
};