var gameEngine = gameEngine || {};


gameEngine.projectile_prefab = function(game,type,x,y,direction,level){
    
    this.game = game;

    this.projectileTYpe = type;
    
    this.level = level;
    
    this.enemyShotSound = this.level.add.audio('enemyShot');
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    

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
                this.speed = 150;
            }break;
            default:
            {

            }break;
        }


    this.anchor.setTo(0.5);
    this.direction = direction;
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
    }
    this.game.physics.arcade.collide(this, this.level.walls, function(bullet,link){
        if(bullet.body.touching){
            bullet.kill();
    }});
    
    this.game.physics.arcade.collide(this, this.level.mapCollisions,  function(bullet,link) {
        if(bullet.body.touching){
            bullet.kill();
    }});
    
    if(this.type != SYSTEM_CONSTANTS.PROJECTILE_TYPES.SWORD){
        this.game.physics.arcade.collide(this,this.level.link,
        function(bullet,link){
        if(bullet.body.touching){
            console.log("Bullet Collision!");
            
            if(link.body.touching.down && link.facingDirection == "down" && !link.attacking){
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
                console.log(link.life);
            }

            bullet.kill();
        }});
    } else {
        this.game.physics.arcade.collide(this,this.level.enemy,
        function(bullet,enemy){
            enemy.reset(550, 800);
            bullet.kill();
        });
        
        this.game.physics.arcade.collide(this,this.level.enemy2,
        function(bullet,enemy){
            enemy.reset(600, 700);
            bullet.kill();
        });
    }
    

};