var gameEngine = gameEngine || {};

gameEngine.enemy_prefab = function(game,type,x,y,level){
    this.type = type;
    this.game = game;
    this.counter = 0;
    this.speed = 100;
    this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
    
    this.updateCounter = function(){this.counter-=0.1}
    
    this.timer = this.game.time.create(false);
    this.timer.loop(100, this.updateCounter, this);
    this.timer.start();
    
    this.states;
    this.currentState;
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    
    switch(this.type)
        {
            case SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK:
            {
                this.states = {INIT: 0, WALK: 1, CHARGE: 2, SHOOT: 3};
                this.currentState = this.states.INIT;
                
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

    
    this.anchor.setTo(.5);

    this.level = level;
    this.game.physics.arcade.enable(this);
    
};

gameEngine.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.enemy_prefab.prototype.constructor = gameEngine.enemy_prefab;

gameEngine.enemy_prefab.prototype.update = function(){
    switch(this.type)
    {
        case SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK:
        {
            this.game.physics.arcade.collide(this, this.level.walls);
            this.game.physics.arcade.collide(this, this.level.mapCollisions);
            
            switch(this.currentState)
            {
                case this.states.INIT:
                {
                    this.counter = Math.random()*2;
                    
                    this.body.velocity.x = Math.round((Math.random()*2)-1);
                    if(this.body.velocity.x == 0){
                        this.body.velocity.y = Math.round((Math.random()*2)-1);
                    }
                    else this.body.velocity.y = 0;
                    
                    if(this.body.velocity.x == 0 && this.body.velocity.y == 0)
                    {

                    }
                    else{
                        this.direction.x = this.body.velocity.x;
                        this.direction.y = this.body.velocity.y;
                    }
                    
                    if(this.body.velocity.x == -1 && this.body.velocity.y == 0)
                        this.animations.play("walk_left");
                    else if(this.body.velocity.x == 1 && this.body.velocity.y == 0)
                        this.animations.play("walk_right");
                    else if(this.body.velocity.x == 0 && this.body.velocity.y == -1)
                        this.animations.play("walk_up");
                    else if(this.body.velocity.x == 0 && this.body.velocity.y == 1)
                        this.animations.play("walk_down");
                    
                    this.body.velocity.x *= this.speed;
                    this.body.velocity.y *= this.speed;
                    
                    this.currentState = this.states.WALK;
                }break;
                case this.states.WALK:
                {                
                    if(this.counter <= 0)
                    {
                        this.counter = 0.3;
                        
                        this.animations.currentAnim.restart();
                        this.animations.currentAnim.stop();
                        
                        this.currentState = this.states.CHARGE;
                    }
                }break;
                case this.states.CHARGE:
                {
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
                    
                    //this.scale.setTo(1.5);
                    if(this.counter <= 0)
                    {
                        this.animations.currentAnim.restart();
                        
                        this.currentState = this.states.SHOOT;
                    }
                }break;
                case this.states.SHOOT:
                {
                    this.bullet = new gameEngine.projectile_prefab(this.game, SYSTEM_CONSTANTS.PROJECTILE_TYPES.ROCK, this.body.position.x, this.body.position.y, this.direction, this.level);
                    this.game.add.existing(this.bullet);

                    //this.scale.setTo(1);
                    this.currentState = this.states.INIT;
                }break;
            }
        }break;
        case SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA:
        {
            
        }break;
        default:
        {
            
        }break;
    }
    
    //console.log(this.counter);
    
};