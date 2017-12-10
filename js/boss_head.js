var gameEngine = gameEngine || {};

gameEngine.gleeokHead_prefab = function(game,gleeok,x,y,level){
    this.game = game;
    this.gleeok = gleeok;

    this.counter = 0;
    this.speed = 100;
    this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
    this.hp = 3;
    
    Phaser.Sprite.call(this,game,x,y,'enemies');
    this.game.physics.arcade.enable(this);
    
    console.log("Created Gleeok");

    this.states = {INIT: 0, LINKED: 1, UNLINKED: 2}
    this.currentState = this.states.INIT;

    this.animations.add('linked',[41],1,true);
    this.animations.add('unlinked',[42],1,true);
    this.animations.play('linked');
    
    this.force = new Phaser.Point(0,0);
    this.unlinkedSpeed = new Phaser.Point(1,1);
    
    this.neckPoints = [];
    for(var i = 0; i < 10; i++)
    {
        var neckPoint = this.game.add.sprite(x,y,'enemies',40);
        neckPoint.anchor.setTo(.5);
        this.game.physics.arcade.enable(neckPoint);
        
        this.neckPoints.push(neckPoint);
    }
    
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
        switch(this.currentState)
        {
            case this.states.INIT:
            {
                this.counter = (Math.random() * 3)+2;
                this.animations.play('linked');
                this.currentState = this.states.LINKED;
            }break;
            case this.states.LINKED:
            {
                var speed = 0.1;
                var direction = new Phaser.Point((Math.random()*2)-1,(Math.random()*2)-1);
                this.force.x += direction.x * speed;
                this.force.y += direction.y * speed;

                this.force.x = Phaser.Math.clamp(this.force.x,-2.5,2.5);
                this.force.y = Phaser.Math.clamp(this.force.y,-2.5,2.5);

                this.body.x += this.force.x;
                this.body.y += this.force.y;

                var currentHeadDistance = Phaser.Math.distance(this.body.x,this.body.y,this.gleeok.neck.x,this.gleeok.neck.y);
                if(currentHeadDistance > 30)
                {
                    this.force.x = 0;
                    this.force.y = 0;
                    var dirToBody = new Phaser.Point(this.gleeok.neck.x - this.body.x,this.gleeok.neck.y - this.body.y);
                    dirToBody.normalize();
                    
                    this.body.x += dirToBody.x * 5;
                    this.body.y += dirToBody.y * 5;
                }



                //Reconstruct Neck
                for(var i = 0; i < this.neckPoints.length; i++)
                {
                    this.neckPoints[i].body.x = this.gleeok.neck.x + ((this.body.x - this.gleeok.neck.x)*(i/this.neckPoints.length));
                    this.neckPoints[i].body.y = this.gleeok.neck.y + ((this.body.y - this.gleeok.neck.y)*(i/this.neckPoints.length));
                }
                
                this.game.physics.arcade.collide(this, this.level.link.sword, function(head, wall){
                    //Redirect direction on collision normal
                    console.log("Hit Head!");
                    
                    head.counter = 5;
                    head.animations.play('unlinked');
                    
                    for(var i = 0; i < head.neckPoints.length; i++)
                    {
                        head.neckPoints[i].body.x = 0;
                        head.neckPoints[i].body.y = 0;
                    }
                    
                    head.unlinkedSpeed.x = (Math.random()*2)-1;
                    head.unlinkedSpeed.y = (Math.random()*2)-1;
                    
                    head.currentState = head.states.UNLINKED;
                    //if(head.body.blocked.down || head.body.blocked.up){head.unlinkedSpeed.y = -head.unlinkedSpeed.y;}
                    //else if(head.body.blocked.left || head.body.blocked.right){head.unlinkedSpeed.x = -head.unlinkedSpeed.x;}
                })
                
                /*
                if(this.counter <= 0)
                {
                    this.counter = 5;
                    this.animations.play('unlinked');
                    
                    for(var i = 0; i < this.neckPoints.length; i++)
                    {
                        this.neckPoints[i].body.x = 0;
                        this.neckPoints[i].body.y = 0;
                    }
                    
                    
                    this.currentState = this.states.UNLINKED;
                }
                */
            }break;
            case this.states.UNLINKED:
            {
                this.body.y += this.unlinkedSpeed.y;
                this.body.x += this.unlinkedSpeed.x;
                
                
                //Collision with walls
                this.game.physics.arcade.collide(this, this.level.mapCollisions, function(head, wall){
                    //Redirect direction on collision normal
                    if(head.body.blocked.down || head.body.blocked.up){head.unlinkedSpeed.y = -head.unlinkedSpeed.y;}
                    else if(head.body.blocked.left || head.body.blocked.right){head.unlinkedSpeed.x = -head.unlinkedSpeed.x;}
                })
                
                if(this.counter <= 0)
                {
                    this.currentState = this.states.INIT;
                }
            }break;
        }
        
        
        //Code Logic Here
        //console.log("Pium!");
        //this.body.y += 1;
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