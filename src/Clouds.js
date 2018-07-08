/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/

function Clouds(){

	BasicGame.Clouds = function (game) { this.game; this.add; this.camera; this.cache; this.input; this.load; this.math; this.sound; this.stage; this.time; this.tweens; this.state; this.world; this.particles; this.physics; this.rnd;
																	 };
	
	var distance = 300;
	var speed = 4;
	var stars;

	var max = 60;
	var xx = [];
	var yy = [];
	var zz = [];


	BasicGame.Clouds.prototype = {
		create: function () {
			//this.camera.flash('#000000');
			
			this.stage.backgroundColor = "#91c8e8";
			
			if (this.renderType === Phaser.WEBGL){
				max = 60;
			}
			
			function getRandom(min, max){
				return Math.floor(Math.random() * (max - min) + min);
			}

			var sprites = this.add.spriteBatch();

			stars = [];

			for (var i = 0; i < max; i++){
				xx[i] = Math.floor(Math.random() * 800) - 400;
				//yy[i] = Math.floor(Math.random() * 600) - 300;
				yy[i] = Math.floor(Math.random() * 600) - 300;
				zz[i] = Math.floor(Math.random() * 1700) - 100;
				
				while(yy[i] < 50 && yy[i] > -50){
					yy[i] = Math.floor(Math.random() * 800) - 400;
				}

				var star = this.make.sprite(0, 0, 'cloud');

				sprites.addChild(star);

				stars.push(star);
				
			}
			
			var navbar = new NavBar(this);
		},
		
		update: function() {

			for (var i = 0; i < max; i++){
				stars[i].perspective = distance / (distance - zz[i]);
				stars[i].x = this.world.centerX + xx[i] * stars[i].perspective;
				stars[i].y = this.world.centerY + yy[i] * stars[i].perspective;

				zz[i] += speed;

				if (zz[i] > 290){
					zz[i] -= 600;
				}

				stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
				stars[i].scale.set(stars[i].perspective / 2);
				//stars[i].rotation += 0.1;

			}

		}
		
	}
}

Clouds();
