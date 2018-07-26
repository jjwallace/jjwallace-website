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

	BasicGame.FlipBook.prototype = {

		preload: function () {
			this.load.text('myJson', 'assets/portfolio/games/list.json');	
			this.load.image('arrow','assets/sprite/arrow.png');
			this.load.image('back','assets/sprite/back.png');
		},

		create: function () {

			this.stage.backgroundColor = "#91c8e8";

			this.jsonList = JSON.parse(this.game.cache.getText('myJson'))
			console.log(this.jsonList)

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

			this.style = { font: "24px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4 };
			this.loadingText = this.add.text(this.game.width/2, 60, 'test', this.style);
			this.loadingText.anchor.set(0.5);

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

			var navbar = new NavBar(this);

			this.loadContent(this);
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

		loadContent: function(state){
			state.load.onLoadStart.add(state.loadStart, state);
			state.load.onFileComplete.add(state.fileComplete, state);
			state.load.onLoadComplete.add(state.loadComplete, state);
			state.start(state);
		},

		start: function(game) {
			console.log(this.jsonList.items.length);
			for (var i = 1; i < this.jsonList.items.length; i++){
				this.load.image('img' + i, 'assets/portfolio/games/'+ this.jsonList.items[i].img);
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
			this.loadingText.setText("Loading: " + progress + "% - " + totalLoaded + " / " + totalFiles);
			var newImage = this.add.image(cX, cY, cacheKey);
			newImage.anchor.set(0.5);
			newImage.scale.set(0.1);

			//this.add.tween(newImage.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Back.In, true);

			images.push(newImage);

			//			images.inputEnabled = true;
			//			images.input.enableDrag();
		},

		loadComplete: function() {
			this.loadingText.setText("Games");
			console.log['PRELOAD COMPLETE'];

			images.x = 0;
			images.y = 0;

			for (var i = 0; i < images.length; i++){
				images[i].scale.set(1);
				images[i].y = 300;
				images[i].x = this.world.width/2;
				this.style = { font: "42px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle"};

				var botImages = images[i].height/2 + 20;

				txtTitle = { font: "34px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4  };

				txtReg = { font: "16px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4  };

				txtDes = { font: "16px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#ffffff", strokeThickness: 4 , wordWrap: true, wordWrapWidth: 500};

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
