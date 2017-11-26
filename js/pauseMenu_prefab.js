var gameEngine = gameEngine || {};

gameEngine.pauseMenu_prefab = function(game, level){
    Phaser.Sprite.call(this, game, ConfigOptions.screenW / 2, ConfigOptions.screenH / 2, 'black');
    this.scale.setTo(ConfigOptions.screenW, ConfigOptions.screenH);
    this.alpha = 0.0;
    this.anchor.setTo(0.5);
    this.level = level;
    this.paused = false;
    this.game = game;
    
    this.startButton = this.game.add.button(ConfigOptions.screenW / 2, ConfigOptions.screenH / 2, 'playButton', function(){console.log('ole')}, this, 2, 1, 0);
    this.startButton.anchor.setTo(0.5);
    this.startButton.scale.setTo(4);
    //this.startButton.onInputOver.add(this.overFeedback, this);
    //this.startButton.onInputOut.add(this.leaveFeedback, this);
    this.startButton.visible = false;
    //this.game.add.existing(this.startButton);
    //console.log(this.startButton);
};

gameEngine.pauseMenu_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.pauseMenu_prefab.prototype.constructor = gameEngine.pauseMenu_prefab;

gameEngine.pauseMenu_prefab.prototype.update = function(){
    if(InputManager.ESC.isDown && InputManager.ESC.downDuration(10)){
        if(!this.paused){
            console.log("pausing");
            this.alpha = 0.3;
            this.paused = true;
            this.startButton.visible = true;
        } else {
            console.log("resuming");
            this.alpha = 0.0;
            this.paused = false;
            this.startButton.visible = false;
        }    
    }
};