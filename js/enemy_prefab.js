var gameEngine = gameEngine || {};

gameEngine.enemy_prefab = function(game,type,x,y,level){
    this.game = game;

    this.counter = 0;
    this.speed = 100;
    this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
    this.hp;
    
    this.updateCounter = function(){
        if(!level.pause.paused)
            this.counter-=0.1; 
    }
    
    this.timer = this.game.time.create(false);
    this.timer.loop(100, this.updateCounter, this);
    this.timer.start();
    
    this.states;
    this.currentState;
            
    this.level = level;
    
    this.GetDMG = function(dmg){
        this.hp -= dmg;
        if(this.hp <= 0)
            this.destroy();
    }
    
    //console.log(this.type);
    switch(type)
        {
            case SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK:
            {
                Phaser.Sprite.call(this,game,x,y,'enemies');
                this.game.physics.arcade.enable(this);
                
                this.type = type;
                console.log("Created Octorok");
                console.log("cell x: " + this.cellX + " cell y: " + this.cellY);
                this.states = {INIT: 0, WALK: 1, CHARGE: 2, SHOOT: 3, STOPPED: 4};
                this.currentState = this.states.INIT;
                
                this.animations.add('walk_down',[2,3],10,true);
                this.animations.add('walk_left',[0,1],10,true);
                this.animations.add('walk_right',[4,5],10,true);
                this.animations.add('walk_up',[6,7],10,true);
                
                this.animations.play('walk_down');

                this.hp = 1;
            }break;
            case SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA:
            {
                Phaser.Sprite.call(this,game,x,y,'enemies');
                this.game.physics.arcade.enable(this);
                
                this.type = type;
                console.log("Created Zora");
                this.states = {INIT: 0, HIDDEN: 1, EMERGING: 2, EMERGED: 3, ATTACK: 4};
                this.currentState = this.states.INIT;
                
                this.animations.add('hidden',[22],1,true);
                this.animations.add('emerging',[16,17],1,false);
                this.animations.add('emerged_down',[18],1,true);
                this.animations.add('emerged_up',[19],1,true);
                
                this.animations.play('hidden');

                this.hp = 1;
                this.body.moves = false;
            }break;
            case SYSTEM_CONSTANTS.ENEMY_TYPES.TEKTITE:
            {
                Phaser.Sprite.call(this,game,x,y,'enemies');
                this.game.physics.arcade.enable(this);
                
                this.type = type;
                console.log("Created Tektite");
                this.states = {INIT: 0, PREJUMP: 1, JUMP: 2, LANDED: 3};
                this.currentState = this.states.INIT;
                
                this.animations.add('iddle',[24,25],1,true);
                
                this.animations.play('iddle');

                this.hp = 1;
            }break;
            case SYSTEM_CONSTANTS.ENEMY_TYPES.GLEEOK:
            {
                Phaser.Sprite.call(this,game,x,y,'boss');
                this.game.physics.arcade.enable(this);
                
                this.type = type;
                console.log("Created Gleeok");
                
                this.states = {INIT: 0, CHARGE: 1, ATTACK: 2, DYING: 3, DEAD: 4}
                this.currentState = this.states.INIT;
                
                this.animations.add('iddle',[0,1,2,1],5,true);
                this.animations.play('iddle');
                
                this.neck = new Phaser.Point(x,y);
                
                this.hp = 10;
                
                this.headsCount = 3;
                this.heads = [];
                
                for(var i = 0; i < this.headsCount; i++)
                {  
                    var head = new gameEngine.gleeokHead_prefab(this.game, this, this.body.x, this.body.y+40, this.level);
                    this.game.add.existing(head);
                    
                    this.heads.push(head);
                }
                

                
            }break;
            default:
            {
    
            }break;
        }
    
    

    this.anchor.setTo(.5);

    
    //Load audios
    this.enemyHitSound = this.level.add.audio('hit');
    
};

gameEngine.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.enemy_prefab.prototype.constructor = gameEngine.enemy_prefab;

