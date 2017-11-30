var gameEngine = gameEngine || {};

gameEngine.movable_prefab = function(game, type, direction, locked, pos_x, pos_y, level){
    
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
        case SYSTEM_CONSTANTS.DIRECTIONS.NULL:
            this.maxPosition = 0;
            break;
        default:
            break;
    }
    this.locked = locked;
    this.game.physics.arcade.enable(this);
    if(this.locked){
       this.body.moves = false;
       this.body.ummovable = true;
    }
    this.initialX = pos_x;
    this.initialY = pos_y;
};

gameEngine.movable_prefab.prototype = Object.create(Phaser.Sprite.prototype);
gameEngine.movable_prefab.prototype.constructor = gameEngine.movable_prefab;

gameEngine.movable_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.link);
    this.game.debug.body(this);
    if(!this.locked){
       this.game.physics.arcade.collide(this, this.level.movables);
       
       var distance = 0;
        switch (this.direction){
            case SYSTEM_CONSTANTS.DIRECTIONS.UP:
                if(this.body.touching.down){
                    this.x = this.initialX;
                    this.body.moves = true;
                    if(this.y > this.initialY){
                        this.y = this.initialY;
                    }
                    else if(this.y <= this.initialY - 16){
                        this.y = this.initialY - 16;                    
                    }
                } else {
                    this.body.moves = false;
                }
                distance = this.game.math.difference(this.y, this.initialY);
            break;
            case SYSTEM_CONSTANTS.DIRECTIONS.DOWN:
                if(this.body.touching.up){
                    this.x = this.initialX;
                    this.body.moves = true;
                    if(this.y < this.initialY){
                        this.y = this.initialY;
                    }
                    else if(this.y >= this.initialY + 16){
                        this.y = this.initialY + 16;                    
                    }
                } else {
                    this.body.moves = false;
                }
                distance = this.game.math.difference(this.y, this.initialY);
            break;
            case SYSTEM_CONSTANTS.DIRECTIONS.RIGHT:
                if(this.body.touching.left){
                    this.y = this.initialY;
                    this.body.moves = true;
                    if(this.x < this.initialX){
                        this.x = this.initialX;
                    }
                    else if(this.x >= this.initialX + 16){
                        this.x = this.initialX + 16;                    
                    }
                } else {
                    this.body.moves = false;
                }
                distance = this.game.math.difference(this.x, this.initialX);
            break;
            case SYSTEM_CONSTANTS.DIRECTIONS.LEFT:
                if(this.body.touching.right){
                    this.y = this.initialY;
                    this.body.moves = true;
                    if(this.x > this.initialX){
                        this.x = this.initialX;
                    }
                    else if(this.x <= this.initialX - 16){
                        this.x = this.initialX - 16;                    
                    }
                } else {
                    this.body.moves = false;
                }
                distance = this.game.math.difference(this.x, this.initialX);
            break;
            case SYSTEM_CONSTANTS.DIRECTIONS.NULL:
                if(this.game.math.difference(this.x, this.initialX) + this.game.math.difference(this.y, this.initialY) > 48){
                    distance = 16;
                }
                if(this.game.math.difference(this.x, this.initialX) > 32){
                    this.x = this.initialX + 32;
                }/*
                } else {
                    this.body.moves = false;
                }*/
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