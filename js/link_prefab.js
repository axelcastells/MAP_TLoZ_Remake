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
    this.animations.add("master_attack_down", [8, 18], 60, false);
    this.animations.add("master_attack_left", [9, 19], 60, false);
    this.animations.add("master_attack_up", [10, 20], 60, false);
    this.animations.add("master_attack_right", [11, 21], 60, false);
    this.animations.add("collect", [12, 13], 2, false);
        
    this.isInteracting = false;
    this.level = level;
    this.game = game;
    this.life = 6;
    this.level;
    this.facingDirection = "down";
    this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
    this.attacking = false;
    this.attackTime = 0.4; // in seconds
    this.attackTimeCounter = 0;
    this.attackPower = 1;
    this.swordThrown = false;
    this.hasSword = false;
    this.hasMasterSword = false;
    this.counter = 0;
    this.rewardTime = 0;
    this.canMove = true;
    
    //Load audios
    this.linkAttackSound = this.level.add.audio('linkAttack');
    this.linkShieldSound = this.level.add.audio('linkShield');
    this.linkDamage = this.level.add.audio('linkDamage');
    
    //Items carried
    this.keysCounter = 0;
    this.lettersCounter = 0;
    this.hasMasterSword = false;

    //Boomerang
    this.boomerang;
    this.isBoomerangThrown = false;

    this.vulnerabilityCounter = 0;
    this.updateCounter = function(){
        if(!level.pause.paused)
            this.vulnerabilityCounter-=0.1; 
    }
    
    this.timer = this.game.time.create(false);
    this.timer.loop(100, this.updateCounter, this);
    this.timer.start();
};

gameEngine.link_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.link_prefab.prototype.constructor = gameEngine.link_prefab;

gameEngine.link_prefab.prototype.update = function(){
    
    
    //Collision with walls and other map collidables
    //this.game.physics.arcade.collide(this, this.level.walls);
    //this.game.physics.arcade.collide(this, this.level.mapCollisions);
    //this.game.physics.arcade.collide(this, this.level.movables);
    this.game.physics.arcade.collide(this, this.level.water);
    
    //Update
     if(this.level.pause.paused || !this.canMove){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.stop();
     }
     else if(!this.attacking){
            if(InputManager.A.isDown && InputManager.A.downDuration(this.attackTime) && this.hasSword == true){
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.attackTimeCounter = 0;
                if(this.hasMasterSword)
                    this.animations.play("master_attack_" + this.facingDirection);
                else
                    this.animations.play("attack_" + this.facingDirection);
                this.linkAttackSound.play();
                this.attacking = true;
                this.level.hitbox.active = true;
                switch(this.facingDirection){
                    case "right":
                            this.level.hitbox.body.setSize(15, 5);
                    break;
                    case "left":
                            this.level.hitbox.body.setSize(15, 5);
                    break;
                    case "up":
                            this.level.hitbox.body.setSize(5, 15);
                    break;
                    case "down":
                            this.level.hitbox.body.setSize(5, 15);
                    break;
                }
            }
            else if(InputManager.keyLeft.isDown) {
                this.body.velocity.x = - ConfigOptions.linkSpeed;
                this.animations.play("move_left");
                this.body.velocity.y = 0;
                this.facingDirection = "left";
                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.LEFT;
            }
            else if(InputManager.keyRight.isDown) {
                this.body.velocity.x = ConfigOptions.linkSpeed;
                this.animations.play("move_right");
                this.body.velocity.y = 0;
                this.facingDirection = "right";
                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.RIGHT;
            }
            else if(InputManager.keyDown.isDown) {
                this.body.velocity.y = ConfigOptions.linkSpeed;
                this.animations.play("move_down");
                this.body.velocity.x = 0;
                this.facingDirection = "down";
                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
            }
            else if(InputManager.keyUp.isDown) {
                this.body.velocity.y = - ConfigOptions.linkSpeed;
                this.animations.play("move_up");
                this.body.velocity.x = 0;
                this.facingDirection = "up";
                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.UP;
            }
            else {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.animations.stop();
            }  
            if(InputManager.B.isDown && !this.isBoomerangThrown){
                this.isBoomerangThrown = true;
                console.log(this.direction);
                this.boomerang = new gameEngine.projectile_prefab(this.game, SYSTEM_CONSTANTS.PROJECTILE_TYPES.BOOMERANG, this.body.x + (this.direction.x * 16), this.body.y + (this.direction.y * 16), this.direction, this.level);
                this.game.add.existing(this.boomerang);

                //this.animations.play("collect");
            }

        } else {
            if(this.attackTimeCounter > this.attackTime){
                this.attacking = false;
                this.animations.play("move_" + this.facingDirection);
                this.level.hitbox.active = false;
                this.swordThrown = false;
                this.attackTimeCounter = 0;
            } else if (!this.swordThrown && this.attackTimeCounter > this.attackTime / 4 && this.life == 6) {
                this.swordThrown = true;
                this.direction = SYSTEM_CONSTANTS.DIRECTIONS.UP;
                switch (this.facingDirection){
                    case "down":
                        this.direction = SYSTEM_CONSTANTS.DIRECTIONS.DOWN;
                        break;
                    case "left":
                        this.direction = SYSTEM_CONSTANTS.DIRECTIONS.LEFT;
                        break;
                    case "right":
                        this.direction = SYSTEM_CONSTANTS.DIRECTIONS.RIGHT;
                        break;
                    default:
                        break;
                }
                var type = SYSTEM_CONSTANTS.PROJECTILE_TYPES.SWORD;
                if(this.hasMasterSword)
                    type = SYSTEM_CONSTANTS.PROJECTILE_TYPES.MASTER_SWORD;
                this.sword = new gameEngine.projectile_prefab(this.game, type, this.body.position.x + 4, this.body.position.y + 7, this.direction, this.level);
                this.game.add.existing(this.sword);
            }
            this.attackTimeCounter += this.level.game.time.physicsElapsed;
        }   
};

gameEngine.link_prefab.prototype.recieveDamage = function(damage){
    this.game.camera.flash(0xff0000, 300);
    this.life -= damage;
    this.linkDamage.play();
    if(this.life <= 0){
        this.life = 0;
        this.level.backgroundMusic.stop();
        this.game.state.start(this.game.state.current);
    }
    
}
gameEngine.link_prefab.prototype.heal = function(heal){
    this.game.camera.flash(0x00aa00, 100);
    this.life += heal;
    if(this.life > 6){
        this.life = 6;
    }
}
