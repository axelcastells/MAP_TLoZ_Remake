var gameEngine = gameEngine || {};


gameEngine.projectile_prefab = function(game,type,x,y,direction,level){

    
    this.type = type;
    this.game = game;
        
    this.direction = direction; 

    this.level = level;

    this.enemyShotSound = this.level.add.audio('enemyShot');
    
    //Phaser.Sprite.call(this,game,x,y,'enemies');
    

    switch(type)
        {
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.ROCK:
            {         
                Phaser.Sprite.call(this,game,x,y,'enemies');
                this.type = type;
                this.speed = 500;
                this.animations.add('shoot',[34],1,true);
                //this.enemyShotSound.play();
                this.animations.play('shoot');
            }break;
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.FIREBALL:
            {
                Phaser.Sprite.call(this,game,x,y,'enemies');
                this.type = type;
                this.speed = 50;
                this.animations.add('shoot',[32,33],10,true);
                this.enemyShotSound.play();
                this.animations.play('shoot');
            }break;
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.SWORD:
            {    
                Phaser.Sprite.call(this,game,x,y,'sword');
                this.type = type;
                this.speed = 250;
            }break;
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.MASTER_SWORD:
            {    
                Phaser.Sprite.call(this,game,x,y,'master_sword');
                this.type = type;
                this.speed = 320;
            }break;
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.BOOMERANG:
            {    
                this.updateCounter = function(){
                    if(!level.pause.paused)
                        this.counter-=0.1; 
                }
                this.timer = this.game.time.create(false);
                this.timer.loop(100, this.updateCounter, this);
                this.timer.start();
                this.counter = 0;
                this.offset = 10;

                Phaser.Sprite.call(this,game,x,y,'boomerang');

                this.type = type;
                this.speed = 1;
                console.log("Created Boomerang!");
                this.tempInitPosition = {};
                this.tempInitPosition.x = x;
                this.tempInitPosition.y = y;

                this.states = {INIT: 0, GO: 1, STAY: 2, BACK: 3}
                this.currentState = this.states.INIT;
            }break;
            default:
            {

            }break;
        }


    this.anchor.setTo(0.5);

    switch (this.direction){
        case SYSTEM_CONSTANTS.DIRECTIONS.UP:
            this.angle = 0;
        break;
        case SYSTEM_CONSTANTS.DIRECTIONS.DOWN:
            this.angle = 180;
        break;
        case SYSTEM_CONSTANTS.DIRECTIONS.LEFT:
            this.angle = 270;
        break;
        case SYSTEM_CONSTANTS.DIRECTIONS.RIGHT:
            this.angle = 90;
        break;
        default:
        
        break;
    }
    this.level = level;
    this.game.physics.arcade.enable(this);
};

gameEngine.projectile_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.projectile_prefab.prototype.constructor = gameEngine.projectile_prefab;

gameEngine.projectile_prefab.prototype.update = function(){
    if(this.level.pause.paused){
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
    } else {
            this.body.velocity.x = this.direction.x * this.speed;
            this.body.velocity.y = this.direction.y * this.speed;

            switch(this.type)
            {
                case SYSTEM_CONSTANTS.PROJECTILE_TYPES.BOOMERANG:
                {
                    this.angle += 10;
                    switch(this.currentState)
                    {
                        case this.states.INIT:
                        {
                            this.speed = 100;
                            this.counter = 1;
                            this.currentState = this.states.GO;
                        }break;
                        case this.states.GO:
                        {
                            if(this.counter <= 0)
                            {
                                this.speed = 0;
                                this.counter = 0.5;
                                this.currentState = this.states.STAY;
                            }
                        }break;
                        case this.states.STAY:
                        {
                            if(this.counter <= 0)
                            {
                                this.speed = -100;
                                this.currentState = this.states.BACK;
                            }
                        }break;
                        case this.states.BACK:
                        {

                        }break;
                    }
                }break;
            }
    }
    this.game.physics.arcade.collide(this, this.level.walls, function(bullet,link){
        if(bullet.body.touching){
            if(this.type == SYSTEM_CONSTANTS.PROJECTILE_TYPES.BOOMERANG)
                link.isBoomerangThrown = false;
            bullet.kill();
    }});
    
    this.game.physics.arcade.collide(this, this.level.mapCollisions,  function(bullet,link) {
        if(bullet.body.touching){
            if(this.type == SYSTEM_CONSTANTS.PROJECTILE_TYPES.BOOMERANG)
                link.isBoomerangThrown = false;
            bullet.kill();
    }});
    
    if(this.type != SYSTEM_CONSTANTS.PROJECTILE_TYPES.SWORD && this.type != SYSTEM_CONSTANTS.PROJECTILE_TYPES.MASTER_SWORD){
        this.game.physics.arcade.collide(this,this.level.link,
        function(bullet,link){
        if(bullet.body.touching){
            console.log("Bullet Collision!");
            console.log(this.type);
            if(this.type == SYSTEM_CONSTANTS.PROJECTILE_TYPES.BOOMERANG)
            {
                link.isBoomerangThrown = false;
                console.log("Boomerang Recovered!");
            }
            else if(link.body.touching.down && link.facingDirection == "down" && !link.attacking){
                console.log("bullet blocked down");
                link.linkShieldSound.play();
            } else if (link.body.touching.up && link.facingDirection == "up" && !link.attacking){
                console.log("bullet blocked up");
                link.linkShieldSound.play();
            }
            else if (link.body.touching.right && link.facingDirection == "right" && !link.attacking){
                console.log("bullet blocked right");
                link.linkShieldSound.play();
            }
            else if (link.body.touching.left && link.facingDirection == "left" && !link.attacking){
                console.log("bullet blocked left");
                link.linkShieldSound.play();
            } else {
                console.log("bullet not blocked");
                link.recieveDamage(1);
            }
            bullet.kill();
        }});
    } else {
        this.game.physics.arcade.collide(this,this.level.enemies,
        function(bullet,enemy){
            enemy.destroy();
            //if(type != SYSTEM_CONSTANTS.PROJECTILE_TYPES.BOOMERANG)
            bullet.kill();
        });
    }
    

};