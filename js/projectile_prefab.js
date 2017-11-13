var gameEngine = gameEngine || {};

gameEngine.projectile_prefab = function(game,type,x,y,level){
    this.type = type;
    this.game = game;
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    
    switch(this.type)
        {
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.ROCK:
            {                
                this.animations.add('shoot',[34],1,true);
                
                this.animations.play('shoot');
            }break;
            case SYSTEM_CONSTANTS.PROJECTILE_TYPES.FIREBALL:
            {
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
    
};

gameEngine.projectile_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.projectile_prefab.prototype.constructor = gameEngine.projectile_prefab;

gameEngine.projectile_prefab.prototype.update = function(){
    
        /*this.game.physics.arcade.overlap(this, this.level.link, 
            function(projectile, link){
            
                var destroy = false;

                if(projectile.body.velocity.x == 0){
                   if(projectile.body.velocity.y > 0 && link.facingDirection == "up"){
                       destroy = true;
                   } else if(projectile.body.velocity.y < 0 && link.facingDirection == "down") {
                       destroy = true;
                   }
                }
                else if(projectile.body.velocity.y == 0){
                   if(projectile.body.velocity.x > 0 && link.facingDirection == "left"){
                       destroy = true;
                   } else if(projectile.body.velocity.x < 0 && link.facingDirection == "right") {
                       destroy = true;
                   }
                } 

                if(destroy){
                    projectile.destroy();
                } else {
                    //link loses hp
                }
            }
        );
    
    this.game.physics.arcade.overlap(this, this.level.walls, 
            function(projectile, walls){
                projectile.destroy();
            }
    );*/
    
};