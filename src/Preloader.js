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

			this.load.setPreloadSprite(this.preloadBar);
			this.load.atlas('jellyfish', 'assets/sprite/sp_jellyfish.png', 'assets/sprite/sp_jellyfish.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('item1', 'assets/sprite/item1.png', 'assets/sprite/item1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('item2', 'assets/sprite/item2.png', 'assets/sprite/item2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

			this.load.atlas('item3', 'assets/sprite/item3.png', 'assets/sprite/item3.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.atlas('dna', 'assets/sprite/dna.png', 'assets/sprite/dna.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
			this.load.image('button', 'assets/sprite/button.png');
			this.load.image('logo', 'assets/sprite/logo.png');
			this.load.image('menu', 'assets/sprite/menu.png');
			//this.load.atlas('atom', 'assets/sprite/atom.png', 'assets/sprite/atom.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
			
			this.load.image('cloud', 'assets/sprite/cloud.png');
		
	},

	create: function () {
		this.state.start('Clouds');
	},
	
};
