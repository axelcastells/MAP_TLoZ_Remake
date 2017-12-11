var gameEngine = gameEngine || {};

gameEngine.final_credits ={
    preload:function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.world.setBounds(0, 0, 2000, 2000);
        //this.buttonClick = this.add.audio('buttonClick');
        
    },
    create:function(){
        this.game.stage.backgroundColor = "#000000";
        this.generalPositionY = 0;
        
        /*this.startButton = this.game.add.button(230 , ConfigOptions.screenH - 80, 'exitButton', this.back, this, 2, 1, 0);
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(10);
        this.startButton.onInputOver.add(this.overFeedback, this);
        this.startButton.onInputOut.add(this.leaveFeedback, this);*/
                //Audio creation
        this.backgroundMusic = this.add.audio('endMusic', 1, true, true);
        this.backgroundMusic.play();
        
        this.title = this.game.add.bitmapText(ConfigOptions.screenW / 2, 150 + this.generalPositionY, 'font_white', 'The Legend Of Zelda', 120);
        this.title.anchor.x = 0.5;
        this.title.anchor.y = 0.5;
        
        this.game.add.bitmapText(100, 300 + this.generalPositionY, 'font_white', 'Hyrule and the world are safe again', 95);
        this.game.add.bitmapText(50, 400 + this.generalPositionY, 'font_white', 'And as the beast dies, a legend is born', 95);
        
                //Developers part
        this.game.add.bitmapText(420, 0 + this.generalPositionY + 550, 'font_white', 'Developers', 115);
        this.game.add.bitmapText(422, 150 + this.generalPositionY + 550, 'font_white', 'Miquel Postigo', 90);
        this.game.add.bitmapText(427, 250 + this.generalPositionY + 550, 'font_white', 'Axel Castells', 90);
        this.game.add.bitmapText(426, 350 + this.generalPositionY + 550, 'font_white', 'Eduard Arnau', 90);
        
        //Resources part
        this.game.add.bitmapText(100, 1030 + this.generalPositionY, 'font_white', 'Resources', 95);
        this.game.add.bitmapText(160, 1130 + this.generalPositionY, 'font_white', 'Image - Spriters Resource', 70);
        this.game.add.bitmapText(160, 1200 + this.generalPositionY, 'font_white', 'Sound - LoZ Sound Effects by HelpTheWretched', 70);
        this.game.add.bitmapText(160, 1270 + this.generalPositionY, 'font_white', 'Font - Return of Ganon by Codeman38', 70);
        
                //Tools used part
        /*
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 100, 200, 'font_white', 'Tools Used', 95);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 300, 'font_white', 'BMfont', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 370, 'font_white', 'Brackets', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 440, 'font_white', 'Phaser', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 510, 'font_white', 'Photoshop', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 580, 'font_white', 'Chrome', 70);*/
    },
    update:function(){

        this.game.camera.y++;
        console.log(this.game.camera.y);

    }
}