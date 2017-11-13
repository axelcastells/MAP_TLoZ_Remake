var gameEngine = gameEngine || {};

gameEngine.projectile_prefab = function(game,type,x,y,level){
    this.type = type;
    this.game = game;
    
    this.states;
    this.currentState;
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    
    switch(this.type)
        {
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.ROCK:
            {
                this.states = {INIT: 0, WALK: 1, CHARGE: 2, SHOOT: 3};
                this.currentState = this.states.INIT;
                
                this.animations.add('walk_down',[2,3],10,true);
                this.animations.add('walk_left',[0,1],10,true);
                this.animations.add('walk_right',[4,5],10,true);
                this.animations.add('walk_up',[6,7],10,true);
                
                this.animations.play('walk_down');
            }break;
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.FIREBALL:
            {

            }break;
            default:
            {

            }break;
        }

    
    this.anchor.setTo(.5);

    this.level = level;
    this.game.physics.arcade.enable(this);
    
};

gameEngine.projectile_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.projectile_prefab.prototype.constructor = gameEngine.projectile_prefab;

gameEngine.projectile_prefab.prototype.update = function(){
    
    
};