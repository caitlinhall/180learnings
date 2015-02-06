game.resources = [

	/* Graphics.
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */

    // game art
    {name: "water-back-full",  type:"image", src: "data/img/background/water-back-full.png"},
    {name: "water-back",  type:"image", src: "data/img/background/water-back.png"},
    {name: "water-front",  type:"image", src: "data/img/background/water-front.png"},
    {name: "water-front-flipped",  type:"image", src: "data/img/background/water-front-flipped.png"},
    {name: "ground-1",  type:"image", src: "data/img/objects/ground-1.png"},

 	// game font
    {name: "32x32_font", type:"image", src: "data/img/font/32x32_font.png"},

	// the main player spritesheet
    {name: "animation-ninja", type:"image", src: "data/img/actor/animation-ninja.png"},
    {name: "animation-tomato", type:"image", src: "data/img/actor/animation-tomato.png"},

	/* Texture Atlases
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */

	/* Tile Maps
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */

    {name: "area01", type: "tmx", src: "data/img/underwater2.json"},

	/* Background music.
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */

	// bgm:
	{name: "bgm-start", type: "audio", src: "data/bgm/", channel : 1},
	{name: "bgm-game", type: "audio", src: "data/bgm/", channel : 1},
	{name: "bgm-over", type: "audio", src: "data/bgm/", channel : 1},

	/* Sound effects.
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */

	// sfx:
	{name: "sfx-hurt1", type: "audio", src: "data/sfx/", channel : 2},
	{name: "sfx-hurt2", type: "audio", src: "data/sfx/", channel : 2},
	{name: "sfx-point", type: "audio", src: "data/sfx/", channel : 2},
	{name: "sfx-jump1", type: "audio", src: "data/sfx/", channel : 2},
	{name: "sfx-jump2", type: "audio", src: "data/sfx/", channel : 2},
	{name: "sfx-squish1", type: "audio", src: "data/sfx/", channel : 2},
	{name: "sfx-squish2", type: "audio", src: "data/sfx/", channel : 2}
];
