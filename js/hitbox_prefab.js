var gameEngine = gameEngine || {};

var parent;
var active;

gameEngine.hitbox_prefab = function(game, parent, startActive, pos_x, pos_y, size_x, size_y, offset_x, offset_y){
    Phaser.Sprite.call(this, game, pos_x, pos_y,'hitbox',0);
    this.anchor.setTo(.5);
    game.physics.arcade.enable(this);
    this.body.setSize(size_x, size_y, offset_x, offset_y);
    
    this.active = startActive;
    this.parent = parent;
};

gameEngine.hitbox_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.hitbox_prefab.prototype.constructor = gameEngine.hitbox_prefab;

gameEngine.hitbox_prefab.prototype.update = function(){
    //Set enemy colliding functions here

};