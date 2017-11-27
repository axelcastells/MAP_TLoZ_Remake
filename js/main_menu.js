var gameEngine = gameEngine || {};

gameEngine.main_menu ={
    preload:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    create:function(){
        console.log("osea hola???");
        this.game.stage.backgroundColor = "#489ad8";
        this.BGimage = this.game.add.image(0, 0, 'mainMenu');
        this.BGimage.height = this.game.height;
        this.BGimage.width = this.game.width;
        this.BGimage.smoothed = false;
        
        this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'playButton', this.loadGame, this, 2, 1, 0);
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(10);
        this.startButton.onInputOver.add(this.overFeedback, this);
        this.startButton.onInputOut.add(this.leaveFeedback, this);
        
        this.creditsButton = this.game.add.button(this.game.world.centerX - 200, this.game.world.centerY + 200, 'creditsButton', this.credits, this, 2, 1, 0);
        this.creditsButton.anchor.setTo(0.5);
        this.creditsButton.scale.setTo(10);
        this.creditsButton.onInputOver.add(this.overFeedback, this);
        this.creditsButton.onInputOut.add(this.leaveFeedback, this);
        
        this.loginButton = this.game.add.button(this.game.world.centerX + 200, this.game.world.centerY + 200, 'loginButton', this.login, this, 2, 1, 0);
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
        
        
    },
    update:function(){
        
        
    },
    loadGame:function(){
        this.game.state.start("overworld");
        gameEngine.startIntroOnce = false;
        this.introMusic.stop();
    },
    credits:function(){
        this.game.state.start("credits");
    },
    login:function(){
        this.game.state.start("login");
    },
    overFeedback:function(button){
        button.scale.setTo(12);
    },
    leaveFeedback:function(button){
        button.scale.setTo(10);
    }

}