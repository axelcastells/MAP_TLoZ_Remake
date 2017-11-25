var gameEngine = gameEngine || {};

gameEngine.credits ={
    preload:function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    

    },
    create:function(){
        
        this.game.stage.backgroundColor = "#101010";
        /*this.BGimage = this.game.add.image(0, 0, 'mainMenu');
        this.BGimage.height = this.game.height;
        this.BGimage.width = this.game.width;*/
        
        this.startButton = this.game.add.button(230 , ConfigOptions.screenH - 80, 'backButton', this.back, this, 2, 1, 0);
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(10);
        this.startButton.onInputOver.add(this.overFeedback, this);
        this.startButton.onInputOut.add(this.leaveFeedback, this);
        
        this.title = this.game.add.bitmapText(ConfigOptions.screenW / 2, 100, 'font_white', 'The Legend Of Zelda', 120);
        this.title.anchor.x = 0.5;
        this.title.anchor.y = 0.5;
        
        //Developers part
        this.game.add.bitmapText(100, 200, 'font_white', 'Developers', 95);
        this.game.add.bitmapText(160, 300, 'font_white', 'Miquel Postigo', 70);
        this.game.add.bitmapText(160, 370, 'font_white', 'Axel Castells', 70);
        this.game.add.bitmapText(160, 440, 'font_white', 'Eduard Arnau', 70);
        
        //Resources part
        this.game.add.bitmapText(100, 630, 'font_white', 'Resources', 95);
        this.game.add.bitmapText(160, 730, 'font_white', 'Image - Spriters Resource', 70);
        this.game.add.bitmapText(160, 800, 'font_white', 'Sound - 420 Blaze It', 70);
        this.game.add.bitmapText(160, 870, 'font_white', 'Font - Return of Ganon by Codeman38', 70);
        
        //Tools used part
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 100, 200, 'font_white', 'Tools Used', 95);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 300, 'font_white', 'BMfont', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 370, 'font_white', 'Brackets', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 440, 'font_white', 'Phaser', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 510, 'font_white', 'Photoshop', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 580, 'font_white', 'Chrome', 70);
        
        
    },
    update:function(){
        
        
    },
    back:function(){
        this.game.state.start("main_menu");
    },
    overFeedback:function(button){
        button.scale.setTo(12);
    },
    leaveFeedback:function(button){
        button.scale.setTo(10);
    }

}