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
        TEKTITE: 2
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
        RIGHT: new Phaser.Point(1,0)
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



var TEXT_RENDERER = {
    content: "",
    text:"",
    line: [],
    wordIndex: 0,
    lineIndex: 0,
    wordDelay: 120,
    lineDelay: 400,
    create:function(_content){
        content = _content;
        this.text = gameEngine.game.add.text(32,32,'',{font: "font_white", fill: "#19de65"});
        this.nextLine();
    },
    nextLine:function(){
        if (this.lineIndex === this.content.length)
        {
            //  We're finished
            return;
        }

        //  Split the current line on spaces, so one word per array element
        this.line = this.content[lineIndex].split(' ');

        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;

        //  Call the 'nextWord' function once for each word in the line (line.length)
        gameEngine.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

        //  Advance to the next line
        this.lineIndex++;
    },
    nextWord(){
            //  Add the next word onto the text string, followed by a space
        this.text.text = text.text.concat(line[wordIndex] + " ");

        //  Advance the word index to the next word in the line
        this.wordIndex++;

        //  Last word?
        if (this.wordIndex === this.line.length)
        {
            //  Add a carriage return
            this.text.text = this.text.text.concat("\n");

            //  Get the next line after the lineDelay amount of ms has elapsed
            gameEngine.game.time.events.add(this.lineDelay, this.nextLine, this);
        }
    }
    

};

