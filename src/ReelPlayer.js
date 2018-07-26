/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/

function ReelPlayer(){

	BasicGame.ReelPlayer = function (game) { this.game; this.add; this.camera; this.cache; this.input; this.load; this.math; this.sound; this.stage; this.time; this.tweens; this.state; this.world; this.particles; this.physics; this.rnd;}
																		
	BasicGame.ReelPlayer.prototype = {
		create: function () {

			video = this.add.video('reel');
			video.play(true);
			//  x, y, anchor x, anchor y, scale x, scale y 400, 300, 0.5, 0.5
			video.addToWorld((this.game.width/2),(this.game.height/2),0.5,0.5,2,2);
			video.rotation = (90)
			
			var navbar = new NavBar(this);
		},

		update: function() {

		}

	}
}

ReelPlayer();
