var gameEngine = gameEngine || {};

gameEngine.login ={
    preload:function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        
       // this.load.image('mainMenu', 'img/mainMenu.jpg');
        this.load.image('backButton', 'img/back_button.png');

        

    },
    create:function(){
        
        this.game.stage.backgroundColor = "#101010";

        //Text in the scene
        this.title = this.game.add.bitmapText(ConfigOptions.screenW / 2, 150, 'font_white', 'Login', 120);
        this.title.anchor.setTo(0.5);
        
        this.usernameText = this.game.add.bitmapText(ConfigOptions.screenW / 2, 320, 'font_white', 'Username', 70);
        this.usernameText.anchor.setTo(0.5);
        
        this.passwordText = this.game.add.bitmapText(ConfigOptions.screenW / 2, 520, 'font_white', 'Password', 70);
        this.passwordText.anchor.setTo(0.5);
    
        
        this.startButton = this.game.add.button(230 , ConfigOptions.screenH - 80, 'backButton', this.back, this, 2, 1, 0);
        this.startButton.anchor.setTo(0.5);
        this.startButton.scale.setTo(10);
        this.startButton.onInputOver.add(this.overFeedback, this);
        this.startButton.onInputOut.add(this.leaveFeedback, this);
        
        this.loginButton = this.game.add.button(ConfigOptions.screenW / 2 , 800, 'loginButton', this.login, this, 2, 1, 0);
        this.loginButton.anchor.setTo(0.5);
        this.loginButton.scale.setTo(10);
        this.loginButton.onInputOver.add(this.overFeedback, this);
        this.loginButton.onInputOut.add(this.leaveFeedback, this);
        

        
        
        this.username = this.game.add.inputField(ConfigOptions.screenW / 2 - 135, 375, {
                                                font: '30px Arial',
                                                fill: '#101010',
                                                fontWeight: 'bold',
                                                width: 250,
                                                padding: 8,
                                                borderWidth: 1,
                                                borderColor: '#FFFFFF',
                                                borderRadius: 6,
                                                placeHolder: 'Username',
                                                type: PhaserInput.InputType.text,
                                                max: 20
        });
        
        this.password = this.game.add.inputField(ConfigOptions.screenW / 2 - 135, 575, {
                                                font: '30px Arial',
                                                fill: '#101010',
                                                fontWeight: 'bold',
                                                width: 250,
                                                padding: 8,
                                                borderWidth: 1,
                                                borderColor: '#FFFFFF',
                                                borderRadius: 6,
                                                placeHolder: 'Password',
                                                type: PhaserInput.InputType.password,
                                                max: 20
        });
        
        
        console.log(this.username);
        
    },
    update:function(){
        //print the text
        if(InputManager.A.isDown && InputManager.A.downDuration(10))
            console.log(this.username.getText());
        
    },
    back:function(){
        this.game.state.start("main_menu");
    },
    login:function(){
            var text = "";
            if(this.password.value == ""  && this.username.value == "") 
                text = "Invalid username and password";
            else if (this.password.value == "")
                text = "Invalid password";
            else if (this.password.value == "")
                text = "Invalid username";
            else{
                //Log in 
                text = '- Logged in as ' + this.username.value + ' -';
            }
        if(this.loginText == undefined){    
            this.loginText = this.game.add.bitmapText(ConfigOptions.screenW / 2, 720, 'font_white', text, 40);
            this.loginText.anchor.setTo(0.5);
        } else {
            this.loginText.setText(text);
        }
        if(this.playButton == undefined){
            this.playButton = this.game.add.button(ConfigOptions.screenW / 2 , 950, 'playButton', this.play, this, 2, 1, 0);
            this.playButton.anchor.setTo(0.5);
            this.playButton.scale.setTo(10);
            this.playButton.onInputOver.add(this.overFeedback, this);
            this.playButton.onInputOut.add(this.leaveFeedback, this);
        }
        
    },
    play:function(){
        this.game.state.start("overworld");
    },
    overFeedback:function(button){
        button.scale.setTo(12);
    },
    leaveFeedback:function(button){
        button.scale.setTo(10);
    }

}