/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/
var globalMenuItem = null;

function Clouds(){

	BasicGame.Clouds = function (game) { this.game; this.add; this.camera; this.cache; this.input; this.load; this.math; this.sound; this.stage; this.time; this.tweens; this.state; this.world; this.particles; this.physics; this.rnd;};
	
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
	
	BasicGame.Clouds.prototype = {
		
		preload: function (){
				this.load.text('jsonDrawings', 'assets/portfolio/drawings/list.json');
				this.load.text('jsonGames', 'assets/portfolio/games/list.json');
				this.load.image('back','assets/sprite/back.png');
			
			this.load.image('iconGames','assets/sprite/img_games.png');
			this.load.image('iconArtwork','assets/sprite/img_artwork.png');
			this.load.image('iconReel','assets/sprite/img_game_reel.png');
			
//			this.load.atlas('iconGames', 'assets/sprite/icon_games.png', 'assets/sprite/icon_games.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
//			this.load.atlas('iconArtwork', 'assets/sprite/icon_artwork.png', 'assets/sprite/icon_artwork.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
//			this.load.atlas('iconOther', 'assets/sprite/icon_other.png', 'assets/sprite/icon_other.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		},
		
		create: function () {
			
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
			
			menuJSON = {
				menu: [
					{state: 'FlipBook', img: 'iconGames', animated: true, 
					 type: 'state', url: 'jsonGames'},
					{state: 'FlipBook', img: 'iconArtwork', animated: true, 
					 type: 'state', url: 'jsonDrawings'},
					{state: 'ReelPreloader', img: 'iconReel', animated: true, 
					 type: 'state', url: 'jsonGames'}
				],
			}
			
			function addMenuItems(scope, state){
				for (var i = 0; i < menuJSON.menu.length; i++) {
					var myLocY = 100 + i * 220;
					this.item = scope.add.sprite(scope.world.centerX, scope.world.centerY, menuJSON.menu[i].img);
					this.item.anchor.set(0.5,0);
					this.item.scale.set(0);
//					this.item.animations.add('default');
//					this.item.animations.play('default', 30, true);
					var aniTime =  500 + myLocY * 2;
					
					//scope.add.tween(this.item).to({ x: -300}, 500, Phaser.Easing.Back.In, true);
					
					var tween = scope.add.tween(this.item.scale).to({ x: 1, y: 1 }, aniTime, Phaser.Easing.Quadratic.InOut, true);
					var tween2 = scope.add.tween(this.item).to({ x: scope.world.centerX, y: myLocY }, aniTime, Phaser.Easing.Quadratic.InOut, true);
					
//					tween.onComplete.add(function(){
//						this.add.tween(sprite.scale).to({x: 2, y: 2}, 4000, Phaser.Easing.Linear.Out);
//					},this);


					this.item.inputEnabled = true;
					this.item.events.onInputDown.add(clickMe, this.item);
					//this.addChild(this.item);

					this.item.myUrl = menuJSON.menu[i].url;
					this.item.state = menuJSON.menu[i].state;
					this.item.type = menuJSON.menu[i].type;

					function clickMe(){
						if(this.type == 'state'){
							console.log(this.state);
							globalMenuItem = this.myUrl;
							scope.state.start(this.state);
						}else{
							//console.log(this.myUrl);
							window.open(this.myUrl, "_blank");
						}
					}
				}
			}
			
			addMenuItems(this,this);
			
			var backButton = this.add.sprite(0, 0, 'back');
			backButton.anchor.set(0,0);
			backButton.inputEnabled = true;
			backButton.events.onInputDown.add(this.backButton, this);
			
			var navbar = new NavBar(this);
			
			//this.textAnimation('TEST\nIS\nTEST!');
			
		},
		
		backButton: function() {
			this.state.start("Main");
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
		
		update: function() {
			
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
