
/*-------------------
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({

    /* -----

    constructor

    ------ */

    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(4, 20);

        this.collidable = true;

        this.health = 3;

        // adjust the bounding box
        // this.updateColRect(8, 48, -1, 0);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);



    },

    startBreathing: function() {

        var scaleAjdust = 1.2;
        var tween2 = new me.Tween(this.renderable.scale).to({x:scaleAjdust,y:scaleAjdust}, 2000); //.onComplete(myFunc);
        tween2.yoyo();
        tween2.start();

    },

    /* -----

    update the player pos

    ------ */
    update: function() {

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.jumping = true;
                me.audio.play("sfx-jump1");
            }

        }

        // check & update player movement
        this.updateMovement();

        // check for collision
        var res = this.collide();//me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                // check if we jumped on it
                if ((res.y > 0) && ! this.jumping) {
                    // bounce (force jump)
                    this.falling = false;
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;
                    me.audio.play("sfx-jump1");

                } else {
                    // let's flicker in case we touched an enemy
                    if(!this.renderable.flickering){
                        this.renderable.flicker(45);
                        this.health--;
                        console.log(this.health);
                        me.audio.play("sfx-hurt1");
                        if(this.health <= 0){
                            me.audio.play("sfx-hurt2");
                            //todo:
                            console.log("game over");
                            this.alive = false;
                        }

                    }
                }
            }
        }

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;




    }

});




/* --------------------------
an enemy Entity
------------------------ */
game.EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        if(!settings){
            settings = {};
        }
        // define this here instead of tiled
        settings.image = "animation-tomato";
        settings.spritewidth = 74;
        settings.spriteheight = 80;

        // call the parent constructor
        this.parent(x, y, settings);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;

        // adjust the bounding box
        this.updateColRect(8, 48, -1, 0);

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        game.data.currentTomatoes++;

    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {

        // hits from above hurt the tomato,
        if (this.alive && res.x == 0 && res.y > 0 && obj.falling){

            me.audio.play("sfx-squish1");

            // give some score
            game.data.score += 250;

            this.collidable = false;
            this.alive = false;
            this.renderable.flicker(45, function(){
                // remove it
                me.game.remove(this);
                game.data.currentTomatoes--;
            });
        }

    },

    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport){
            return false;
        }

        if (this.alive) {

            // console.log("tomato Y", this.pos.y);
            // console.log("tomato vel.y", this.vel.y);


            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

        } else {
            this.vel.x = 0;
        }

        // check and update movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});





/* --------------------------
an enemy Entity
------------------------ */
game.TomatoEntity = me.ObjectEntity.extend({
    // className:"tomato",
    init: function(x, y, settings) {

        if(!settings){
            settings = {};
        }

        // define this here instead of tiled
        settings.image = "animation-tomato";
        settings.spritewidth = 74;
        settings.spriteheight = 80;
        settings.type = me.game.ENEMY_OBJECT;

        // call parent constructor
        this.parent(x, y, settings);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;

        // make him start from the right
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;

        // adjust the bounding box
        this.updateColRect(8, 48, -1, 0);

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        // init variables
        this.gravity = 1;
        this.alwaysUpdate = true;

        // movement strategy
        this.movementStrategy = 2;

        // set the default horizontal speed (accel vector)
        this.setVelocity(2, 2);
        // this.anchorPoint.set(0.0, 0.0);

        this.z = me.game.world.children.length;

        game.data.currentTomatoes++;

    },

    startProceduralAnimation: function(){

        // add a tween to change the object pos.y variable to 200 in 3 seconds
        var tween = new me.Tween(this.renderable).to({angle: 5}, 2000); //.onComplete(myFunc);
        tween.yoyo();
        tween.start();

        var scaleAjdust = this.renderable.scale.x + 0.5;
        var tween2 = new me.Tween(this.renderable.scale).to({x:scaleAjdust }, 2000); //.onComplete(myFunc);
        tween2.yoyo();
        tween2.start();

        this.renderable.alpha = 0.0;
        var tween3 = new me.Tween(this.renderable).to({alpha:1.0 }, 1000); //.onComplete(myFunc);
        tween3.start();

        // this.renderable.alpha
    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {

        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.renderable.flicker(45, function(){
                // remove it
                me.game.remove(this);
                game.data.currentTomatoes--;
            });
        }

        // give some score
        game.data.score += 250;

        // make sure it cannot be collected "again"
        this.collidable = false;

    },

    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;

        if (this.alive) {

            if(this.movementStrategy == 1){
                // movement strategy: wide wandering, whole level
                if (this.walkLeft && this.pos.x <= this.startX) {
                    this.walkLeft = false;
                } else if (!this.walkLeft && this.pos.x >= this.endX) {
                    this.walkLeft = true;
                }
            }else if(this.movementStrategy == 2){
                // movement strategy: follow player
                if(game.player.pos.x > this.pos.x){
                    //move right
                    this.walkLeft = false;
                }else{
                    //move left
                    this.walkLeft = true;
                }
            }

            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

        } else {
            this.vel.x = 0;
        }

        // check and update movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});






/* --------------------------
an enemy Generator
------------------------ */
game.TomatoGeneratorEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        if(!x){
            x=0;
        }
        if(!y){
            y=0;
        }

        if(!settings){
            settings = {};
        }

        // call parent constructor
        this.parent(x, y, settings);

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        // init variables
        this.alwaysUpdate = true;

        this.maxTomatoes = 10;
        this.tomatoRate = 2000;
        this.previousTime = me.timer.getTime();

        this.superTomato = 4.0
        this.bigTomato = 2.0
        this.regularTomato = 1.0
        this.tinyTomato = 0.5

    },

    // manage the enemy list
    update: function() {
        if(game.data.currentTomatoes < this.maxTomatoes && me.timer.getTime()-this.previousTime > this.tomatoRate){

            // remember when this was generated
            this.previousTime = me.timer.getTime();

            // add a tomato when needed...
            var x = Math.floor((Math.random() * (me.video.getWidth()-1)) + 1);
            var y = Math.floor((Math.random() * (me.video.getHeight()-1)) + 1);

            var tomatomon = new me.entityPool.newInstanceOf("tomato", x, y);

            // random tomato adjustment
            var d1 = Math.floor((Math.random()*(10-1))+1);
            var d2 = Math.floor((Math.random()*(10-1))+1);
            var d3 = Math.floor((Math.random()*(10-1))+1);
            var total = d1 + d2 + d3;
            var tomatoSize = this.regularTomato;

            if(total>26){
                tomatoSize = this.superTomato;
                tomatomon.setVelocity(1, 1);
            }else if(total > 20){
                tomatoSize = this.bigTomato;
                tomatomon.setVelocity(2, 1);
            }else if(total < 10){
                tomatoSize = this.tinyTomato;
                tomatomon.setVelocity(4, 3);
            }

            // adjust the tomato size
            tomatomon.renderable.resize(tomatoSize);
            tomatomon.tomatoSize = tomatoSize;

            tomatomon.startProceduralAnimation();

            // add the tomato to the game world
            me.game.world.addChild(tomatomon, 1);
        }
    }
});