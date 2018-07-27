/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* LICENSE: https://oss.ninja/mit
* CREATOR: http://www.jjwallace.info/
*/

class NavBar{
	
	
	
  constructor(scope) {
		
		this.toggle = false;

		//********************************************//
		//OPTIONS AND MODIFICATIONS
		//MENU ITEMS HERE - FEEL FREE TO ADD MORE

		this.JSON = {
					menu: [
						{state: 'Main', img: 'octoMan', animated: true, 
						 	type: 'state', url: 'test3'},
						{state: 'Clouds', img: 'item1', animated: true, 
						 	type: 'state', url: 'test'},
						{state: 'ReelPreloader', img: 'item2', animated: true, 
						 	type: 'state', url: 'test2'},
						{state: 'Clouds', img: 'item3', animated: true, 
						 	type: 'state', url: 'test3'},
					],
					style: {
						width: 200,
						backgroundColor: 0xFFFFFF,
						animated: false
					},
				}

		//********************************************//

		this.menuWidth = this.JSON.style.width;
		this.navbarBackgroundColor = this.JSON.style.backgroundColor;

		this.poly;
		this.graphics;
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

		this.graphics.beginFill(this.navbarBackgroundColor);
		this.graphics.drawPolygon(this.poly.points);
		this.graphics.alpha = 0.9;
		this.graphics.endFill();

		function menuClick(){
			this.toggleNavbar(scope);
		}

		this.imgMenu = scope.add.sprite(this.gameWidth - 9, 0, 'menu');
		this.imgMenu.anchor.set(1,0);
		this.imgMenu.inputEnabled = true;
		this.imgMenu.events.onInputDown.add(menuClick, this);

		//Turn graphics into menu
		this.menuBackground = scope.game.add.sprite(this.menuWidth, 0);
		this.menuBackground.addChild(this.graphics);
		this.menuBackground.inputEnabled = true;
		this.menuBackground.events.onInputDown.add(this.toggleNavbar, this);

		
		//INTRODUCE YOURSELF -Navbar
    console.log('HELLO! - NavBar');
		console.log(this.JSON.menu);
		
		this.swipControls(scope, this);
		
		this.addMenuItems(scope, this);
	}
	
	swipControls(scope, state){
		var tapXStart = 0;
		var tapXEnd = 0;
		//Define how close to right edge to toggle open navbar
		//This prevents interference in with tap in game
		var edgeSensitivity = 20;

		function tapDown(){
			tapXStart = scope.input.x;
		}

		function tapUp(){
			tapXEnd = scope.input.x;
			if(tapXEnd > tapXStart + 50){
				if(state.toggle == true){
					state.toggleNavbar();
				}
				
			}else if(tapXEnd < tapXStart - edgeSensitivity){
				if(tapXStart > state.gameWidth - edgeSensitivity){
					state.toggleNavbar();
				}
			}
		}

		scope.input.onDown.add(tapDown, this);
		scope.input.onUp.add(tapUp, this);
	}
	
	addMenuItems(scope, state){
		for (var i = 0; i < this.JSON.menu.length; i++) {
			this.item = scope.add.sprite(this.gameWidth + this.menuWidth / 2, 60 + i * 160, this.JSON.menu[i].img);
			this.item.anchor.set(0.5,0);
			this.item.animations.add('default');
			this.item.animations.play('default', 30, true);
			
			this.item.inputEnabled = true;
			this.item.events.onInputDown.add(clickMe, this.item);
			this.menuBackground.addChild(this.item);
			
			this.item.myUrl = state.JSON.menu[i].url;
			this.item.state = state.JSON.menu[i].state;
			this.item.type = state.JSON.menu[i].type;

			function clickMe(){
				if(this.type == 'state'){
					//console.log(this.state);
					scope.state.start(this.state);
				}else{
					//console.log(this.myUrl);
					window.open(this.myUrl, "_blank");
				}
			}
		}
	}

	//TOGGLE NAVBAR : BUTTON : FUNCTION
	toggleNavbar(){
		this.scope.world.bringToTop(this.menuBackground);
		console.log(this.imgMenu);
		this.toggleNavbarInternal(this.scope)
	}

	//TOGGLE ON / OFF NAVBAR WITH ANIMATIONS
	toggleNavbarInternal(scope){
		if(this.toggle == false){
			this.toggle = true;
      console.log('* OPEN NAVBAR!');
			scope.add.tween(this.menuBackground).to({ x: -this.menuWidth, y: 0 }, 200, Phaser.Easing.Linear.In, true);
			this.scope.game.add.tween(this.imgMenu).to({ x: this.gameWidth-200, y: 0 }, 200, Phaser.Easing.Back.Out, true);
		}else{
			this.toggle = false;
      console.log('* CLOSE NAVBAR!');
			scope.add.tween(this.menuBackground).to({ x: 0, y: 0 }, 100, Phaser.Easing.Linear.In, true);
			this.scope.game.add.tween(this.imgMenu).to({ x: this.gameWidth - 9, y: 0 }, 300, Phaser.Easing.Back.Out, true);
		}
	}

	//CREATE A MENU ITEM
	menuItem(scope, i, img, state) {
		console.log('Create Menu Item: ', i, img, state)
		this.item = scope.add.sprite(this.gameWidth + this.menuWidth / 2, 40 + i * 140, img);
		this.item.anchor.set(0.5,0);
		this.item.inputEnabled = true;
		this.item.events.onInputDown.add(clickMe, this);

		this.menuBackground.addChild(this.item);

	 	function clickMe(){
			this.scope.state.start(state);
	 	}
	}
}