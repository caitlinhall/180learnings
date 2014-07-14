
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		maxTomatoes : 5,
		currentTomatoes : 0
	},

	// Run on page load.
	"onload" : function () {

		me.state.set(me.state.LOADING, new game.CustomLoadingScreen());

		// Initialize the video.
		if (!me.video.init("screen", 640, 480, true, 'auto')) {
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

		// Initialize the audio.
		me.audio.init("mp3,ogg");

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);

	    // debug
	    me.debug.renderHitBox = true;

	},

	// Run on game resources loaded.
	"loaded" : function () {

		// show the title/menu screen
		// me.state.set(me.state.MENU, new game.TitleScreen());

		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", game.PlayerEntity);

		// add tomato enemy
		me.entityPool.add("EnemyEntity", game.EnemyEntity);

		// the dynamic tomato entity
		me.entityPool.add("tomato", game.TomatoEntity, true);

		// the dynamic tomato entity
		me.entityPool.add("tomatoGenerator", game.TomatoGeneratorEntity, true);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.SPACE, "jump", true);

		// start the game
		me.state.change(me.state.PLAY);
	}


};

// create a custom loading screen
game.CustomLoadingScreen = me.ScreenObject.extend({
	// constructor
	init: function()
	{
	   // pass true to the parent constructor
	   // as we draw our progress bar in the draw function
	   this.parent(true);
	   // a font logo
	   this.logo = new me.Font('century gothic', 32, 'white');
	   // flag to know if we need to refresh the display
	   this.invalidate = false;
	   // load progress in percent
	   this.loadPercent = 0;
	   // setup a callback
	   me.loader.onProgress = this.onProgressUpdate.bind(this);

	},

	// will be fired by the loader each time a resource is loaded
	onProgressUpdate: function(progress)
	{
	   this.loadPercent = progress;
	   this.invalidate = true;
	},


	// make sure the screen is only refreshed on load progress
	update: function()
	{
	   if (this.invalidate===true)
	   {
	      // clear the flag
	      this.invalidate = false;
	      // and return true
	      return true;
	   }
	   // else return false
	   return false;
	},

	// on destroy event
	onDestroyEvent : function ()
	{
	   // "nullify" all fonts
	   this.logo = null;
	},

	//	draw function
	draw : function(context)
	{
	   // clear the screen
	   me.video.clearSurface (context, "black");

	   // measure the logo size
	   logo_width = this.logo.measureText(context,"awesome loading screen").width;

	   // draw our text somewhere in the middle
	   this.logo.draw(context,
	                  "awesome loading screen",
	                  ((me.video.getWidth() - logo_width) / 2),
	                  (me.video.getHeight() + 60) / 2);

	   // display a progressive loading bar
	   var width = Math.floor(this.loadPercent * me.video.getWidth());

	   // draw the progress bar
	   context.strokeStyle = "silver";
	   context.strokeRect(0, (me.video.getHeight() / 2) + 40, me.video.getWidth(), 6);
	   context.fillStyle = "#89b002";
	   context.fillRect(2, (me.video.getHeight() / 2) + 42, width-4, 2);
	},
});