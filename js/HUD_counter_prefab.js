var gameEngine = gameEngine || {};

gameEngine.HUD_counter_prefab = function(game, pos_x, pos_y, imagePath, counter, level){
    Phaser.Sprite.call(this, game, pos_x, pos_y,imagePath, 0);
    this.anchor.setTo(0.5);
    
    this.x = pos_x;
    this.y = pos_y;
    this.counter = counter;
    this.game = game;
    this.imagePath = imagePath;
    
    this.counterText = this.game.add.text(this.x + 7, this.y-5,'x' + this.counter);
    //this.counterText.font = 'font_white';
    this.counterText.fill = 'white';
    this.counterText.fontSize = 10;
    this.counterText.fixedToCamera = true;
        
    this.level = level;
};

gameEngine.HUD_counter_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.HUD_counter_prefab.prototype.constructor = gameEngine.HUD_counter_prefab;

gameEngine.HUD_counter_prefab.prototype.update = function(){
    
    if(this.imagePath == 'letter'){
       this.counter = this.level.link.lettersCounter;
    }
    else if(this.imagePath == 'key'){
        this.counter = this.level.link.keysCounter;
    }
    this.counterText.setText('x' + this.counter);    

};