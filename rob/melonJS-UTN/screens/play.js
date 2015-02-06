game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
        // load a level

		me.game.onLevelLoaded = this.onLevelLoaded.bind(this);
        me.levelDirector.loadLevel("area01");

		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		var clouds = new game.ScrollingImage("water-front-flipped", 0.6, 0.3);
		me.game.add(clouds, 1);

		// works
		// // add a tomato when needed...
		// var tomatomon = new me.entityPool.newInstanceOf("tomato", 100, 100);
		// me.game.world.addChild(tomatomon, 1);


		// add a tomato generator
		var tomatogen = new me.entityPool.newInstanceOf("tomatoGenerator", 1, 1);
		me.game.world.addChild(tomatogen, 1);

		me.audio.playTrack("bgm-game");
	},

	onLevelLoaded: function(){
		console.log("ON LEVEL LOADED");
		game.player = me.game.getEntityByName("player")[0];

		game.player.startBreathing();

	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		me.audio.stopTrack();
	}
});


game.ScrollingImage = me.ImageLayer.extend({
    "init" : function (image, scrollX, scrollY) {
        this.scrollX = scrollX;
        this.scrollY = scrollY;

        this.parent(image, 0, 0, image, 1, 1);
    },

    "update" : function () {
        this.pos.x = (this.pos.x + this.scrollX) % this.imagewidth;
        this.pos.y = (this.pos.y + this.scrollY) % this.imageheight;

        return true;
    }
});