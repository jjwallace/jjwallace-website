/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
*/

BasicGame.DnaMenu = function (game) {

    this.music = null;
    this.playButton = null;

};

var dnaTint = [0xEEE3A1, 0x4B0082, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF7F00, 0xFF0000,0xFF0000,0xFF0000,0xFF0000];


var dnaStrain = [];

BasicGame.DnaMenu.prototype = {

    create: function () {
			this.stage.backgroundColor = "#000000";
			
        for (var i = 0; i < 40; i++){
            var uiDNAl = this.add.sprite(234, 234, 'dna');

            uiDNAl.animations.add('twist');  
            uiDNAl.animations.play('twist', 30, true);
            uiDNAl.anchor.setTo(0.5, 0.5);

            uiDNAl.x = this.world.centerX;
            uiDNAl.y = 0 + i * 60;
            uiDNAl.angle = 0;
            uiDNAl.visible = true;
					
						//uiDNAl.tint = dnaTint[i];

            dnaStrain.push(uiDNAl);
        }
    },

    update: function () {
        
    }

};
