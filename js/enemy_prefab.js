var gameEngine = gameEngine || {};

gameEngine.enemy_prefab = function(game,x,y,level){
    Phaser.Sprite.call(this,game,x,y,'jumper');
    this.anchor.setTo(.5);
    this.animations.add('walk',[0,1,2,3],10,true);
    this.animations.play('walk');
    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.game.physics.arcade.enable(this);
    
};

gameEngine.enemy_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.enemy_prefab.prototype.constructor = gameEngine.enemy_prefab;

gameEngine.enemy_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);   
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

    
};