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
			//this.camera.flash('#000000');
			var middleScreen = this.game.width / 2;
			
			this.stage.backgroundColor = "#0075FF";

			function menuClick(game){
				navbar.toggleNavbar(this);
			}

			for (var i = 0; i < 20; i++) {
				new JellyFish(this, true, 100);
			}

			var imgLogo = this.add.sprite(middleScreen, 100, 'logo');
			var logoSize = {width: imgLogo.width, height: imgLogo.height}
			imgLogo.anchor.set(0.5, 0);
			//imgLogo.scale.setTo(0.1, 0.1);
			//this.add.tween(imgLogo.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true);

			var imgButton = this.add.sprite(middleScreen, this.game.height - 120, 'tubes');
			imgButton.anchor.set(0.5, 0.5);
			imgButton.animations.add('default');
			imgButton.animations.play('default', 30, true);
			
//			this.add.tween(imgButton).to({ x: btnLoc.x, y: btnLoc.y }, 500, Phaser.Easing.Back.Out, true);
//			this.add.tween(imgButton.scale).to({ x: 0.9, y: 0.9 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
			imgButton.inputEnabled = true;
			imgButton.events.onInputDown.add(menuClick, this);

			for (var i = 0; i < 10; i++) {
				new JellyFish(this, false, 0);
			}
			
			new SeaHorse(this);
			
			var game = BasicGame.Main;

			var navbar = new NavBar(this);
		}
	}
}

MainState();

JellyFish = function (objectScope, dark, jellySize) {
	var game = objectScope.game;

	this.alive = true;
	var jellySize = getRandom(150, 200) - jellySize;

	this.acc = jellySize/100;
	this.size = jellySize/100;

	function getRandom(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}

	Phaser.Sprite.call(this, game, getRandom(0, game.world.width), getRandom(0, game.world.height), 'jellyfish');
	this.animations.add('default');
	this.animations.play('default', 30, true);
	this.animations.getAnimation('default').frame = getRandom(2, this.animations.getAnimation('default').frameTotal);

	this.anchor.set(0.5,0.5);
	this.scale.setTo(this.size);
	this.angle = getRandom(-180, 180);

	if(dark == true){
		this.tint = 0x0066FF;
	}
	
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

















SeaHorse = function (objectScope) {
	var game = objectScope.game;
	this.alive = true;
	this.acc = 3;
	this.size = 1.5;
	
	function getRandom(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}
	
	Phaser.Sprite.call(this, game, getRandom(0, game.width), getRandom(0, game.height), 'horse');
	this.animations.add('default');
	this.animations.play('default', 30, true);
	this.animations.getAnimation('default').frame = getRandom(2, this.animations.getAnimation('default').frameTotal);
	this.anchor.set(0.5,0.5);
	this.scale.setTo(this.size);
	//this.angle = getRandom(-180, 180);
	game.add.existing(this);
	
	function makeNewPosition(){
		var h = Math.floor(Math.random() * 200) - 100;
		var w = Math.floor(Math.random() * 200) - 100;
		var nh = game.width / 2 + h;
		var nw = game.height / 2 + w;
		return [nh,nw];    
	}
	
	var horse = this;

	function animateDiv(){
		var newq = makeNewPosition();
		console.log(newq);
		if(newq[0] < horse.x){
			horse.scale.setTo(horse.size,horse.size);
		}else{
			horse.scale.setTo(-horse.size,horse.size);
		}
		moveMe = game.add.tween(horse).to({ x: newq[0], y: newq[1] }, 2000, Phaser.Easing.Cubic.InOut, true);
		console.log(horse);
		moveMe.onComplete.add(animateDiv, this);
	};
	
	animateDiv();
};

SeaHorse.prototype.constructor = SeaHorse;
SeaHorse.prototype = Object.create(Phaser.Sprite.prototype);

SeaHorse.prototype.update = function(){

//	this.xSpeed = Math.cos((this.angle)/180*Math.PI) * - this.acc;
//	this.ySpeed = Math.sin((this.angle)/180*Math.PI) * - this.acc;
//
//	this.x += this.xSpeed;
//	this.y += this.ySpeed;
//
//	//Reset if off screen
//	function checkBounds(sprite){
//		var game = sprite.game;
//		var boundsSize = 100;
//		var worldWidth = game.world.width;
//		var worldHeight = game.world.height;
//
//		if(sprite.x > (worldWidth + boundsSize)){
//			sprite.x = 0 - boundsSize;
//		}
//		if(sprite.x < (0 - boundsSize)){
//			sprite.x = worldWidth + boundsSize;
//		}
//		if(sprite.y > (worldHeight + boundsSize)){
//			sprite.y = 0 - boundsSize;
//		}
//		if(sprite.y < (0 - boundsSize)){
//			sprite.y = worldHeight + boundsSize;
//		}
//	}
//
//	checkBounds(this);
}
