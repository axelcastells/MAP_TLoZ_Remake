var gameEngine = gameEngine || {};

gameEngine.dungeon ={
    preload:function(){
        //Set up physics and canvas scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //Activate physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Image Loading
        this.load.tilemap('dungeon', 'tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('dungeonTileset', 'img/dungeonTileset.png');
        this.load.spritesheet('link', 'img/zelda-sprites-link.png', 16, 16);
        
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
        
        //Link creation
        this.link = this.game.add.sprite(500, 740, 'link');
        this.link.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.link);
        this.link.body.setSize(24, 24, 0, 0);
        
        //Link basic movement animations
        this.link.animations.add("move_down", [0, 1], 10, true);
        this.link.animations.add("move_left", [2, 3], 10, true);
        this.link.animations.add("move_up", [4, 5], 10, true);
        this.link.animations.add("move_right", [6, 7], 10, true);
        this.link.animations.add("collect", [12, 13], 2, false);
        

    },
    update:function(){
        //collision with the map
        this.game.physics.arcade.collide(this.link, this.walls);
        this.game.physics.arcade.collide(this.link, this.mapCollisions);
        
        if(InputManager.keyLeft.isDown) {
            this.link.body.velocity.x = - ConfigOptions.linkSpeed;
            this.link.animations.play("move_left");
            this.link.body.velocity.y = 0;
        }
        else if(InputManager.keyRight.isDown) {
            this.link.body.velocity.x = ConfigOptions.linkSpeed;
            this.link.animations.play("move_right");
            this.link.body.velocity.y = 0;
        }
        else if(InputManager.keyDown.isDown) {
            this.link.body.velocity.y = ConfigOptions.linkSpeed;
            this.link.animations.play("move_down");
            this.link.body.velocity.x = 0;
        }
        else if(InputManager.keyUp.isDown) {
            this.link.body.velocity.y = - ConfigOptions.linkSpeed;
            this.link.animations.play("move_up");
            this.link.body.velocity.x = 0;
        }
        else {
            this.link.body.velocity.x = 0;
            this.link.body.velocity.y = 0;
            this.link.animations.stop();
        }  
        if(InputManager.A.isDown){
            this.link.animations.play("collect");
        }
        
    }    

}