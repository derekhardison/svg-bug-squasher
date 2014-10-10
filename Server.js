/**
 * Simple HTTP server to serve the game.
 */

var connect = require( 'connect' ),
	serveStatic = require( 'serve-static' );

connect().use( serveStatic( __dirname ) ).listen( 8080 );
