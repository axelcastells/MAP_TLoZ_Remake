var gameEngine = gameEngine || {};

gameEngine.movable_prefab = function(game, type, direction, pos_x, pos_y, level){
    
    this.game = game;
    this.direction = direction;
    this.type = type;
    this.level = level;
    
    

        
    switch(this.type){
    case SYSTEM_CONSTANTS.MOVABLES.ROCK:
        Phaser.Sprite.call(this,game,pos_x,pos_y,'movable_stone',0);
        break;
    case SYSTEM_CONSTANTS.MOVABLES.STATUE:
        Phaser.Sprite.call(this,game,pos_x,pos_y,'movable_statue',0);
        break;
    }
    switch(this.direction){
        case SYSTEM_CONSTANTS.DIRECTIONS.UP:
            this.maxPosition = this.y - 16;
            break;
        case SYSTEM_CONSTANTS.DIRECTIONS.DOWN:
            this.maxPosition = this.y + 16;
            break;
        case SYSTEM_CONSTANTS.DIRECTIONS.RIGHT:
            this.maxPosition = this.x + 16;
            break;
        case SYSTEM_CONSTANTS.DIRECTIONS.LEFT:
            this.maxPosition = this.x - 16;
            break;
        default:
            break;
    }
    
    this.anchor.setTo(.5);
    this.locked = false;
    this.game.physics.arcade.enable(this);
    this.initialX = pos_x;
    this.initialY = pos_y;
};

gameEngine.movable_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.movable_prefab.prototype.constructor = gameEngine.movable_prefab;

gameEngine.movable_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.link);
    if(!this.locked){

       var distance = 0;
        switch (this.direction){
            case SYSTEM_CONSTANTS.DIRECTIONS.UP:
                //this.x = this.initialX;
                if(this.y > this.initialY){
                    this.y = this.initialY;
                }
                else if(this.y <= this.initialY - 16){
                    this.y = this.initialY - 16;                    
                }
                distance = this.game.math.difference(this.y, this.initialY);
            break;
            case SYSTEM_CONSTANTS.DIRECTIONS.DOWN:
                this.x = this.initialX;
                if(this.y < this.initialY){
                    this.y = this.initialY;
                }
                else if(this.y >= this.initialY + 16){
                    this.y = this.initialY + 16;                    
                }
                distance = this.game.math.difference(this.y, this.initialY);
            break;
            case SYSTEM_CONSTANTS.DIRECTIONS.RIGHT:
                this.y = this.initialy;
                if(this.x < this.initialX){
                    this.x = this.initialX;
                }
                else if(this.x >= this.initialX + 16){
                    this.x = this.initialX + 16;                    
                }
                distance = this.game.math.difference(this.x, this.initialX);
            break;
            case SYSTEM_CONSTANTS.DIRECTIONS.LEFT:
                this.y = this.initialy;
                if(this.x > this.initialX){
                    this.x = this.initialX;
                }
                else if(this.x <= this.initialX - 16){
                    this.x = this.initialX - 16;                    
                }
                distance = this.game.math.difference(this.x, this.initialX);
            break;
            default:
            break;
            } 
        if(distance >= 16){
            this.locked = true;
            this.body.moves = false;
            this.body.ummovable = true;
        }
    }
};
gameEngine.movable_prefab.prototype.reset = function(){
    this.locked = false;
    this.body.moves = true;
    this.body.ummovable = false;
};