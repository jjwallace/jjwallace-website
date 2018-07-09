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
			
			this.textAnimation('KEITH\nIS\nA\nWHORE!');
		},
		
		textAnimation: function(text){
			
			var sprite;
			var text;
			
			sprite = this.add.sprite(this.world.centerX, this.world.centerY);
			sprite.inputEnabled = true;
			sprite.input.enableDrag();

			var style = { font: "42px Arial Black", fill: "#c51b7d" ,align: "center", boundsAlignH: "center", boundsAlignV: "middle" };

			text = this.add.text(0, 0, text, style);
			//text.stroke = "#de77ae";
			//text.strokeThickness = 16;
			//text.setShadow(2, 2, "#333333", 10, true, true);
			text.anchor.set(0.5);
			
			sprite.addChild(text);
			
			sprite.scale.set(0.1)
				
			var aniTime = 2000;
			
			this.add.tween(sprite.scale).to({ x: 1, y: 1 }, aniTime, Phaser.Easing.Back.Out, true);
			this.add.tween(sprite).to( { alpha: 1 }, aniTime, "Linear", true);
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
