/**
* @author Jesse Jay Wallace <jjaywallace@gmail.com>
* @overview
* LICENSE: https://oss.ninja/mit
* CREATOR: http://www.jjwallace.info/
*/

class NavBar {
  constructor(scope) {
		this.toggle = false;

		//********************************************//
		//OPTIONS AND MODIFICATIONS
		//MENU ITEMS HERE - FEEL FREE TO ADD MORE

		this.JSON = {
					menu: [
						{state: 'Clouds', img: 'item1', animated: true, 
						 	type: 'state', url: 'test'},
						{state: 'Main', img: 'item2', animated: true, 
						 	type: 'state',url: 'test2'},
						{state: 'Clouds', img: 'item3', animated: true, 
						 	type: 'state',url: 'test3'},
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

		this.imgMenu = scope.add.sprite(this.gameWidth, 0, 'menu');
		this.imgMenu.anchor.set(1,0);
		this.imgMenu.inputEnabled = true;
		this.imgMenu.events.onInputDown.add(menuClick, this);

		//Turn graphics into menu
		this.menuBackground = scope.game.add.sprite(this.menuWidth, 0);
		this.menuBackground.addChild(this.graphics);
		this.menuBackground.inputEnabled = true;
		this.menuBackground.events.onInputDown.add(this.clickOnGraphics, this);

//		//PRELOAD
//		this.menuPreload();//.then(console.log('Hello! -Navbar'));
//    scope.game.load.onLoadStart.add(this.loadStart, scope);
//    scope.game.load.onFileComplete.add(this.fileComplete, scope);
//    scope.game.load.onLoadComplete.add(this.loadComplete, scope);

		//INTRODUCE YOURSELF -Navbar
    console.log('HELLO! - NavBar');
		console.log(this.JSON.menu);
		
		this.addMenuItems(scope, this);
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
					console.log(this.state);
					scope.state.start(this.state);
				}else{
					console.log(this.myUrl);
					window.open(this.myUrl, "_blank");
				}
				
				//scope.state.start(this.JSON.menu[i].state);
				//window.open(this.myUrl, "_blank");
			}
		}
	}

  loadStart() {
  	console.log('LOADING....');
  }

	//PRELOAD NAVBAR MENU ITEMS (animated spritesheet or just img);
	menuPreload() {
		console.log('HELLO PRELOAD!');
		for (var i = 0; i < this.JSON.menu.length; i++) {
			if(this.JSON.menu[i].animated == true){
				this.scope.load.atlas(
					this.JSON.menu[i].img,
					'assets/sprite/' + this.JSON.menu[i].img+ '.png', 'assets/sprite/' + this.JSON.menu[i].img+ '.json',
					Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
				);
			}else{
				this.scope.game.load.image(
					this.JSON.menu[i].img, 'assets/sprite/' + this.JSON.menu[i].img+ '.png'
				);
			}
		}
	}

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    	console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
      var makeMenuItem = (scope, i, img, state) => {
        console.log('Create Menu Item: ', i, img, state)

        this.item = scope.add.sprite(this.gameWidth + this.menuWidth / 2, 40 + i * 140, img);
        this.item.anchor.set(0.5,0);
        this.item.inputEnabled = true;
        this.item.events.onInputDown.add(clickMe, this);
        this.menuBackground.addChild(this.item);

        function clickMe(){
          scope.state.start(state);
        }
      }
      var i = 0;
      var state = 'Clouds';
      makeMenuItem(scope, i, cacheKey, state);
  }

  loadComplete() {
  	console.log("Loaded All Menu Items");
  }

  // ********************* PRELOAD END ********************* //


	//TOGGLE NAVBAR : BUTTON : FUNCTION
	clickOnGraphics(){
		this.toggleNavbar(this.scope)
	}

	//TOGGLE ON / OFF NAVBAR WITH ANIMATIONS
	toggleNavbar(scope){
		if(this.toggle == false){
			this.toggle = true;
      console.log('* OPEN NAVBAR!');
			scope.add.tween(this.menuBackground).to({ x: -this.menuWidth, y: 0 }, 200, Phaser.Easing.Linear.In, true);
			this.scope.game.add.tween(this.imgMenu).to({ x: this.gameWidth-200, y: 0 }, 200, Phaser.Easing.Back.Out, true);
		}else{
			this.toggle = false;
      console.log('* CLOSE NAVBAR!');
			scope.add.tween(this.menuBackground).to({ x: 0, y: 0 }, 100, Phaser.Easing.Linear.In, true);
			this.scope.game.add.tween(this.imgMenu).to({ x: this.gameWidth, y: 0 }, 300, Phaser.Easing.Back.Out, true);
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
