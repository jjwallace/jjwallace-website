/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/

function FlipBook(){

	BasicGame.FlipBook = function (game) { this.game; this.add; this.camera; this.cache; this.input; this.load; this.math; this.sound; this.stage; this.time; this.tweens; this.state; this.world; this.particles; this.physics; this.rnd;
																		 };
	var distance = 300;
	var speed = 1;
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
	
	var currentCount = 0;
	
	var activeMover = true;
	
	var imgItems = 0;
	
	var pageTitle = 'My Games';

	BasicGame.FlipBook.prototype = {
		
		preload: function () {
			var loaderOffset = 50
			this.background = this.add.sprite(this.world.centerX, this.world.centerY + loaderOffset, 'preloaderBackground');
			this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY + loaderOffset, 'preloaderBar');
			this.preloadBar.anchor.setTo(0.5, 0.5);
			this.background.anchor.setTo(0.5, 0.5);
			
			this.load.image('arrow','assets/sprite/arrow.png');
			
			
			this.load.script(
				'font.Asap',
				'//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js'
			);
			
			console.log('JSON', globalMenuItem)
			
			this.jsonList =  JSON.parse(this.cache.getText(globalMenuItem));
			console.log(this.jsonList);
			imgItems = this.jsonList;
			console.log('JSON LOADED');
			console.log(imgItems);
			
			for (var i = 0; i < imgItems.items.length; i++){
				var myString = imgItems.items[i].name;
				this.load.image(myString, imgItems.filePath +
												imgItems.items[i].img);
				console.log(myString);
			}
		},
		
		create: function () {
			this.preloadBar.visible = false;
			this.background.visible = false;			
			
			this.stage.backgroundColor = "#91c8e8";

			//SWIPE
			this.input.onUp.add(this.mouseUp, this);
			this.input.onDown.add(this.mouseDown, this);

			function getRandom(min, max){
				return Math.floor(Math.random() * (max - min) + min);
			}

			if (this.renderType === Phaser.WEBGL){
				max = 60;
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
			
			this.style = { font: "24px Helvetica Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4 };
			this.loadingText = this.add.text(this.game.width/2, 60, 'test', this.style);
			this.loadingText.anchor.set(0.5);
			this.loadingText.setText(imgItems.pageTitle);

			var backButton = this.add.sprite(0, 0, 'back');
			backButton.anchor.set(0,0);
			backButton.inputEnabled = true;
			backButton.events.onInputDown.add(this.backButton, this);
			
			var arrowLeft = this.add.sprite(0, this.game.height, 'arrow');
			arrowLeft.anchor.set(0,1);
			arrowLeft.inputEnabled = true;
			arrowLeft.events.onInputDown.add(this.goLeft, this);
			
			var arrowRight = this.add.sprite(this.game.width, this.game.height, 'arrow');
			arrowRight.anchor.set(0,1);
			arrowRight.scale.set(-1,1);
			arrowRight.inputEnabled = true;
			arrowRight.events.onInputDown.add(this.goRight, this);
			
			images = [];
			currentCount = 0;
			
			console.log('image items ' + imgItems)
			for (var i = 0; i < imgItems.items.length; i++){
				console.log(imgItems.items[i].name)
				var cX = this.game.width/2;
				var cY = this.game.height/2
				var newImage = this.add.image(cX, cY, imgItems.items[i].name);
				newImage.anchor.set(0.5);
				newImage.scale.set(0.1);
				images.push(newImage);
			}
			
			this.loadComplete();
			
			var navbar = new NavBar(this);

			//this.loadContent(this);
		},

		backButton: function() {
			this.state.start("Clouds");
		},
		
		mouseDown: function() {
			this.mouseIsDown = true;
			this.startX = this.input.x;
		},

		mouseUp: function() {
			this.mouseIsDown = false;
		},

		swipeDone: function() {
			//LEFT
			var endX = this.input.x;
			if (endX < this.startX) {
				this.goRight();
			} else {
				this.goLeft();		
			}
		},
		
		goRight: function() {
			if(currentCount < images.length){
				if(activeMover == true){
					activeMover = false;
					currentCount += 1;
					for (var i = 0; i < images.length; i++){
						var tempTween = this.add.tween(images[i]).to({ x: (images[i].x-images[0].width - 20), y: images[i].y},300, Phaser.Easing.Quartic.Out, true);
						function resetMe(){activeMover = true};
						tempTween.onComplete.add(resetMe, this)
					}
				}
			}
		},
		
		goLeft: function() {
			
			if(currentCount > 0){
				if(activeMover == true){
					activeMover = false;
					currentCount -= 1;
					for (var i = 0; i < images.length; i++){
						var tempTween = this.add.tween(images[i]).to({ x: (images[i].x+images[0].width + 20), y: images[i].y},300, Phaser.Easing.Quartic.Out, true);
						function resetMe(){activeMover = true};
						tempTween.onComplete.add(resetMe, this)
					}
				}		
			}
		},
		
		loadComplete: function() {
			
			console.log('PRELOAD COMPLETE');
			
			images.x = 0;
			images.y = 0;
			
			for (var i = 0; i < images.length; i++){
				images[i].scale.set(1);
				images[i].y = 300;
				images[i].x = this.world.width/2;
				this.style = { font: "42px Helvetica Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle"};
				
				var botImages = images[i].height/2 + 20;

				txtTitle = { font: "34px Helvetica Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4  };
				
				txtReg = { font: "16px Helvetica Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4  };
				
				txtDes = { font: "16px Helvetica Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4 , wordWrap: true, wordWrapWidth: 500};
				
				var lI = 20;
				var tS = 40;
				var mid = -images[i].width/2
				
				infoText = this.add.text(mid, botImages, this.jsonList.items[i].name, txtTitle);
				images[i].addChild(infoText);
				
				clientText = this.add.text(mid, botImages + lI + tS*1, this.jsonList.items[i].client, txtReg);
				images[i].addChild(clientText);
				
				timeText = this.add.text(mid, botImages + lI + tS*2, 'Build Time: ' + this.jsonList.items[i].buildTime + ' Days.', txtReg);
				images[i].addChild(timeText);
				
				descriptionText = this.add.text(mid, botImages + lI + tS*3, this.jsonList.items[i].description, txtDes);
				images[i].addChild(descriptionText);
				
				if(i > 0){
					var imgSpace = 20;
					images[i].x = images[i - 1].x + images[i - 1].width + (imgSpace);
				}else{
				images[i].x = this.game.width/2;
				}
				console.log((images[i]))
			}
			
			imageBool = true;
		},

		update: function() {
			if (this.mouseIsDown == true) {
				var distY = Math.abs(this.input.y - this.startY);
				if (distY > 50) {
					this.swipeDone();
					this.mouseIsDown = false;
				}
				var distX = Math.abs(this.input.x - this.startX);
				if (distX > 50) {
					this.swipeDone();
					this.mouseIsDown = false;
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

FlipBook();
