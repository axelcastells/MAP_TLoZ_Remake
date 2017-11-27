var gameEngine = gameEngine || {};

gameEngine.loading_scene ={
    preload:function(){
        
        //Center the screen, align it and scale it
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //Physics startup
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //PhaserInput loading
        this.game.add.plugin(PhaserInput.Plugin);
        
        //dungeon
        this.load.tilemap('dungeon', 'tilemaps/dungeon.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('dungeonTileset', 'img/dungeonTileset.png');
        
        //overworld
        this.load.tilemap('overworld', 'tilemaps/overworld.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('overworld', 'img/overworld.png');
        this.load.image('statue', 'img/statue.png');
        
        //Images loading
        this.load.spritesheet('link', 'img/link_movement.png', 32, 32);
        this.load.spritesheet('enemies','img/enemiesTileset.png', 16, 16);
        this.load.spritesheet('teleport','img/teleport_tiles.png',16,16);
        this.load.image('hitbox', 'img/collider.png', 32, 32);
        this.load.image('black', 'img/black.png', 32, 32);
        this.load.image('sword', 'img/sword.png', 7, 16);
        
        //Main menu image and button image loading
        this.load.image('mainMenu', 'img/mainMenu.jpg');
        this.load.image('playButton', 'img/play_button.png');
        this.load.image('creditsButton', 'img/credits_button.png');
        this.load.image('resumeButton', 'img/resume_button.png');
        this.load.image('exitButton', 'img/exit_button.png');
        this.load.image('loginButton', 'img/login_button.png');
        this.load.image('backButton', 'img/back_button.png');
        
        //Hud image loading
        this.load.image('letter', 'img/zelda-sprites-letter.png');
        this.load.image('key', 'img/zelda-sprites-key.png');
        this.load.spritesheet('health', 'img/healthbar.png', 23, 8);
        this.load.spritesheet('buttonA', 'img/item_button_a.png', 38, 60);
        this.load.image('buttonB', 'img/item_button_b.png');
        
        //Load input
        InputManager.keyRight = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        InputManager.keyLeft = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        InputManager.keyUp = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        InputManager.keyDown = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        InputManager.space = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        InputManager.A = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.A);
        InputManager.B = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.B);
        InputManager.ESC = gameEngine.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
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