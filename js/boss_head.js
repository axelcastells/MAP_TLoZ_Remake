var gameEngine = gameEngine || {};

gameEngine.gleeokHead_prefab = function(game,type,x,y,level){
    this.game = game;

    this.counter = 0;
    this.speed = 100;
    this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
    this.hp = 3;
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    this.game.physics.arcade.enable(this);

    this.type = type;
    console.log("Created Gleeok");

    this.states = {INIT: 0, LINKED: 1, UNLINKED: 2, DYING: 3, DEAD: 4}
    this.currentState = this.states.INIT;

    this.animations.add('linked',[38],1,true);
    this.animations.add('unlinked',[39],1,true);
    this.animations.play('linked');
    
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
    
    
    

    console.log(this.type);
    
    

    this.anchor.setTo(.5);

    
    //Load audios
    //this.enemyHitSound = this.level.add.audio('hit');
    
};

gameEngine.gleeokHead_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.gleeokHead_prefab.prototype.constructor = gameEngine.gleeokHead_prefab;

gameEngine.gleeokHead_prefab.prototype.update = function(){
    if(this.level.pause.paused && !this.level.link.isInteracting){
        this.animations.stop();
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
    else
    {
        //Code Logic Here
    }
    
    this.game.physics.arcade.collide(this, this.level.walls, function(enemy, wall){
        //Redirect direction on collision normal
    })

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
    
    //console.log(this.counter);
};