gameEngine.enemy_prefab.prototype.update = function(){
        
    if(this.level.pause.paused && !this.level.link.isInteracting){
        this.animations.stop();
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
    else
    {
        switch(this.type)
        {
            case SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK:
            {
                this.game.physics.arcade.collide(this, this.level.walls);
                this.game.physics.arcade.collide(this, this.level.mapCollisions);
                this.game.physics.arcade.collide(this, this.level.water);
                this.game.physics.arcade.overlap(this, this.level.link.boomerang, function(enemy, boomerang){
                    enemy.currentState = enemy.states.STOPPED;
                    enemy.counter = 2;
                });

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

                        if(this.body.velocity.x == -1 && this.body.velocity.y == 0)
                            {
                                this.animations.play("walk_left");
                                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.LEFT;
                            }
                            
                        else if(this.body.velocity.x == 1 && this.body.velocity.y == 0)
                            {
                                this.animations.play("walk_right"); 
                                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.RIGHT;
                            }
                            
                        else if(this.body.velocity.x == 0 && this.body.velocity.y == -1)
                            {
                                this.animations.play("walk_up");
                                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.UP;
                            }
                            
                        else if(this.body.velocity.x == 0 && this.body.velocity.y == 1)
                            {
                                this.animations.play("walk_down");
                                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
                            }
                            

                        this.body.velocity.x *= this.speed;
                        this.body.velocity.y *= this.speed;

                        this.currentState = this.states.WALK;
                    }break;
                    case this.states.WALK:
                    {                
                        if(this.counter <= 0)
                        {
                            this.counter = 0.5;

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
                        if(this.counter <= 0){
                            this.animations.currentAnim.restart();
                            this.bullet = new gameEngine.projectile_prefab(this.game, SYSTEM_CONSTANTS.PROJECTILE_TYPES.ROCK, this.position.x + this.direction.x * 8, this.position.y + this.direction.y * 8, this.direction, this.level);
                            console.log("Octorok attacking")
                            this.game.add.existing(this.bullet);
                            this.currentState = this.states.INIT;
                        }
                        
                    }break;
                    case this.states.STOPPED:
                    {
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                        this.animations.currentAnim.restart();
                        this.animations.currentAnim.stop();
                        
                    
                        if(this.counter <= 0)
                        {
                            this.currentState = this.states.INIT;
                        }                    
                    
                    }break;
                }break;
                
            }break;
            case SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA:
            {
                //console.log(this.currentState);
                switch(this.currentState)
                {
                    case this.states.INIT:
                    {
                        var tmp = parseInt(Math.random()*this.level.enemySpawnPool.water.length);
                        this.position.x = this.level.enemySpawnPool.water[tmp].x*16;
                        this.position.y = this.level.enemySpawnPool.water[tmp].y*16;

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
            case SYSTEM_CONSTANTS.ENEMY_TYPES.TEKTITE:
            {
                //console.log(this.currentState);
                switch(this.currentState)
                {
                    case this.states.INIT:
                    {
                        this.counter = 3;
                        this.currentState = this.states.PREJUMP;
                    }break;
                    case this.states.PREJUMP:
                    {
                        if(this.counter <= 0)
                        {
                            this.body.velocity.y = ((Math.random()*150)) * Math.round((Math.random()*2)-1);
                            this.body.velocity.x = ((Math.random()*150)) * Math.round((Math.random()*2)-1);
                            this.counter = .5;
                            this.currentState = this.states.JUMP;  
                        }

                    }break;
                    case this.states.JUMP:
                    {
                        this.frame = 25;
                        if(this.counter <= 0)
                            this.currentState = this.states.LANDED;
                    }break;
                    case this.states.LANDED:
                    {
                        this.body.velocity.y = 0;
                        this.body.velocity.x = 0;
                        this.currentState = this.states.INIT;
                    }break;
                    
                }

            }break;
            case SYSTEM_CONSTANTS.ENEMY_TYPES.GLEEOK:
            {
                this.neck.x = this.body.x+10;
                this.neck.y = this.body.y+30;
            }break;
            default:
            {
                
            }break;
        }
    }

    this.game.physics.arcade.overlap(this,this.level.link,
        function(enemy,link){
            if(enemy.body.touching && link.attacking){
                console.log("Enemy Collision!");
                enemy.GetDMG(link.attackPower);
                //enemy.kill();
            } else{
                if(link.vulnerabilityCounter <= 0)
                {
                    link.vulnerabilityCounter = 1;
                    link.recieveDamage(1);
                }
                
                //enemy.level.hit();
            }
    });
    
    //Bounds check
    
    if (this.position.x - gameEngine.game.camera.x < 0){
             
        this.destroy();
    }

    else if(this.position.x - gameEngine.game.camera.x > this.level.worldCellSize - 1){

        this.destroy();
    }
    
    if (this.position.y - gameEngine.game.camera.y < 0){

        this.destroy();
    }
    else if(this.position.y - gameEngine.game.camera.y > this.level.worldCellSize - 1){

        this.destroy();
    }
    
};