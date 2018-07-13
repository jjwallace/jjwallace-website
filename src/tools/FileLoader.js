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

	BasicGame.FlipBook.prototype = {

		preload: function () {
			this.load.text('myJson', 'assets/portfolio/games/list.json');	
		},

		create: function () {
			//this.camera.flash('#000000');

			this.stage.backgroundColor = "#cccccc";


			this.jsonList = JSON.parse(this.game.cache.getText('myJson'))
			console.log(this.jsonList)

			//SWIPE
			this.input.onUp.add(this.mouseUp, this);
			this.input.onDown.add(this.mouseDown, this);

			this.style = { font: "24px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle" };

			this.loadingText = this.add.text(this.game.width/2, 60, 'test', this.style);
			//			this.loadingText.stroke = "#de77ae";
			//			this.loadingText.strokeThickness = 16;
			//			this.loadingText.setShadow(2, 2, "#333333", 10, true, true);
			this.loadingText.anchor.set(0.5);


			function getRandom(min, max){
				return Math.floor(Math.random() * (max - min) + min);
			}

			var sprites = this.add.spriteBatch();

			var navbar = new NavBar(this);

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

		loadContent: function(state){

			state.load.onLoadStart.add(state.loadStart, state);
			state.load.onFileComplete.add(state.fileComplete, state);
			state.load.onLoadComplete.add(state.loadComplete, state);

			//			function menuClick(){
			//				state.start(state);
			//			}
			//
			//			var middleScreen = state.game.width / 2;
			//			var btnLoc = {x: middleScreen, y: 100 }
			//			var imgButton = state.add.sprite(btnLoc.x, 300, 'button');
			//			imgButton.anchor.set(0.5, 0.5);
			//
			//			imgButton.inputEnabled = true;
			//			imgButton.events.onInputDown.add(menuClick, state);

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
			var cY = this.world.centerY-200;
			this.loadingText.setText("Loading: " + progress + "% - " + totalLoaded + " / " + totalFiles);
			var newImage = this.add.image(cX, cY, cacheKey);
			newImage.anchor.set(0.5);


			images.push(newImage);
		},

		loadComplete: function() {
			this.loadingText.setText("Games");
			console.log['PRELOAD COMPLETE'];
			for (var i = 0; i < images.length; i++){
				images[i].x = this.world.width/2;
				this.style = { font: "42px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle"};

				var botImages = images[i].height/2 + 20;

				txtTitle = { font: "34px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle" };

				txtReg = { font: "16px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle" };

				txtDes = { font: "16px Arial Black", fill: "#333333" , align: "left", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 500};

				var lI = 20;
				var tS = 40;
				var mid = -images[i].width/2

				infoText = this.add.text(mid, botImages, this.jsonList.items[i].name, txtTitle);
				images[i].addChild(infoText);

				clientText = this.add.text(mid, botImages + lI + tS*1, this.jsonList.items[i].client, txtReg);
				images[i].addChild(clientText);

				timeText = this.add.text(mid, botImages + lI + tS*2, 'Build Time: ' + this.jsonList.items[i].buildTime, txtReg);
				images[i].addChild(timeText);

				descriptionText = this.add.text(mid, botImages + lI + tS*3, this.jsonList.items[i].description, txtDes);
				images[i].addChild(descriptionText);

				images[i].x = 1000;
			}
			images[3].x = this.world.width/2;

			imageBool = true;
		},

		update: function() {
			if (this.mouseIsDown == true) {
				var distY = Math.abs(this.input.y - this.startY);
				if (distY > 50) {
					this.swipeDone();
				}
			}
		}
	}
}

FlipBook();
