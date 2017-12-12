var gameEngine = gameEngine || {};

gameEngine.interactables_prefab = function(game, pos_x, pos_y, scaleX, scaleY, level){    
    Phaser.Sprite.call(this, game, pos_x, pos_y,'', 1);
    this.scale.setTo(scaleX, scaleY);
    this.activated = false;
    this.x = pos_x;
    this.y = pos_y;
    this.game = game;
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.moves = false;
    this.body.immovable = true;
};

gameEngine.interactables_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.interactables_prefab.prototype.constructor = gameEngine.interactables_prefab;

gameEngine.interactables_prefab.prototype.update = function(){ 
    //Overlap with the interactable zones
    this.activated = false;
    this.game.physics.arcade.overlap(this, this.level.link,
    function(interactable, link){
        if(InputManager.A.isDown){
            interactable.activated = true;
        } 
    });
};