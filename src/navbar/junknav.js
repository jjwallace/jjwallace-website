async preload() {
   console.log('HELLO ASYNC')

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

  for (var i = 0; i < this.JSON.menu.length; i++) {
    if(this.JSON.menu[i].animated == true){
      await this.scope.load.atlas(
        this.JSON.menu[i].img,
        'assets/sprite/' + this.JSON.menu[i].img+ '.png', 'assets/sprite/' + this.JSON.menu[i].img+ '.json',
        Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
      );
      makeMenuItem(this.scope, i, this.JSON.menu[i].img, this.JSON.menu[i].state);

    }else{
      await this.scope.game.load.image(
        this.JSON.menu[i].img, 'assets/sprite/' + this.JSON.menu[i].img+ '.png'
      );
      makeMenuItem(this.scope, i, this.JSON.menu[i].img, this.JSON.menu[i].state);

    }
  }
}
