/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* LICENSE: https://oss.ninja/mit
* CREATOR: http://www.jjwallace.info/
*/

class NavBar {
  constructor(scope) {
		this.toggle = false;
		this.poly;
		this.graphics;
		this.menuWidth = 200;
    this.scope = scope;
		this.gameWidth = scope.game.width;

		//Define the menu polygon
		this.pol = {
			xtl: scope.game.width,
			ytl: 0,
			xtr: scope.game.width + this.menuWidth,
			ytr: 0,

			xbl: scope.game.width,
			ybl: scope.game.height,
			xbr: scope.game.width + this.menuWidth,
			ybr: scope.game.height,
		}

		//Make the polygon
		this.poly = new Phaser.Polygon([
			new Phaser.Point(this.pol.xtl, this.pol.ytl),
			new Phaser.Point(this.pol.xtr, this.pol.ytr),
			new Phaser.Point(this.pol.xbr, this.pol.ybr),
			new Phaser.Point(this.pol.xbl, this.pol.ybl)
		]);

		//Convert the polygon into a graphic element
		this.graphics = scope.game.add.graphics(0, 0);

		this.graphics.beginFill(0xFFFFFF);
		this.graphics.drawPolygon(this.poly.points);
		this.graphics.alpha = 0.9;
		this.graphics.endFill();
		
		function menuClick(){
			this.toggleNavbar(scope);
		}
		
		this.imgMenu = scope.add.sprite(this.gameWidth, 0, 'menu');
		this.imgMenu.anchor.set(1,0);
		this.imgMenu.inputEnabled = true;
		this.imgMenu.events.onInputDown.add(menuClick, this);

		//Turn graphics into menu
		this.menuBackground = scope.game.add.sprite(this.menuWidth, 0);
		this.menuBackground.addChild(this.graphics);
		this.menuBackground.inputEnabled = true;
		this.menuBackground.events.onInputDown.add(this.clickOnGraphics, this);

		//Introduce yourself -Navbar
		console.log('Hello! -Navbar');

	}

	clickOnGraphics(){
		this.toggleNavbar(this.scope)
	}

	toggleNavbar(scope){

		if(this.toggle == false){
			this.toggle = true;
      console.log('Open!');
			scope.add.tween(this.menuBackground).to({ x: -this.menuWidth, y: 0 }, 200, Phaser.Easing.Linear.In, true);
			this.scope.game.add.tween(this.imgMenu).to({ x: this.gameWidth-200, y: 0 }, 200, Phaser.Easing.Back.Out, true);
		}else{
			this.toggle = false;
      console.log('Close!');
			scope.add.tween(this.menuBackground).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.In, true);
			this.scope.game.add.tween(this.imgMenu).to({ x: this.gameWidth, y: 0 }, 300, Phaser.Easing.Back.Out, true);
		}
	}

	// class CreatItem {
	// 	constructor() {
	// 		var imgMenu = this.add.sprite(this.game.width, 0, img);
	// 		item.anchor.set(0.5,0);
	// 		item.inputEnabled = true;
	// 		item.events.onInputDown.add(clickMe, this);
	// 	}
  //
	// 	function clickMe(){
	// 		game.state.start(state);
	// 	}
	// }
}
