var gameEngine = gameEngine || {};

gameEngine.pauseMenu_prefab = function(game, level){
    Phaser.Sprite.call(this, game, ConfigOptions.screenW / 2, ConfigOptions.screenH / 2, 'black');
    this.scale.setTo(ConfigOptions.screenW, ConfigOptions.screenH);
    this.alpha = 0.0;
    this.anchor.setTo(0.5);
    this.level = level;
    this.paused = false;
    this.game = game;
    this.game.add.existing(this);
    
    this.resumeButton = this.game.add.button(0, 0, 'resumeButton', this.resume, this, 2, 1, 0);
    this.resumeButton.anchor.setTo(0.5);
    this.resumeButton.scale.setTo(2);
    this.resumeButton.onInputOver.add(this.overFeedback, this);
    this.resumeButton.onInputOut.add(this.leaveFeedback, this);
    this.resumeButton.visible = false;
    this.game.add.existing(this.resumeButton);
    
    this.exitButton = this.game.add.button(0, 0, 'exitButton', this.backToMenu, this, 2, 1, 0);
    this.exitButton.anchor.setTo(0.5);
    this.exitButton.scale.setTo(2);
    this.exitButton.onInputOver.add(this.overFeedback, this);
    this.exitButton.onInputOut.add(this.leaveFeedback, this);
    this.exitButton.visible = false;
    this.game.add.existing(this.exitButton);
};

gameEngine.pauseMenu_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.pauseMenu_prefab.prototype.constructor = gameEngine.pauseMenu_prefab;

gameEngine.pauseMenu_prefab.prototype.update = function(){
    if(InputManager.ESC.isDown && InputManager.ESC.downDuration(10)){
        if(!this.paused){
            console.log("pausing");
            this.alpha = 0.3;
            this.paused = true;
            this.resumeButton.visible = true;
            this.exitButton.visible = true;
        } else {
            console.log("resuming");
            this.alpha = 0.0;
            this.paused = false;
            this.resumeButton.visible = false;
            this.exitButton.visible = false;
        }    
    }
    if(this.paused){
        this.resumeButton.x = this.game.camera.x + 128;
        this.resumeButton.y = this.game.camera.y + 96;
        
        this.exitButton.x = this.game.camera.x + 128;
        this.exitButton.y = this.game.camera.y + 160;
    }
};
gameEngine.pauseMenu_prefab.prototype.leaveFeedback = function(button){
        button.scale.setTo(2);
};
gameEngine.pauseMenu_prefab.prototype.overFeedback = function(button){
        button.scale.setTo(2.5);
};
gameEngine.pauseMenu_prefab.prototype.backToMenu = function(button){
        console.log("back to menu");
        this.alpha = 1.0;
        this.paused = false;
        this.resumeButton.visible = false;
        this.exitButton.visible = false;
        this.level.backgroundMusic.stop();
        this.game.state.start("main_menu");
};
gameEngine.pauseMenu_prefab.prototype.resume = function(button){
            console.log("resuming");
            this.alpha = 0.0;
            this.paused = false;
            this.resumeButton.visible = false;
            this.exitButton.visible = false;
};