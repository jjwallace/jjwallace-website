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
				this.add.tween(imgLogo).to({ x: -300}, 500, Phaser.Easing.Back.In, true);
				newNote = new NoteBox(this, middleScreen, 350);
			} 

			for (var i = 0; i < 20; i++) {
				new JellyFish(this, true, 100);
			}

			var imgLogo = this.add.sprite(middleScreen, 350, 'logo');
			var logoSize = {width: imgLogo.width, height: imgLogo.height}
			imgLogo.anchor.set(0.5, 0.5);
			imgLogo.scale.setTo(0.1, 0.1);
			this.add.tween(imgLogo.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true);

			var imgButton = this.add.sprite(middleScreen, this.game.height - 120, 'tubes');
			imgButton.anchor.set(0.5, 0.5);
			imgButton.scale.setTo(0);
			imgButton.animations.add('default');
			imgButton.animations.play('default', 30, true);
			
			//this.add.tween(imgButton).to({ x: middleScreen, y: this.game.height - 120 }, 6000, Phaser.Easing.Back.Out, true);
			this.add.tween(imgButton.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true, 1000);
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
		var worldWidth = game.width;
		var worldHeight = game.height+100;

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




NoteBox = function (objectScope, xGo, yGo) {
	var game = objectScope.game;
	this.alive = true;

	Phaser.Sprite.call(this, game, game.width + 400, yGo , 'mebox');
	this.anchor.set(0.5,0.5);
	game.add.existing(this);

	function makeNewPosition(){
		var h = Math.floor(Math.random() * 200) - 100;
		var w = Math.floor(Math.random() * 200) - 100;
		var nh = game.width / 2 + h;
		var nw = game.height - 100 + w;
		return [nh,nw];    
	}
	
	text = game.add.text(-this.width/2 + 10, -this.height/2 + 10, '', { font: "20pt Arial", fill: "#333333", stroke: "#888888", strokeThickness: 2, align: 'left', wordWrap: true, wordWrapWidth: 280  });
	
	this.addChild(text);

	moveMe = game.add.tween(this).to({ x: xGo, y: yGo }, 800, Phaser.Easing.Cubic.InOut, true);
	moveMe.onComplete.add(animateDiv, this);

	var index = 0;
	var line = '';
	
	var content = [
		"JJ: I am a Product Designer & Software Developer specializing in highly interactive we experiances.  You are surounded by a jelly fish bloom. Yes you are still in your browser...",
	];
	
	function animateDiv(){
		line = '';
		updateLine();
		game.time.events.repeat(40, content[index].length + 1, updateLine, this);
	}
	
	function updateLine() {

		if (line.length < content[index].length){
			line = content[index].substr(0, line.length + 1);
			// text.text = line;
			text.setText(line);
		}
//		}else{
//			//  Wait 2 seconds then start a new line
//			game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
//		}
	}
	//		moveMe.onComplete.add(animateDiv, this);
	
//	function animateDiv(){
//		
//		moveMe = game.add.tween(horse).to({ x: newq[0], y: newq[1] }, delay, Phaser.Easing.Cubic.InOut, true);
//		moveMe.onComplete.add(animateDiv, this);
//	};
//
//	this.inputEnabled = true;
//	this.events.onInputDown.add(clickMe, this);
//	this.input.enableDrag();
//
//	animateDiv();
};

NoteBox.prototype.constructor = NoteBox;
NoteBox.prototype = Object.create(Phaser.Sprite.prototype);












SeaHorse = function (objectScope) {
	var game = objectScope.game;
	this.alive = true;
	this.acc = 3;
	this.size = 1.5;
	
	function getRandom(min, max){
		return Math.floor(Math.random() * (max - min) + min);
	}
	
	Phaser.Sprite.call(this, game, -40, 500, 'horse');
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
		var nw = game.height - 100 + w;
		return [nh,nw];    
	}
	
	var horse = this;
	
	var moveMe;

	function animateDiv(){
		var newq = makeNewPosition();
		if(newq[0] < horse.x){
			horse.scale.setTo(horse.size,horse.size);
		}else{
			horse.scale.setTo(-horse.size,horse.size);
		}
		var disX = horse.x - newq[0];
		var disY = horse.y - newq[1];
		if(disX < 0)(disX *= -1)
		if(disY < 0)(disY *= -1)
		var delay = (disX + disY)*10;
		moveMe = game.add.tween(horse).to({ x: newq[0], y: newq[1] }, delay, Phaser.Easing.Cubic.InOut, true);
		moveMe.onComplete.add(animateDiv, this);
	};
	
	function clickMe(){
		//moveMe.tween.remove();
	}
	
	this.inputEnabled = true;
	this.events.onInputDown.add(clickMe, this);
	this.input.enableDrag();
	
	animateDiv();
};

SeaHorse.prototype.constructor = SeaHorse;
SeaHorse.prototype = Object.create(Phaser.Sprite.prototype);
