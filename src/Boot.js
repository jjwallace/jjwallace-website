/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/

var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {
    init: function () {
				this.stage.backgroundColor = "#0075FF";
        
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        scaleRatio = window.devicePixelRatio / 3;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      
        if (this.game.device.desktop){
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;
					//this.scale.setMinMax(480, 260, 720, 960);
        }else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;
            //this.scale.setMinMax(480, 260, window.innerWidth, window.innerHeight);
        }
        this.scale.refresh();
				console.log('Window Size: X:' + window.innerWidth + ' Y:' + window.innerHeight);

        console.log('Initializing');
    },

    preload: function () {
        var myDir = "assets/"
        this.load.image('preloaderBackground', 'assets/sprite/sp_load_back.png');
        this.load.image('preloaderBar', 'assets/sprite/sp_load_fore.png');
    },
    
    create: function () {
        console.log('Preloader Game *****');
        this.state.start('Preloader');
    }
	
};
