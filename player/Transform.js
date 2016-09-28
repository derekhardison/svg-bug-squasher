co.hardison.flyswat.Transform = Backbone.Model.extend( {
	defaults : {
		x : 0,
		y : 0,
		cx : 0,
		cy : 0,

		angle : 0,
		scale : 1
	},

	/**
	 * Rotate the view by the specified angle around the specified point (absolute).
	 *
	 * @param angle {int} Angle in degrees.
	 * @param cx {float} Center x coordinate.
	 * @param cy {float} Center y coordinate.
	 */
	rotate : function ( angle, cx, cy ) {
		this.set( {
			angle : angle
		} );
	},

	/**
	 * Move the view to the specified coordinates (absolute).
	 *
	 * @param x {float} X coordinate.
	 * @param y {float} Y coordinate.
	 */
	translate : function ( x, y ) {
		this.set( {
			x : x,
			y : y
		} );
	},

	/**
	 * Scale the SVG image.  1 is default size of SVG image.
	 *
	 * @param scale {float} Scale number.
	 */
	scale : function ( scale ) {
		this.set( {
			scale : scale
		} )
	},

	/**
	 * Calculate the angle for a destination point.
	 *
	 * @param x Destination coordinate
	 * @param y Destination coordinate
	 * @returns {float} Angle in degrees.
	 */
	angle : function ( x, y ) {
		return -1 * ( Math.atan2( ( this.get( 'x' ) - x ), ( this.get( 'y' ) - y ) ) * 180 / Math.PI );
	},

	/**
	 * @returns {string} Transform string to apply to Snap.animate transform.
	 */
	toTransformString : function () {
		return 'R' + this.get( 'angle' ) + ' ' + this.get( 'cx' ) + ' ' + this.get( 'cy' ) + ' T' + this.get( 'x' ) +
			' ' + this.get( 'y' ) + ' s' + this.get( 'scale' );
	}
} );
