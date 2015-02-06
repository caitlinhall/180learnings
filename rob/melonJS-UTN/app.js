var HTML5App = window.HTML5App = {};//Ember.Application.create();

HTML5App.test = function(){
	console.log("test!");
};

window.onload = function() {

	// -------------------------------------
	//
	// Create variables
	//
	//

	var jump = false;

	// Create Game with parameters: width, height, scale
	var game = new Game(640, 480, 1);

	// Load Resources with parameters: resource, width, height
	var sprite = game.sprite.load('media/sprite_sheet.png', 16, 31);

	// Load Map with parameters: resource (Map is done with 'tiled' using XML layer format; Map is composed for 2 layers; one of them is set with property collidable as true)
	var map = game.tilemap.load('img/underwater3.json');

    // // Load text using size and font
    // var text = game.text('12px Angies New House');

	var bgMusic = new Howl({
		urls: ['sound/song.mp3'],
		autoplay: false,
		loop: true,
		volume: 0.5,
		onend: function() {
			console.log('played bgMusic!');
		}
	});
	var soundJump = new Howl({
		urls: ['sound/jump.mp3'],
		autoplay: false,
		loop: false,
		volume: 0.5,
		onend: function() {
			console.log('played soundJump!');
		}
	});

    // var soundJump = game.audio.load(['sound/jump.mp3']);

	//-----

	// Enable Keyboard
	game.input.enable('keyboard');

	// Set Game's Friction on X axis. Friction is measured between 0 (not friction) and 1 (full friction)
    game.physics.friction.x = .5;

    // Set Game's Gravity on Y axis. Gravity is measured in pixels per frame
    game.physics.gravity.y = 9.78 / 60;

    // Set Game's boundaries
	game.boundaries.x = 0;
	game.boundaries.width = game.canvas.width;

	// Set TileMap
	game.tilemap.set(map);

	// Set Game Camera to Follow Sprite
	game.camera.attach(sprite);

	// Start Game
	game.start();


	// -------------------------------------
	//
	// Init method will be executed only once
	//
	//
	this.init = function() {
		// Change Sprite's Anchor Point (this is the point by which the sprite will be drawn)
        sprite.anchor.x = sprite.frame.width / 2;
        sprite.anchor.y = sprite.frame.height / 2;

		// Set Sprite's Position
		sprite.position.x = game.canvas.width / 2;
		sprite.position.y = game.canvas.height / 2;

		// Set Sprite's Maximun Speed per frame on X axis. By default 100
        sprite.speed.max.x = 2;

		// Add animations with parameters: animation's name used to identify the animation, frames used for this animation, frames per second that it will be shown each animation's frame
		sprite.animation.add('idle', [0], 10);
		sprite.animation.add('walk', [0, 1, 2, 1], 10);
		sprite.animation.add('jump', [3], 10);

		// Run animation with parameters: name of animation
		sprite.animation.run('idle');

		// Set Sprite's Alpha
        // sprite.alpha = 0.5;

        // // Set Text Position
        // text.x = game.canvas.width / 2;
        // text.y = game.canvas.height / 2;
        // // Set Text Color
        // text.color = '#666666';
        // // Set Text align
        // text.align = 'center';
        // // Set Text baseline
        // text.baseline = 'middle';
        // // Set Text alpha
        // text.alpha = 0.5;
        // // Set Text title
        // text.title = 'Molecule - HTML5 Game Framework';

        //Play bgMusic
        bgMusic.play();


        HTML5App.game = game;
        HTML5App.sprite = sprite;
        HTML5App.map = map;

        console.log(HTML5App.game);
	};


	// -------------------------------------
	//
	// Update method will be executed once each frame
	//
	//
	this.update = function() {
		// Check if Space key has been pressed
		if(game.input.key.SPACE && !jump) {
			jump = true;
			sprite.acceleration.y = -3;
	        soundJump.play();
		} else if(!game.input.key.SPACE && sprite.speed.y === 0) {
			jump = false;
	        soundJump.stop();
		}

		// Check if Right Arrow has been pressed
		if(game.input.key.RIGHT_ARROW) {
			// Unflip Sprite on X axis
			sprite.flip.x = false;
			sprite.acceleration.x = 1;
		// Check if Left Arrow has been pressed
		} else if(game.input.key.LEFT_ARROW) {
			// Flip Sprite on X axis
			sprite.flip.x = true;
			sprite.acceleration.x = -1;
		}


		//todo: camera scrolling isn't working
		//experiment: parallax the ground...
		// HTML5App.map.layer[0].scroll.x = sprite.acceleration.x * -1;


		// Check Sprite's speed to choose animation
		if(sprite.speed.y < 0) {
			sprite.animation.run('jump');
		} else if(sprite.speed.y > 0) {
			sprite.animation.run('idle');
		} else if(sprite.acceleration.x != 0) {
			sprite.animation.run('walk');
		} else {
			sprite.animation.run('idle');
		}

		// Check if Sprite is clicked with Left Mouse Button
        if(sprite.isClicked(game.input.mouse.BUTTON_LEFT)) {
            alert('Sprite clicked');
        }

        if(game.input.key.P) {
        	if(bgMusic.pos() > 0 && bgMusic.volume() > 0){
				bgMusic.pause();
				bgMusic.volume(0);
        	}else{
				bgMusic.volume(0.5);
				bgMusic.play();
        	}
        }
        if(game.input.key.S) {
            bgMusic.stop();
        }
        if(game.input.key.A) {
            // Play bgMusic Looped
            bgMusic.play();
        }

	};


};
