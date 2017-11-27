var gameEngine = gameEngine || {};

var parent;
var active;
var level;

gameEngine.hitbox_prefab = function(game, parent, startActive, pos_x, pos_y, size_x, size_y, offset_x, offset_y, level){
    Phaser.Sprite.call(this, game, pos_x, pos_y,'hitbox',0);
    this.anchor.setTo(.5);
    game.physics.arcade.enable(this);
    this.body.setSize(size_x, size_y, offset_x, offset_y);
    
    this.active = startActive;
    this.parent = parent;
    this.level = level;
};

gameEngine.hitbox_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.hitbox_prefab.prototype.constructor = gameEngine.hitbox_prefab;

gameEngine.hitbox_prefab.prototype.update = function(){
    //Set enemy colliding functions here
    this.game.physics.arcade.collide(this, this.level.enemy, function(hibox,enemy){
        enemy.enemyHitSound.play();
        enemy.reset(550, 800)
    });
    this.x = this.level.link.x;
    this.y = this.level.link.y;
    
};