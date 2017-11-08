var gameEngine = gameEngine || {};

var ConfigOptions = {
    screenW:1200,
    screenH:1200
};

gameEngine.game = new Phaser.Game(ConfigOptions.screenW, ConfigOptions.screenH, Phaser.AUTO,null,this,false,false);

gameEngine.game.state.add('overworld',gameEngine.overworld);
gameEngine.game.state.add('dungeon',gameEngine.dungeon);
gameEngine.game.state.add('menu',gameEngine.menu);
gameEngine.game.state.start('dungeon');