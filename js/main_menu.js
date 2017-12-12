var gameEngine = gameEngine || {};

gameEngine.main_menu ={
    preload:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setGameSize(ConfigOptions.screenW, ConfigOptions.screenH);
    },
    create:function(){
        console.log("osea hola???");
        this.game.stage.backgroundColor = "#489ad8";
        this.BGimage = this.game.add.image(0, 0, 'mainMenu');
        this.BGimage.height = this.game.height;
        this.BGimage.width = this.game.width;
        this.BGimage.smoothed = false;
        
        this.startButton = this.game.add.button(ConfigOptions.screenW / 2, ConfigOptions.screenH / 2, 'playButton', this.loadGame, this, 2, 1, 0);
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(10);
        this.startButton.onInputOver.add(this.overFeedback, this);
        this.startButton.onInputOut.add(this.leaveFeedback, this);
        
        this.creditsButton = this.game.add.button(ConfigOptions.screenW / 2 - 200, ConfigOptions.screenH / 2 + 200, 'creditsButton', this.credits, this, 2, 1, 0);
        this.creditsButton.anchor.setTo(0.5);
        this.creditsButton.scale.setTo(10);
        this.creditsButton.onInputOver.add(this.overFeedback, this);
        this.creditsButton.onInputOut.add(this.leaveFeedback, this);
        
        this.loginButton = this.game.add.button(ConfigOptions.screenW / 2 + 200, ConfigOptions.screenH / 2 + 200, 'loginButton', this.login, this, 2, 1, 0);
        this.loginButton.anchor.setTo(0.5);
        this.loginButton.scale.setTo(10);
        this.loginButton.onInputOver.add(this.overFeedback, this);
        this.loginButton.onInputOut.add(this.leaveFeedback, this);
        
        //Intro music
        if(gameEngine.startIntroOnce == false){
            this.introMusic = this.add.audio('intro', 1, true, true);
            this.introMusic.play();
            gameEngine.startIntroOnce = true;
        }
        
        //Audio creation
        this.buttonClick = this.add.audio('buttonClick');
        
        //TEXT_RENDERER.create(["This is a sample text. So, this is pure shit filling the page :D Edu, Miquel, pagueu la coca!"]);
        
        
        
    },
    update:function(){
        //console.clear();
        //console.log(TEXT_RENDERER.getUpdatedText());

        
    },
    loadGame:function(){
        this.buttonClick.play();
        this.game.state.start("overworld");
        gameEngine.startIntroOnce = false;
        this.introMusic.stop();
    },
    credits:function(){
        this.buttonClick.play();
        this.game.state.start("credits");
    },
    login:function(){
        this.buttonClick.play();
        this.game.state.start("login");
    },
    overFeedback:function(button){
        button.scale.setTo(12);
    },
    leaveFeedback:function(button){
        button.scale.setTo(10);
    }

}