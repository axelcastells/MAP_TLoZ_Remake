var gameEngine = gameEngine || {};

var projectileType;

gameEngine.projectile_prefab = function(game,type,x,y,direction,level){
    
    this.game = game;
    this.projectileTYpe = type;
    
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    
    switch(type)
        {
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.ROCK:
            {        
                this.type = type;
                this.speed = 500;
                this.animations.add('shoot',[34],1,true);
                
                this.animations.play('shoot');
            }break;
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.FIREBALL:
            {
                this.type = type;
                this.speed = 50;
                this.animations.add('shoot',[32,33],10,true);
                
                this.animations.play('shoot');
            }break;
            default:
            {

            }break;
        }

    
    this.anchor.setTo(.5);

    this.level = level;
    this.game.physics.arcade.enable(this);
    
    this.body.velocity.x += direction.x * this.speed;
    this.body.velocity.y += direction.y * this.speed;
    
    //console.log(this.body.velocity);
};

gameEngine.projectile_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.projectile_prefab.prototype.constructor = gameEngine.projectile_prefab;

gameEngine.projectile_prefab.prototype.update = function(){

    this.game.physics.arcade.collide(this, this.level.walls, function(bullet,link){
    if(bullet.body.touching){
        bullet.kill();
    }});
    
    this.game.physics.arcade.collide(this, this.level.mapCollisions);
    
    if(this.projectileType != SYSTEM_CONSTANTS.PROJECTILE_TYPES.SWORD){
        this.game.physics.arcade.collide(this,this.level.link,
        function(bullet,link){
        if(bullet.body.touching){

            if(link.body.touching.down && link.facingDirection == "down" && !link.attacking){
                console.log("bullet blocked down");
            } else if (link.body.touching.up && link.facingDirection == "up" && !link.attacking){
                console.log("bullet blocked up");
            }
            else if (link.body.touching.right && link.facingDirection == "right" && !link.attacking){
                console.log("bullet blocked right");
            }
            else if (link.body.touching.left && link.facingDirection == "left" && !link.attacking){
                console.log("bullet blocked left");
            } else {
                link.reset(500, 740);
            }
            console.log("Bullet Collision!");
            bullet.kill();
        }});
    } else {
        this.game.physics.arcade.collide(this,this.level.enemy,
        function(bullet,enemy){
            enemy.reset(550, 800);
        });
        
        this.game.physics.arcade.collide(this,this.level.enemy2,
        function(bullet,enemy){
            enemy.reset(600, 700);
        });
    }
    

};