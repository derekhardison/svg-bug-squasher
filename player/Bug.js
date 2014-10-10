co.hardison.flyswat.Bug = co.hardison.flyswat.Player.extend( {
	points : -1,

	rotateTime : 500,
	moveTime : 3000,

	running : true,

	initialize : function () {
		co.hardison.flyswat.Player.prototype.initialize.apply( this, arguments );
		this.listenTo( this.model, 'change:state', this.onStateChange );
	},

	/**
	 * Called after the fly SVG image is loaded.
	 *
	 * @param fragment DOM element containing the SVG element.
	 */
	onLoad : function ( fragment ) {
		co.hardison.flyswat.Player.prototype.onLoad.apply( this, arguments );

		// place in random spot on board at the beginning and listen for squash
		this.move( 0, this.ry(), 0 );
	},

	/**
	 * Start bug movement.
	 */
	onStateChange : function () {
		if ( this.model.isPlaying() ) {
			// start the game
			this.start();
		} else {
			// stop the animation.
			this.stop();
		}
	},

	/**
	 * @returns {int} Random x coordinate.
	 */
	rx : function () {
		return _.random( 0, $( this.snap.node ).width() );
	},

	/**
	 * @returns {int} Random y coordinate.
	 */
	ry : function () {
		return _.random( 0, $( this.snap.node ).height() - this.bb().height - 150 );
	},

	/**
	 * Move the fly towards the specified coordinates and make callback
	 * if set.
	 *
	 * @param x Coordinate to move player towards.
	 * @param y Coordinate to move player towards.
	 * @param callback Callback function after the piece is moved (optional).
	 */
	fly : function ( x, y, callback ) {
		var context = this;

		this.rotate( this.matrix.angle( x, y ), this.rotateTime, function () {
			context.move( x, y, context.moveTime * context.model.difficulty(), callback )
		} );
	},

	/**
	 * Override
	 */
	move : function ( x, y, time, callback ) {
		co.hardison.flyswat.Player.prototype.move.apply( this, arguments );

		if ( x > $( this.snap.node ).width() && this.model.isPlaying() && this.running ) {
			// off the board, game over
			this.model.set( 'state', co.hardison.flyswat.Game.STATE.GAME_OVER );
		}
	},

	/**
	 * Stop the infinite fly loop.
	 */
	remove : function () {
		this.running = false;
		co.hardison.flyswat.Player.prototype.remove.apply( this, arguments );
	},

	/**
	 * Start the infinite process of flying the pieces around the SVG container.
	 */
	start : function () {
		var x;

		if ( !this.player || this.model.isPaused() ) {
			// nothing to do.
			return;
		}

		x = this.rx();

		if ( this.model.isPlaying() ) {
			// limit the distance of x move.
			x = this.matrix.get( 'x' ) + 300;
		}

		// start infinite flying process.
		this.fly( x, this.ry(), $.proxy( this.onComplete, this ) );
	},

	/**
	 * Stop the automatic flying.
	 */
	stop : function () {
		// stop animations.
		this.player.stop();

		// store current information in matrix.
		this.move( this.bb().x, this.bb().y, 0 );
	},

	/**
	 * Callback to make the fly move once again.
	 */
	onComplete : function () {
		if ( !this.running || this.model.isPaused() ) {
			// stop running the fly
			return;
		} else if ( _.random( 0, 1 ) ) {
			// change direction immediately.
			this.start();
		} else {
			// sit in position for a short period, then change direction.
			_.delay( $.proxy( this.start, this ), 500 );
		}
	}
} );
