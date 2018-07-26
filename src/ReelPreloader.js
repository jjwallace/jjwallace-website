/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/

BasicGame.ReelPreloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};



BasicGame.ReelPreloader.prototype = {

	preload: function () {
		
//		var content = [
//			" ",
//			"photon storm presents",
//			"a phaser production",
//			" ",
//			"Kern of Duty",
//			" ",
//			"directed by rich davey",
//			"rendering by mat groves",
//			"    ",
//			"03:45, November 4th, 2014",
//			"somewhere in the north pacific",
//			"mission control bravo ...",
//		];
//
//		var text;
//		var index = 0;
//		var line = '';
//		
//		function updateLine(scope) {
//			if (line.length < content[index].length){
//				line = content[index].substr(0, line.length + 1);
//				text.setText(line);
//			}
//			else{
//				scope.time.events.add(Phaser.Timer.SECOND * 2, nextLine(game), this);
//			}
//		}
//
//		function nextLine(scope) {
//			index++;
//			if (index < content.length){
//				line = '';
//				scope.time.events.repeat(80, content[index].length + 1, updateLine(scope), this);
//			}
//		}
//		text = this.add.text(-this.width/2 + 10, -this.height/2 + 10, '', { font: "16pt Arial", fill: "#333333", stroke: "#888888", strokeThickness: 2, align: 'left', wordWrap: true, wordWrapWidth: 280  });
//		
//		nextLine(this);
		
		this.stage.backgroundColor = "#000000";
		
		var loaderOffset = 50
		this.background = this.add.sprite(this.world.centerX, this.world.centerY + loaderOffset, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY + loaderOffset, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.background.anchor.setTo(0.5, 0.5);

		var loadLogo = this.add.sprite(this.world.centerX, this.world.centerY - 110, 'octoMan');
		loadLogo.anchor.set(0.5, 0);
		loadLogo.scale.setTo(0.1, 0.1);
		loadLogo.animations.add('default');
		loadLogo.animations.play('default', 30, true);
		this.add.tween(loadLogo.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true);
		
		this.load.video('reel', 'assets/portfolio/video/reel.mp4');

		this.load.setPreloadSprite(this.preloadBar);
	},

	create: function () {
		this.state.start('ReelPlayer');
	},

};
