
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

                } else {
                    // let's flicker in case we touched an enemy
                    if(!this.renderable.flickering){
                        this.renderable.flicker(45);
                        this.health--;
                        console.log(this.health);
                        if(this.health <= 0){
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

    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {

        // hits from above hurt the tomato,
        if (this.alive && res.x == 0 && res.y > 0 && obj.falling){

            // give some score
            game.data.score += 250;

            this.collidable = false;
            this.alive = false;
            this.renderable.flicker(45, function(){
                // remove it
                me.game.remove(this);
            });
        }

    },

    // manage the enemy movement
    update: function() {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;

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
        // if(!x){
        //     x=0;
        // }
        // if(!y){
        //     y=0;
        // }
        // console.log("settings", settings);
        // console.log(!settings);
        if(!settings){
            settings = {};
        }

        // define this here instead of tiled
        settings.image = "animation-tomato";
        // settings.spritewidth = 74;
        // settings.spriteheight = 80;

        // // call the parent constructor
        // this.parent(x, y, settings);


    // ---------------------------------
        //x
        // if(!x){

        // }

        // enemy entity settings
        // var settings = {};
        // settings.image = me.loader.getImage("animationimation-tomato");
        settings.spritewidth = 74;
        settings.spriteheight = 80;
        settings.type = me.game.ENEMY_OBJECT;

        // call parent constructor
        this.parent(x, y, settings);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;

        // make him start from the right
        // this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;

        // adjust the bounding box
        // this.updateColRect(8, 48, -1, 0);

        // make it a enemy object
        // this.type = me.game.ENEMY_OBJECT;

        // init variables
        this.gravity = 0;
        this.alwaysUpdate = true;


        // movement strategy
        this.movementStrategy = 2;

        // set the default horizontal speed (accel vector)
        // this.setVelocity(2.5, 0);
        // this.anchorPoint.set(0.0, 0.0);

        // enable collision
        // this.collidable = true;

        // make him start from the right
        // this.pos.x = x + settings.width - settings.spritewidth;
        // this.walkLeft = true;

        // walking & jumping speed
        // this.setVelocity(4, 6);

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