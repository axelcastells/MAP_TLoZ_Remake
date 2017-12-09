var TEXT_RENDERER = {
    content: "",
    text:"",
    line: [],
    wordIndex: 0,
    lineIndex: 0,
    wordDelay: 120,
    lineDelay: 400,
    potrait: null,
    create:function(_content){
        this.potrait = gameEngine.game.add.sprite(256/2, 256 - 50, 'textpotrait');
        this.potrait.anchor.setTo(.5);
        this.potrait.fixedToCamera = true;
        if(!_content)
            throw 1;
        this.content = _content;
        this.text = gameEngine.game.add.text(this.potrait.position.x - this.potrait.width/2 + 10, this.potrait.position.y - this.potrait.height/2 + 10, this.content,{font: "font_white", fill: "#ffffff", wordWrap: true, wordWrapWidth: this.potrait.width-10, wordWrapHeight: this.potrait.height - 10, fontSize: 12});
        this.text.fixedToCamera = true;
        this.nextLine();
    },
    nextLine:function(){
        if (this.lineIndex === this.content.length)
        {
            return;
        }

        this.line = this.content[this.lineIndex].split(' ');
        this.wordIndex = 0;

        gameEngine.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

        this.lineIndex++;
    },
    nextWord(){
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");

        this.wordIndex++;


        if (this.wordIndex === this.line.length)
        {
            this.text.text = this.text.text.concat("\n");
            gameEngine.game.time.events.add(this.lineDelay, this.nextLine, this);
        }
    },
    nextLetter(){
          
    },
    getUpdatedText()
    {
        return this.text.text;
    },
    reset(){
        this.content = "";
        this.text.kill();
        this.text = "";
        this.potrait.kill();
        this.potrait = null;
    }
    
};