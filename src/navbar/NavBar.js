/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* LICENSE: https://oss.ninja/mit
* CREATOR: http://www.jjwallace.info/
*/

class NavBar {
	constructor() {
		this.toggle = false;
		this.poly;
		this.graphics;
		this.menuWidth = 200;
		
		//Define the menu polygon
		var pol = {
			xtl: scope.game.width,
			ytl: 0,
			xtr: scope.game.width + menuWidth,
			ytr: 0,

			xbl: scope.game.width,
			ybl: scope.game.height,
			xbr: scope.game.width + menuWidth,
			ybr: scope.game.height,
		}

		//Make the polygon
		poly = new Phaser.Polygon([
			new Phaser.Point(pol.xtl, pol.ytl),
			new Phaser.Point(pol.xtr, pol.ytr),
			new Phaser.Point(pol.xbr, pol.ybr),
			new Phaser.Point(pol.xbl, pol.ybl)
		]);

		//Convert the polygon into a graphic element
		graphics = scope.game.add.graphics(0, 0);

		graphics.beginFill(0xFFFFFF);
		graphics.drawPolygon(poly.points);
		graphics.alpha = 0.9;
		graphics.endFill();

		//Turn graphics into menu
		menuBackground = scope.game.add.sprite(menuWidth, 0);
		menuBackground.addChild(graphics);
		menuBackground.inputEnabled = true;
		menuBackground.events.onInputDown.add(clickOnGraphics, this);

		//Introduce yourself -Navbar
		console.log('Hello! -Navbar');
		
	}

	function clickOnGraphics(){
		console.log('Close!');
		toggle = false;
		scope.add.tween(menuBackground).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.Out, true);
	}
	
	function open(scope){
		console.log('Open!');
		console.log(NavBar.prototype);
		if(this.toggle == true){
			this.toggle = false;
			scope.add.tween(menuBackground).to({ x: -200, y: 0 }, 200, Phaser.Easing.Linear.In, true);
		}else{
			this.toggle = true;
			scope.add.tween(menuBackground).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.In, true);
		}	
	}
	
	function CreatItem(){
		function clickMe(){
			game.state.start(state);
		}

		var imgMenu = this.add.sprite(this.game.width, 0, img);
		item.anchor.set(0.5,0);
		item.inputEnabled = true;
		item.events.onInputDown.add(clickMe, this);
	}
	
}
