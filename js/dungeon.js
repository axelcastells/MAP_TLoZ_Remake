var gameEngine = gameEngine || {};

gameEngine.dungeon ={
    preload:function(){
        //Set up physics and canvas scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(400, 400);
        this.game.world.setBounds(0, 0, 2000, 2000);
        
        //Activate physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Image Loading
        this.load.tilemap('dungeon', 'tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('dungeonTileset', 'img/dungeonTileset.png');
        this.load.spritesheet('link', 'img/link_movement.png', 32, 32);
        this.load.spritesheet('enemies','img/enemiesTileset.png', 16, 16);
        this.load.spritesheet('teleport','img/teleport_tiles.png',16,16);
        this.load.image('hitbox', 'img/collider.png', 32, 32);
        
        //Load input
        InputManager.keyRight = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        InputManager.keyLeft = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        InputManager.keyUp = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        InputManager.keyDown = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        InputManager.space = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        InputManager.A = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.A);
        InputManager.B = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.B);
    },
    create:function(){


        //Map Creation
        this.game.stage.backgroundColor = '#000000';
        this.map = this.game.add.tilemap('dungeon');
        this.map.addTilesetImage('dungeonTileset');
        
        this.map.createLayer('background');
        
        this.walls = this.map.createLayer('walls');
        this.map.setCollisionBetween(1,222,true,'walls');
        
        this.map.createLayer('decorative');
        
        this.mapCollisions = this.map.createLayer('collisions');
        this.map.setCollisionBetween(1,178,true,'collisions');
        
        this.map.createLayer('interactables');
        
        //Teleports startup
        this.tp = new gameEngine.teleport_prefab(this.game, 224, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp);
        this.tp2 = new gameEngine.teleport_prefab(this.game, 336, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp2);
        
        //Link creation
        this.link = this.game.add.sprite(500, 740, 'link');
        //Link variables
        this.link.facingDirection = "down";
        this.link.attacking = false;
        this.link.attackTime = 0.4; // in seconds
        this.link.attackTimeCounter = 0;
        //Link physics setup
        this.link.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.link);
        this.link.body.setSize(10, 10, 11, 11);
        
        //Link basic movement animations
        this.link.animations.add("move_down", [0, 1], 10, true);
        this.link.animations.add("move_left", [2, 3], 10, true);
        this.link.animations.add("move_up", [4, 5], 10, true);
        this.link.animations.add("move_right", [6, 7], 10, true);
        this.link.animations.add("attack_down", [8, 14], 60, false);
        this.link.animations.add("attack_left", [9, 15], 60, false);
        this.link.animations.add("attack_up", [10, 16], 60, false);
        this.link.animations.add("attack_right", [11, 17], 60, false);
        this.link.animations.add("collect", [12, 13], 2, false);
        
        //Teleports startup
        this.tp = new gameEngine.teleport_prefab(this.game, 224, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp);
        this.tp2 = new gameEngine.teleport_prefab(this.game, 336, 672, 500, 740, 0, this);
        this.game.add.existing(this.tp2);
        this.link.animations.add("collect", [12, 13], 2, false);        

        
        //Enemy Provisional startup
        this.enemy = new gameEngine.enemy_prefab(this.game, SYSTEM_CONSTANTS.ENEMY_TYPES.OCTOROK, this.link.position.x + 80, this.link.position.y, this);
        this.game.add.existing(this.enemy);
        
        this.enemy2 = new gameEngine.enemy_prefab(this.game, SYSTEM_CONSTANTS.ENEMY_TYPES.ZORA, this.link.position.x + 80, this.link.position.y, this);
        this.game.add.existing(this.enemy2);
        
        this.hitbox = new gameEngine.hitbox_prefab(this.game, this.link, false, 500, 600, 70, 50, 16, 0);
        this.game.add.existing(this.hitbox);
        
        this.game.camera.follow(this.link, Phaser.Camera.FOLLOW_PLATAFORMER);

    },
    update:function(){

        
        this.game.debug.body(this.link);
        this.game.debug.body(this.tp);
        this.game.debug.body(this.tp2);
        if(this.hitbox.active){
            this.game.debug.body(this.hitbox);
        }
        //collision with the map
        this.game.physics.arcade.collide(this.link, this.walls);
        this.game.physics.arcade.collide(this.link, this.mapCollisions);
        if(!this.link.attacking){
            if(InputManager.A.isDown && InputManager.A.downDuration(this.link.attackTime)){
                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;
                this.link.attackTimeCounter = 0;
                this.link.animations.play("attack_" + this.link.facingDirection);
                this.link.attacking = true;
                this.hitbox.active = true;
                this.hitbox.x = this.link.x;
                this.hitbox.y = this.link.y;
                switch(this.link.facingDirection){
                    case "right":
                            this.hitbox.body.setSize(15, 5, 17, 15);
                    break;
                    case "left":
                            this.hitbox.body.setSize(15, 5, -2, 15);
                    break;
                    case "up":
                            this.hitbox.body.setSize(5, 15, 12, 0);
                    break;
                    case "down":
                            this.hitbox.body.setSize(5, 15, 13, 17);
                    break;
                }
            }
            else if(InputManager.keyLeft.isDown) {
                this.link.body.velocity.x = - ConfigOptions.linkSpeed;
                this.link.animations.play("move_left");
                this.link.body.velocity.y = 0;
                this.link.facingDirection = "left";
            }
            else if(InputManager.keyRight.isDown) {
                this.link.body.velocity.x = ConfigOptions.linkSpeed;
                this.link.animations.play("move_right");
                this.link.body.velocity.y = 0;
                this.link.facingDirection = "right";
            }
            else if(InputManager.keyDown.isDown) {
                this.link.body.velocity.y = ConfigOptions.linkSpeed;
                this.link.animations.play("move_down");
                this.link.body.velocity.x = 0;
                this.link.facingDirection = "down";
            }
            else if(InputManager.keyUp.isDown) {
                this.link.body.velocity.y = - ConfigOptions.linkSpeed;
                this.link.animations.play("move_up");
                this.link.body.velocity.x = 0;
                this.link.facingDirection = "up";
            }
            else {
                this.link.body.velocity.x = 0;
                this.link.body.velocity.y = 0;
                this.link.animations.stop();
            }  
            if(InputManager.B.isDown){
                this.link.animations.play("collect");
            }
            
        } else {
            if(this.link.attackTimeCounter > this.link.attackTime){
                this.link.attacking = false;
                this.link.animations.play("move_" + this.link.facingDirection);
                this.hitbox.active = false;
                this.link.attackTimeCounter = 0;
               }
            this.link.attackTimeCounter += this.game.time.physicsElapsed;
            console.log(this.hitbox.x + " - " + this.hitbox.y);
            
        }
    }    

}