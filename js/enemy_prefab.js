var gameEngine = gameEngine || {};

gameEngine.enemy_prefab = function(game,type,x,y,level){
    this.type = type;
    
    this.states;
    this.currentState;
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    
    switch(this.type)
        {
            case SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK:
            {
                this.states = {WALK: 0, SHOOT: 1};
                this.state = this.states.WALK;
                
                this.animations.add('walk_down',[2,3],10,true);
                this.animations.add('walk_left',[0,1],10,true);
                this.animations.add('walk_right',[4,5],10,true);
                this.animations.add('walk_up',[6,7],10,true);
                
                this.animations.play('walk_down');
            }break;
            case SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA:
            {

            }break;
            default:
            {

            }break;
        }
    
    //this.animations.add('walk_down',[0,1,2,3],10,true);

    
    this.anchor.setTo(.5);

    this.level = level;
    this.game.physics.arcade.enable(this);
    
};

gameEngine.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.enemy_prefab.prototype.constructor = gameEngine.enemy_prefab;

gameEngine.enemy_prefab.prototype.update = function(){
    //(this.game.physics.arcade.collide(this,this.level.walls);   
    switch(this.type)
    {
        case SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK:
        {
            
        }break;
        case SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA:
        {
            
        }break;
        default:
        {
            
        }break;
    }
    /*
    if(this.body.blocked.right || this.body.blocked.left){
        this.direction *=-1;
        this.scale.x = this.direction;        
    }
    
    this.body.velocity.x = this.speed*this.direction;
    
    this.game.physics.arcade.collide(this,this.level.hero,
    function(enemy,hero){
        if(enemy.body.touching.up && hero.body.touching.down){
            hero.body.velocity.y = - ConfigOptions.linkSpeed;
            enemy.kill();
        } else{
            //enemy.level.camera.shake(0.05,500);
            //hero.reset(65,100);
            enemy.level.hit();
        }
    });
    */
    
};