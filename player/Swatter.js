co.hardison.flyswat.Swatter = co.hardison.flyswat.Player.extend( {
	playerSVG : 'svg/swatter.svg',

	width : 0,

	initialize : function ( options ) {
		co.hardison.flyswat.Player.prototype.initialize.apply( this, arguments );

		$( window ).mousemove( $.proxy( this.onMove, this ) );
		$( document ).click( $.proxy( this.onSwat, this ) );

		// for debugging via console.
		window.cursor = this;
	},

	/**
	 * Called after the fly SVG image is loaded.
	 *
	 * @param fragment DOM element containing the SVG element.
	 */
	onLoad : function ( fragment ) {
		co.hardison.flyswat.Player.prototype.onLoad.apply( this, arguments );

		// set scale, save width, and then angle (order is important).
		this.scale( 3, 0 );
		this.width = this.bb().width;
		this.rotate( 320, 0 );
	},

	/**
	 * @param bug {Bug} Bug to check bounding box with swatter.
	 * @returns {boolean} True if the bug has been hit, otherwise false.
	 */
	isBBoxIntersect : function( bug ) {
		var yCutoff = bug.bb().y <= ( this.bb().y + ( Math.cos( 45 ) * this.width ) );
		// not perfect, probably need to look into using vectors.
		return Snap.path.isBBoxIntersect( bug.bb(), this.bb() ) && yCutoff;
	},

	/**
	 * @param event
	 */
	onSwat : function ( event ) {
		// trigger a swat.
		this.trigger( 'swat', { view : this } );
	},

	/**
	 * Track the user's mouse cursor across the game.  Replace with fly swatter.
	 *
	 * @param event {MouseEvent} Mouse event.
	 */
	onMove : function ( event ) {
		if ( !this.player ) {
			// not ready
			return;
		}

		this.move( event.clientX + 10, event.clientY - 50, 0 );
	}
} );
