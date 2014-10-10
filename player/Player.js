co.hardison.flyswat.Player = Backbone.View.extend( {
	snap : undefined,

	playerSVG : undefined,
	player : undefined,
	matrix : undefined,

	initialize : function ( options ) {
		this.snap = options.snap;
		this.matrix = new co.hardison.flyswat.Transform();
	},

	/**
	 * Render the player SVG
	 *
	 * @returns {co.hardison.flyswat.Player}
	 */
	render : function () {
		Snap.load( this.playerSVG, this.onLoad, this );
		return this;
	},

	/**
	 * Called after the player SVG image is loaded.
	 *
	 * @param fragment DOM element containing the SVG element.
	 */
	onLoad : function ( fragment ) {
		// append the player and give a unique id.
		this.snap.append( fragment );
		$( this.snap.node ).find( 'g:last-child' ).attr( 'id', this.cid );

		// select player and update size.
		this.player = this.snap.select( '#' + this.cid );

		this.matrix.set( {
			cx : this.bb().cx,
			cy : this.bb().cy
		} );
	},

	/**
	 * Cleanup and remove the view.
	 */
	remove : function () {
		Backbone.View.prototype.remove.apply( this, arguments );
		this.player.remove();
	},

	/**
	 * Get the bounding box for the current player.
	 *
	 * @returns {Object} Returns the bounding box of the player.
	 */
	bb : function () {
		return this.player.getBBox();
	},

	/**
	 * Rotate the player to the specified angle (in degrees).
	 *
	 * @param angle {float} Degrees of absolute angle of player.
	 * @param time {float} Transition time for the move.
	 * @param callback {function} Callback to make after the rendering is completed.  Only if time > 0.
	 */
	rotate : function ( angle, time, callback ) {
		this.matrix.rotate( angle, this.bb().cx, this.bb().cy );

		if ( time === 0 ) {
			// no animation
			this.player.transform( this.matrix.toTransformString() );
			return;
		}

		this.player.animate( {
			transform : this.matrix.toTransformString()
		}, time, callback );
	},

	/**
	 * @param scale {float} Scale the image to certain size.
	 * @param time {int} Transition time for the scale.
	 * @param callback {function} Callback function to make after the rendering is completed. Only if time > 0
	 */
	scale : function ( scale, time, callback ) {
		this.matrix.scale( scale );

		if ( time === 0 ) {
			// no animation
			this.player.transform( this.matrix.toTransformString() );
			return;
		}

		this.player.animate( {
			transform : this.matrix.toTransformString()
		}, time, callback );
	},

	/**
	 * Move (translate) the player to the specified coordinates.
	 *
	 * @param x {int} X coordinate to move towards.
	 * @param y {int} Y coordinate to move towards.
	 * @param time {float} Transition time for the move.
	 * @param callback {function} Callback function to make after the rendering is completed. Only if time > 0
	 */
	move : function ( x, y, time, callback ) {
		this.matrix.translate( x, y );

		if ( time === 0 ) {
			// no animation
			this.player.transform( this.matrix.toTransformString() );
			return;
		}

		this.player.animate( {
			transform : this.matrix.toTransformString()
		}, time, callback );
	}
} );
