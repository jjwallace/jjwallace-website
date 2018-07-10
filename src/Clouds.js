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
	var speed = 0;
	var stars;

	var max = 60;
	var xx = [];
	var yy = [];
	var zz = [];

	var x = 0;
	var y = 0;
	var z = 0.1;
	
	var images = [];
	var imagesZ = [];
	var imagesY = [];
	var imageBool = false;
	var starGroup;
	
	BasicGame.Clouds.prototype = {
		create: function () {
			//this.camera.flash('#000000');
			
			
			
			//SWIPE
			this.input.onUp.add(this.mouseUp, this);
			this.input.onDown.add(this.mouseDown, this);
			
			x = this.world.centerX;
			y = this.world.centerY;
			
			var style = { font: "42px Arial Black", fill: "#333333" , align: "center", boundsAlignH: "center", boundsAlignV: "middle" };

			this.loadingText = this.add.text(this.game.centerX, 60, 'test', style);
			//text.stroke = "#de77ae";
			//text.strokeThickness = 16;
			//text.setShadow(2, 2, "#333333", 10, true, true);
			this.loadingText.anchor.set(0.5);
			
			this.stage.backgroundColor = "#91c8e8";
			
			if (this.renderType === Phaser.WEBGL){
				max = 60;
			}
			
			function getRandom(min, max){
				return Math.floor(Math.random() * (max - min) + min);
			}

			var sprites = this.add.spriteBatch();

			stars = [];
			starGroup = this.add.group();

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
				starGroup.add(stars[i]);
			}
			
			
			var navbar = new NavBar(this);
			
			this.textAnimation('TEST\nIS\nTEST!');
			
			this.loadContent(this);
		},
		
		mouseDown: function() {
			this.mouseIsDown = true;
			this.startY = this.input.y;
		},
		
		mouseUp: function() {
			this.mouseIsDown = false;
		},
		
		swipeDone: function() {
			var endY = this.input.y;
			if (endY < this.startY) {
				//UP
				speed = -3;
//				for (var i = 0; i < images.length; i++){
//					images[i].y -= 20;
//				}
			} else {
				//DOWN
				speed = 3;
//				for (var i = 0; i < images.length; i++){
//					images[i].y += 20;
//				}
			}
		},
		
		textAnimation: function(text){
			
			var sprite;
			var text;
			
			sprite = this.add.sprite(this.world.centerX, this.world.centerY);
			sprite.inputEnabled = true;
			sprite.input.enableDrag();

			var style = { font: "42px Arial Black", fill: "#333333" ,align: "center", boundsAlignH: "center", boundsAlignV: "middle" };

			text = this.add.text(0, 0, text, style);
			//text.stroke = "#de77ae";
			//text.strokeThickness = 16;
			//text.setShadow(2, 2, "#333333", 10, true, true);
			text.anchor.set(0.5);
			
			sprite.addChild(text);
			
			sprite.scale.set(0),
			sprite.alpha = 0;
				
			var aniTime = 5000;
			
			var tween = this.add.tween(sprite.scale).to({ x: 1, y: 1 }, aniTime, Phaser.Easing.Linear.In, true)
			tween.onComplete.add(function(){
				this.add.tween(sprite.scale).to({x: 2, y: 2}, 4000, Phaser.Easing.Linear.Out);
			},this);
			
			this.add.tween(sprite).to( { alpha: 1 }, aniTime, "Linear", true);
				//.to({y: this.world.height + 300}, 4000, Phaser.Easing.Exponential.In);
			
		},
		
		loadContent: function(state){

			state.load.onLoadStart.add(state.loadStart, state);
			state.load.onFileComplete.add(state.fileComplete, state);
			state.load.onLoadComplete.add(state.loadComplete, state);

			function menuClick(){
				state.start(state);
			}

			var middleScreen = state.game.width / 2;
			var btnLoc = {x: middleScreen, y: 100 }
			var imgButton = state.add.sprite(btnLoc.x, 300, 'button');
			imgButton.anchor.set(0.5, 0.5);

			imgButton.inputEnabled = true;
			imgButton.events.onInputDown.add(menuClick, state);

		},
		
		start: function(game) {
			for (var i = 1; i < 10; i++){
				this.load.image('img' + i, 'assets/portfolio/branding/'+i+'.png');
			}
			this.load.start();
			//this.imgButton.visible = false;
		},

		loadStart: function(state) {
			this.loadingText.setText("Loading ...");
		},

		fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
			var cX = this.world.centerX;
			var cY = this.world.centerY;
			this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
			var newImage = this.add.image(cX, cY, cacheKey);
			newImage.anchor.set(0.5);
			//newImage.scale.set(z);
			//z += 0.3;
			//y += 30 * z;
			
			images.push(newImage);
		},

		loadComplete: function() {
			this.loadingText.setText("Load Complete");
			console.log['PRELOAD COMPLETE'];
			for (var i = 0; i < images.length; i++){
				var ratio = (i / images.length);
				imagesZ[i] = -600 + ((290 + 600) * ratio);
				imagesY[i] = 0;
				console.log[ratio];
				
				
			}
			
			imageBool = true;
		},
		
		update: function() {
			if (this.mouseIsDown == true) {
				var distY = Math.abs(this.input.y - this.startY);
				if (distY > 50) {
					this.swipeDone();
				}
			}
			
			if(imageBool == true){
				for (var i = 0; i < images.length; i++){
					images[i].perspective = distance / (distance - imagesZ[i]);
					//images[i].y = this.world.centerY + imagesY[i] * images[i].perspective;

					imagesZ[i] += speed;
					images[i].z = Math.floor(600 + imagesZ[i]);
					console.log(images[i].z);

					if (imagesZ[i] > 290){
						imagesZ[i] -= 600;
						this.world.sendToBack(starGroup);
						//this.group.sendToBack(images[i]);
					}
					
					if (imagesZ[i] < -600){
						imagesZ[i] = 290;
						this.world.sendToBack(starGroup);
					}

					
					
					images[i].alpha = Math.min(images[i].perspective / 2, 1);
					images[i].scale.set(images[i].perspective / 2);
					//stars[i].rotation += 0.1;

				}
			}
			
			for (var i = 0; i < max; i++){
				stars[i].perspective = distance / (distance - zz[i]);
				stars[i].x = this.world.centerX + xx[i] * stars[i].perspective;
				stars[i].y = this.world.centerY + yy[i] * stars[i].perspective;

				zz[i] += speed;

				if (zz[i] > 290){
					zz[i] -= 600;
				}
				
				if (zz[i] < -600){
					zz[i] = 290;
				}

				stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
				stars[i].scale.set(stars[i].perspective / 2);
				//stars[i].rotation += 0.1;

			}

		}
		
	}
}

Clouds();
