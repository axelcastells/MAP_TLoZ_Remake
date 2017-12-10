var gameEngine = gameEngine || {};

var ConfigOptions = {
    screenW:1200,
    screenH:1200,
    linkSpeed:120
};

var InputManager = {
    keyRight: null,
    keyLeft: null,
    keyDown: null,
    keyUp: null,
    space: null,
    A: null,
    B: null,
    ESC: null
};

var SYSTEM_CONSTANTS = {
    ENEMY_TYPES: {
        OCTOROK: 0,
        ZORA: 1,
        TEKTITE: 2,
        KEESE: 3,
        ROPE: 4,
        GLEEOK: 5
    },
    PROJECTILE_TYPES: {
        ROCK: 0,
        FIREBALL: 1,
        SWORD: 2,
        MASTER_SWORD: 3,
        BOOMERANG: 4
    },
    DIRECTIONS: {
        UP: new Phaser.Point(0,-1),
        DOWN: new Phaser.Point(0,1),
        LEFT: new Phaser.Point(-1,0),
        RIGHT: new Phaser.Point(1,0),
        NULL: new Phaser.Point(0, 0)
    },
    PICKUPS:{
        SWORD: 0,
        MASTER_SWORD: 1,
        HEART: 2,
        LETTER: 3,
        KEY: 4
    },
    MOVABLES:{
        ROCK: 0,
        STATUE: 1
    }
};

//Create the game canvas
gameEngine.game = new Phaser.Game(ConfigOptions.screenW, ConfigOptions.screenH, Phaser.AUTO,null,this,false,false);
//Set up the game scenes
gameEngine.game.state.add('overworld',gameEngine.overworld);
gameEngine.game.state.add('dungeon',gameEngine.dungeon);
gameEngine.game.state.add('main_menu',gameEngine.main_menu);
gameEngine.game.state.add('credits',gameEngine.credits);
gameEngine.game.state.add('login',gameEngine.login);
gameEngine.game.state.add('loading_scene',gameEngine.loading_scene);
gameEngine.game.state.start('loading_scene');