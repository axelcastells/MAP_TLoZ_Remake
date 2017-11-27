var gameEngine = gameEngine || {};

gameEngine.enemy_prefab = function(game,type,x,y,level){
    this.game = game;

    this.counter = 0;
    this.speed = 100;
    this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
    
    this.updateCounter = function(){
        if(!level.pause.paused)
            this.counter-=0.1; 
    }
    
    this.timer = this.game.time.create(false);
    this.timer.loop(100, this.updateCounter, this);
    this.timer.start();
    
    this.states;
    this.currentState;
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
console.log(this.type);
    switch(type)
        {
            case SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK:
            {
                this.type = type;
                console.log("Created Octorok");
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
                this.type = type;
                console.log("Created Zora");
                this.states = {INIT: 0, HIDDEN: 1, EMERGING: 2, EMERGED: 3, ATTACK: 4};
                this.currentState = this.states.INIT;
                
                this.animations.add('hidden',[22],1,true);
                this.animations.add('emerging',[16,17],1,false);
                this.animations.add('emerged_down',[18],1,true);
                this.animations.add('emerged_up',[19],1,true);
                
                this.animations.play('hidden');
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
    if(this.level.pause.paused){
        this.animations.stop();
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }else {
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

                this.game.physics.arcade.collide(this,this.level.link,
                function(enemy,link){
                if(enemy.body.touching){
                    console.log("Enemy Collision!");
                    //enemy.kill();
                } else{

                    //enemy.level.hit();
                }
        });

            }break;
            case SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA:
            {
                //console.log(this.currentState);
                switch(this.currentState)
                {
                    case this.states.INIT:
                    {
                        this.position.x = this.level.link.position.x + ((Math.random()*100) - 50);
                        this.position.y = this.level.link.position.y + ((Math.random()*100) - 50);

                        this.currentState = this.states.HIDDEN;
                    }break;
                    case this.states.HIDDEN:
                    {                    
                        if(this.counter <= 0)
                        {
                            this.animations.play("emerging");
                            this.currentState = this.states.EMERGING;
                        }
                    }break;
                    case this.states.EMERGING:
                    {
                        if(!this.animations.currentAnim.isPlaying)
                        {

                            this.counter = 2;

                            if(this.position.y <= this.level.link.position.y)
                            {
                                this.animations.play("emerged_down");
                            }
                            else{
                                this.animations.play("emerged_up");
                            }

                            this.currentState = this.states.EMERGED;

                        }

                    }break;
                    case this.states.EMERGED:
                    {
                        if(this.counter <= 0){
                            this.counter = 2;

                            this.direction = new Phaser.Point(this.level.link.position.x - this.position.x, this.level.link.position.y - this.position.y);
                            this.direction = Phaser.Point.normalize(this.direction);

                            //console.log(this.direction);

                            this.bullet = new gameEngine.projectile_prefab(this.game, SYSTEM_CONSTANTS.PROJECTILE_TYPES.FIREBALL, this.body.position.x, this.body.position.y, this.direction, this.level);
                            this.game.add.existing(this.bullet);

                            this.currentState = this.states.ATTACK;
                        }
                    }break;
                    case this.states.ATTACK:
                    {
                        if(this.counter <= 0){
                            this.currentState = this.states.INIT;
                        }
                    }break;
                }
            }break;
            default:
            {

            }break;
        }
    }    
};