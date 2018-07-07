/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/

function MainState(){

	BasicGame.Main = function (game) { this.game; this.add; this.camera; this.cache; this.input; this.load; this.math; this.sound; this.stage; this.time; this.tweens; this.state; this.world; this.particles; this.physics; this.rnd;
	};

	BasicGame.Main.prototype = {
		create: function () {
			var middleScreen = this.game.width / 2;

			function menuClick(game){
				navbar.toggleNavbar(this);
			}

			var imgMenu = this.add.sprite(this.game.width, 0, 'menu');
			imgMenu.anchor.set(1,0);
			imgMenu.inputEnabled = true;
			imgMenu.events.onInputDown.add(menuClick, this);

			var imgLogo = this.add.sprite(middleScreen, 100, 'logo');
			var logoSize = {width: imgLogo.width, height: imgLogo.height}
			imgLogo.anchor.set(0.5, 0);
			imgLogo.scale.setTo(0.1, 0.1);
			this.add.tween(imgLogo.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true);

			var btnLoc = {x: middleScreen, y: imgLogo.y + (logoSize.height) + 60}
			var imgButton = this.add.sprite(btnLoc.x, this.game.height + 200, 'button');
			imgButton.anchor.set(0.5, 0);
			this.add.tween(imgButton).to({ x: btnLoc.x, y: btnLoc.y }, 500, Phaser.Easing.Back.Out, true);
			imgButton.inputEnabled = true;
			imgButton.events.onInputDown.add(menuClick, this);

			for (var i = 0; i < 20; i++) {
				new JellyFish(this);
			}
			var game = BasicGame.Main;

			var navbar = new NavBar(this);
		}
	}
}

MainState();

JellyFish = function (objectScope) {
	var game = objectScope.game;

	this.alive = true;
	var jellySize = getRandom(150, 200);

	this.acc = jellySize/100;
	this.size = jellySize/100;

	function getRandom(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}

	Phaser.Sprite.call(this, game, getRandom(0, game.world.width), getRandom(0, game.world.height), 'spJellyFish');
	this.animations.add('default');
	this.animations.play('default', 30, true);
	this.animations.getAnimation('default').frame = getRandom(2, this.animations.getAnimation('default').frameTotal);

	this.anchor.set(0.5,0.5);
	this.scale.setTo(this.size);
	this.angle = getRandom(-180, 180);

	game.add.existing(this);

};

JellyFish.prototype.constructor = JellyFish;

JellyFish.prototype = Object.create(Phaser.Sprite.prototype);

JellyFish.prototype.update = function(){

	this.xSpeed = Math.cos((this.angle)/180*Math.PI) * - this.acc;
	this.ySpeed = Math.sin((this.angle)/180*Math.PI) * - this.acc;

	this.x += this.xSpeed;
	this.y += this.ySpeed;

	//Reset if off screen
	function checkBounds(sprite){
		var game = sprite.game;
		var boundsSize = 100;
		var worldWidth = game.world.width;
		var worldHeight = game.world.height;

		if(sprite.x > (worldWidth + boundsSize)){
			sprite.x = 0 - boundsSize;
		}
		if(sprite.x < (0 - boundsSize)){
			sprite.x = worldWidth + boundsSize;
		}
		if(sprite.y > (worldHeight + boundsSize)){
			sprite.y = 0 - boundsSize;
		}
		if(sprite.y < (0 - boundsSize)){
			sprite.y = worldHeight + boundsSize;
		}
	}

	checkBounds(this);
}
