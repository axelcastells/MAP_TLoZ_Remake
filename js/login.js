var gameEngine = gameEngine || {};

gameEngine.login ={
    preload:function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        
       // this.load.image('mainMenu', 'img/mainMenu.jpg');
        this.load.image('backButton', 'img/back_button.png');

        

    },
    create:function(){
        
        this.game.stage.backgroundColor = "#3b444b";
        /*this.BGimage = this.game.add.image(0, 0, 'mainMenu');
        this.BGimage.height = this.game.height;
        this.BGimage.width = this.game.width;*/
        
        this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'backButton', this.back, this, 2, 1, 0);
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(10);
        this.startButton.onInputOver.add(this.overFeedback, this);
        this.startButton.onInputOut.add(this.leaveFeedback, this);
        
        
        
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