var gameEngine = gameEngine || {};

gameEngine.movable_prefab = function(game, type, directions, pos_x, pos_y, level){
    
    //Get the sprite of the movable
    this.type = type;
    if (this.type == SYSTEM_CONSTANTS.MOVABLES.STATUE){
        Phaser.Sprite.call(this,game,pos_x,pos_y,'movable_statue',0);
        console.log("Statue created");
    } else {
        Phaser.Sprite.call(this,game,pos_x,pos_y,'movable_stone',0);
    }
    this.game.physics.arcade.enable(this);
    
    this.directions = directions
    this.actualMovement = 0;
    this.actualDirection = null;
    this.movement = 0;
    this.locked = false;
    this.level = level;
    this.game = game;
    this.moving = false;

    if(this.directions == null){
        this.locked = true;
    }
    else{
        this.actualDirection = this.directions[0];
        this.numberOfMovements = this.directions.length;
    }
    
    this.timer = this.game.time.create(true);
    this.timer.loop(10, this.timerFunction, this);
    
    this.body.moves = false;
    
    //this.body.onCollide = new Phaser.Signal();
    //this.body.onCollide.add(this.move, this);
};

gameEngine.movable_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.movable_prefab.prototype.constructor = gameEngine.movable_prefab;

gameEngine.movable_prefab.prototype.update = function(){

    this.game.physics.arcade.collide(this, this.level.link, this.move);
    this.game.physics.arcade.collide(this, this.level.enemies);

};
gameEngine.movable_prefab.prototype.move = function(movable, link){
    var touchingFlag = false;
    switch(movable.actualDirection){
        case SYSTEM_CONSTANTS.DIRECTIONS.UP:
            touchingFlag = movable.body.touching.down;
            break;
        case SYSTEM_CONSTANTS.DIRECTIONS.DOWN:
            touchingFlag = movable.body.touching.up;
            break;
        case SYSTEM_CONSTANTS.DIRECTIONS.RIGHT:
            touchingFlag = movable.body.touching.left;
            break;
        case SYSTEM_CONSTANTS.DIRECTIONS.LEFT:
            touchingFlag = movable.body.touching.right;
            break;
        default:
            break;
    }
    if(!movable.locked && !movable.moving && movable.level.link.direction == movable.actualDirection && touchingFlag){
        movable.timer.start();
        link.canMove = false;
        movable.moving = true;
    }
};
gameEngine.movable_prefab.prototype.timerFunction = function(){
        this.x += this.actualDirection.x;
        this.y += this.actualDirection.y;
        this.movement++;
        if(this.movement >= 16){
            this.timer.destroy();
            if(this.actualMovement + 1  >= this.numberOfMovements){
                this.locked = true;
            } else {
                this.actualMovement++;
                this.actualDirection = this.directions[this.actualMovement];
                this.timer = this.game.time.create(true);
                this.timer.loop(10, this.timerFunction, this);
            }
            this.level.link.canMove = true;
            this.moving = false;
            this.movement = 0;
        }   
}