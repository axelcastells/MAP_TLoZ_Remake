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
    
    switch(this.level.link.facingDirection){
        case "right":
            this.body.x = this.level.link.body.x + 6;
            this.body.y = this.level.link.body.y + 4;
        break;
        case "left":
            this.body.x = this.level.link.body.x - 11;
            this.body.y = this.level.link.body.y + 4;
        break;
        case "up":
            this.body.x = this.level.link.body.x + 1;
            this.body.y = this.level.link.body.y - 12;
        break;
        case "down":
            this.body.x = this.level.link.body.x + 3;
            this.body.y = this.level.link.body.y + 7;
        break;
    }


};