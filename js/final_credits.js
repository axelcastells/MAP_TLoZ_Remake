var gameEngine = gameEngine || {};

gameEngine.final_credits ={
    preload:function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(ConfigOptions.screenW, ConfigOptions.screenH);
        this.game.world.setBounds(0, 0, 2000, 2500);
        
        //this.buttonClick = this.add.audio('buttonClick');
        
    },
    create:function(){
        this.game.stage.backgroundColor = "#000000";
        this.generalPositionY = 0;
        
        //button
        this.back = this.game.add.button(600 , 2300, 'exitButton', this.back, this, 2, 1, 0);
        this.back.anchor.setTo(0.5);
        this.back.scale.setTo(10);
        this.back.onInputOver.add(this.overFeedback, this);
        this.back.onInputOut.add(this.leaveFeedback, this);
        
        //Audio creation
        this.backgroundMusic = this.add.audio('endMusic', 1, true, true);
        this.backgroundMusic.play();
        this.buttonClick = this.add.audio('buttonClick');
        
        
        this.title = this.game.add.bitmapText(ConfigOptions.screenW / 2, 150 + this.generalPositionY, 'font_white', 'The Legend Of Zelda', 120);
        this.title.anchor.x = 0.5;
        this.title.anchor.y = 0.5;
        
        this.game.add.bitmapText(100, 300, 'font_white', 'Hyrule and the world are safe again', 95);
        this.game.add.bitmapText(50, 400, 'font_white', 'And as the beast dies, a legend is born', 95);
        
                //Developers part
        this.game.add.bitmapText(420, 0 + 550, 'font_white', 'Developers', 115);
        this.game.add.bitmapText(422, 150 + 550, 'font_white', 'Miquel Postigo', 90);
        this.game.add.bitmapText(427, 250 + 550, 'font_white', 'Axel Castells', 90);
        this.game.add.bitmapText(426, 350 + 550, 'font_white', 'Eduard Arnau', 90);
        
        //Resources part
        this.game.add.bitmapText(440, 0 + 1150, 'font_white', 'Resources', 105);
        this.game.add.bitmapText(160, 150 + 1150, 'font_white', 'Image - Spriters Resource', 70);
        this.game.add.bitmapText(160, 250 + 1150, 'font_white', 'Sound - LoZ Sound Effects by HelpTheWretched', 70);
        this.game.add.bitmapText(160, 350 + 1150, 'font_white', 'Font - Return of Ganon by Codeman38', 70);
        
        this.game.add.bitmapText(440, 0 + 1750, 'font_white', 'Tools Used', 95);
        this.game.add.bitmapText(260, 150 + 1750, 'font_white', 'BMfont', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 150 + 1750, 'font_white', 'Brackets', 70);
        this.game.add.bitmapText(260, 250 + 1750, 'font_white', 'Phaser', 70);
        this.game.add.bitmapText(ConfigOptions.screenW / 2 + 160, 250 + 1750, 'font_white', 'Photoshop', 70);
        this.game.add.bitmapText(520, 350 + 1750, 'font_white', 'Chrome', 70);
    },
    update:function(){

        this.game.camera.y++;
        console.log(this.game.camera.y);

    },
    back:function(){
        this.buttonClick.play();
        this.backgroundMusic.stop();
        this.game.state.start("loading_scene");
    },
    overFeedback:function(button){
        button.scale.setTo(12);
    },
    leaveFeedback:function(button){
        button.scale.setTo(10);
    }
}