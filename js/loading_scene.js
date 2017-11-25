var gameEngine = gameEngine || {};

gameEngine.loading_scene ={
    preload:function(){
        
        //Center the screen, align it and scale it
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //Physics startup
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Tilemap loading
        
        //dungeon
        this.load.tilemap('dungeon', 'tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('dungeonTileset', 'img/dungeonTileset.png');
        
        //overworld
        this.load.tilemap('overworld', 'tilemaps/overworld.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('overworld', 'img/overworld.png');
        
        //Images loading
        this.load.spritesheet('link', 'img/link_movement.png', 32, 32);
        this.load.spritesheet('enemies','img/enemiesTileset.png', 16, 16);
        this.load.spritesheet('teleport','img/teleport_tiles.png',16,16);
        this.load.image('hitbox', 'img/collider.png', 32, 32);
        
        //Main menu image loading
        this.load.image('mainMenu', 'img/mainMenu.jpg');
        this.load.image('playButton', 'img/play_button.png');
        this.load.image('creditsButton', 'img/credits_button.png');
        this.load.image('loginButton', 'img/login_button.png');
        this.load.image('backButton', 'img/back_button.png');
        
        //Load input
        InputManager.keyRight = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        InputManager.keyLeft = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        InputManager.keyUp = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        InputManager.keyDown = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        InputManager.space = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        InputManager.A = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.A);
        InputManager.B = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.B);
        
        //Bitmap text loading
        this.load.bitmapFont('font_white', 'font/zeldaBitmapFont_0.png', 'font/zeldaBitmapFont.fnt');   
        this.load.bitmapFont('font_black', 'font/zeldaBitmapFontBlack_0.png', 'font/zeldaBitmapFontBlack.fnt');   
        //Audio loading
        
        
    },
    create:function(){
        this.BGimage = this.game.add.image(0, 0, 'mainMenu');
        this.BGimage.height = this.game.height;
        this.BGimage.width = this.game.width;
        this.BGimage.smoothed = false;
    },
    update:function(){
        this.game.state.start('main_menu');
    }
}