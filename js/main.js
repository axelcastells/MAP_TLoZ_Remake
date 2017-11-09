var gameEngine = gameEngine || {};

var ConfigOptions = {
    screenW:1200,
    screenH:1200,
    linkSpeed:200
};

var InputManager = {
    keyRight: null,
    keyLeft: null,
    keyDown: null,
    keyUp: null,
    space: null,
    A: null,
    B: null    
};

//Create the game canvas
gameEngine.game = new Phaser.Game(ConfigOptions.screenW, ConfigOptions.screenH, Phaser.AUTO,null,this,false,false);

//Set up the game scenes
gameEngine.game.state.add('overworld',gameEngine.overworld);
gameEngine.game.state.add('dungeon',gameEngine.dungeon);
gameEngine.game.state.add('menu',gameEngine.menu);
gameEngine.game.state.start('dungeon');

