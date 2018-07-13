/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* http://www.jjwallace.info/
* Pink JellyFish Phaser 2 CE Sample
*/

BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
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

			this.load.setPreloadSprite(this.preloadBar);
			this.load.atlas('jellyfish', 'assets/sprite/sp_jellyfish.png', 'assets/sprite/sp_jellyfish.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('item1', 'assets/sprite/item1.png', 'assets/sprite/item1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('item2', 'assets/sprite/item2.png', 'assets/sprite/item2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

			this.load.atlas('item3', 'assets/sprite/item3.png', 'assets/sprite/item3.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('dna', 'assets/sprite/dna.png', 'assets/sprite/dna.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('tubes', 'assets/sprite/tubes.png', 'assets/sprite/tubes.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('horse', 'assets/sprite/sp_seahorse_orange.png', 'assets/sprite/sp_seahorse_orange.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.image('button', 'assets/sprite/button.png');
		
			this.load.image('logo', 'assets/sprite/logo.png');
			this.load.image('menu', 'assets/sprite/menu.png');
			this.load.image('box', 'assets/sprite/box.png');
			this.load.image('mebox', 'assets/sprite/mebox.png');
			
			this.load.image('cloud', 'assets/sprite/cloud.png');
		
	},

	create: function () {
		this.state.start('ReelPreloader');
	},
	
};
