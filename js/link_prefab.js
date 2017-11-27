var gameEngine = gameEngine || {};



gameEngine.link_prefab = function(game, pos_x, pos_y, level){
    Phaser.Sprite.call(this, game, pos_x, pos_y,'link', 0);
    console.log("Link created in the position:(" + pos_x + " ," + pos_y + ")");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(10, 10, 11, 11);
    this.animations.add("move_down", [0, 1], 10, true);
    this.animations.add("move_left", [2, 3], 10, true);
    this.animations.add("move_up", [4, 5], 10, true);
    this.animations.add("move_right", [6, 7], 10, true);
    this.animations.add("attack_down", [8, 14], 60, false);
    this.animations.add("attack_left", [9, 15], 60, false);
    this.animations.add("attack_up", [10, 16], 60, false);
    this.animations.add("attack_right", [11, 17], 60, false);
    this.animations.add("collect", [12, 13], 2, false);
    
    this.level = level;
    this.life = 6;
    this.level;
    this.facingDirection = "down";
    this.attacking = false;
    this.attackTime = 0.4; // in seconds
    this.attackTimeCounter = 0;
    this.attackPower = 1;
    this.swordThrown = false;
    
    //Items carried
    this.keysCounter = 0;
    this.lettersCounter = 0;
    this.hasMasterSword = false;
};

gameEngine.link_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.link_prefab.prototype.constructor = gameEngine.link_prefab;

gameEngine.link_prefab.prototype.update = function(){
    
    
    //Collision with walls and other map collidables
    this.game.physics.arcade.collide(this, this.level.walls);
    this.game.physics.arcade.collide(this, this.level.mapCollisions);
    //Update
     if(this.level.pause.paused){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.stop();
     }
     else if(!this.attacking){
            if(InputManager.A.isDown && InputManager.A.downDuration(this.attackTime)){
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.attackTimeCounter = 0;
                this.animations.play("attack_" + this.facingDirection);
                this.attacking = true;
                this.level.hitbox.active = true;
                switch(this.facingDirection){
                    case "right":
                            this.level.hitbox.body.setSize(15, 5, 17, 15);
                    break;
                    case "left":
                            this.level.hitbox.body.setSize(15, 5, -2, 15);
                    break;
                    case "up":
                            this.level.hitbox.body.setSize(5, 15, 12, 0);
                    break;
                    case "down":
                            this.level.hitbox.body.setSize(5, 15, 13, 17);
                    break;
                }
            }
            else if(InputManager.keyLeft.isDown) {
                this.body.velocity.x = - ConfigOptions.linkSpeed;
                this.animations.play("move_left");
                this.body.velocity.y = 0;
                this.facingDirection = "left";
            }
            else if(InputManager.keyRight.isDown) {
                this.body.velocity.x = ConfigOptions.linkSpeed;
                this.animations.play("move_right");
                this.body.velocity.y = 0;
                this.facingDirection = "right";
            }
            else if(InputManager.keyDown.isDown) {
                this.body.velocity.y = ConfigOptions.linkSpeed;
                this.animations.play("move_down");
                this.body.velocity.x = 0;
                this.facingDirection = "down";
            }
            else if(InputManager.keyUp.isDown) {
                this.body.velocity.y = - ConfigOptions.linkSpeed;
                this.animations.play("move_up");
                this.body.velocity.x = 0;
                this.facingDirection = "up";
            }
            else {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.animations.stop();
            }  
            if(InputManager.B.isDown){
                this.animations.play("collect");
            }

        } else {
            if(this.attackTimeCounter > this.attackTime){
                this.attacking = false;
                this.animations.play("move_" + this.facingDirection);
                this.level.hitbox.active = false;
                this.swordThrown = false;
                this.attackTimeCounter = 0;
            } else if (!this.swordThrown && this.attackTimeCounter > this.attackTime / 4) {
                this.swordThrown = true;
            }
            this.attackTimeCounter += this.level.game.time.physicsElapsed;
        }   
    
};