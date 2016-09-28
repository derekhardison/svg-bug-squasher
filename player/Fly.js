co.hardison.flyswat.Fly = co.hardison.flyswat.Bug.extend( {
	playerSVG : 'svg/fly.svg',
	points : 30,
	moveTime: 1500,

	initialize : function ( options ) {
		co.hardison.flyswat.Bug.prototype.initialize.apply( this, arguments );

		// for debugging and running via console.
		window.bug = this;
	},

	onLoad : function () {
		co.hardison.flyswat.Bug.prototype.onLoad.apply( this, arguments );

		// SVG adjustments (random start position, scale).
		this.scale( .6, 0 );
		this.rotate( 90, 0 );
		this.start();
		this.trigger( 'ready', { view : this } );
	}
} );
