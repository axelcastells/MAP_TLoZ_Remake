var gameEngine = gameEngine || {};

gameEngine.door_prefab = function(game, pos_x, pos_y, imagePath, level){    
    Phaser.Sprite.call(this, game, pos_x, pos_y,imagePath, 0);
    this.open = false;
    this.x = pos_x;
    this.y = pos_y;
    this.game = game;
    this.imagePath = imagePath;
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.moves = false;
    this.body.immovable = true;
};

gameEngine.door_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.door_prefab.prototype.constructor = gameEngine.door_prefab;

gameEngine.door_prefab.prototype.update = function(){ 
    //Collision with walls and other map collidables
    this.game.physics.arcade.collide(this, this.level.link,
    function(door, link){
        if(InputManager.A.isDown && (link.level.link.hasMasterSword || link.level.link.lettersCounter == 4)){
            door.open = true;
        } 
    });

    if(this.open){
        this.kill();
    }

};