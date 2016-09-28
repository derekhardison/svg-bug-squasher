co.hardison.flyswat.Ant = co.hardison.flyswat.Bug.extend( {
	playerSVG : 'svg/ant.svg',
	points : 10,
	moveTime : 3000,

	onLoad : function () {
		var context = this;

		co.hardison.flyswat.Bug.prototype.onLoad.apply( this, arguments );

		// SVG adjustments (random start position, scale).
		this.rotate( 90, 0 );
		this.start();
		this.trigger( 'ready', { view : this } );
	}
} );
