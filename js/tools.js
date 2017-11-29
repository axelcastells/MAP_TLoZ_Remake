var TEXT_RENDERER = {
    content: "",
    text:"",
    line: [],
    wordIndex: 0,
    lineIndex: 0,
    wordDelay: 120,
    lineDelay: 400,
    create:function(_x,_y,_content){
        if(!_content)
            throw 1;
        this.content = _content;
        this.text = gameEngine.game.add.text(_x,_y,'',{font: "font_white", fill: "#000000", fontSize: 32});
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
    }
    

};

