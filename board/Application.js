co.hardison.flyswat.Application = Backbone.View.extend( {
	el : 'body',

	// SVG library.
	snap : undefined,

	// active bugs on the board.
	bugs : [],

	// game views
	header : undefined,
	swatter : undefined,

	initialize : function ( options ) {
		this.count = options.count;
		this.model = new co.hardison.flyswat.Game();

		// connect to the SVG board.
		this.snap = Snap( this.$el.find( 'svg' )[ 0 ] );

		// initialize the mouse swatter
		this.swatter = new co.hardison.flyswat.Swatter( {
			snap : this.snap
		} ).render();

		// initialize the header controller
		this.header = new co.hardison.flyswat.Header( {
			model : this.model
		} );

		// listen for some events
		this.listenTo( this.header, 'new-game', this.onNewGame )
			.listenTo( this.model, 'change:state', this.onStateChange )
            .listenTo( this.swatter, 'swat', this.onSwat );

		$( window ).resize( $.proxy( this.commitSize, this ) );

		// start bug add timer
		_.delay( $.proxy( this._playHelper, this ), this.model.get( 'bugAddDelay' ) );
	},

	/**
	 * Check which bugs were hit.  Update score and remove them.
	 *
	 * @param event
	 */
    onSwat : function ( event ) {
		if ( !this.model.isPlaying() ) {
			// stop here, not playing.
			return;
		}
	
		var remove = _.filter( this.bugs, event.view.isBBoxIntersect, event.view ),
			bug;

		while ( remove && remove.length ) {
			bug = remove.pop();

			// increment score and remove bug.
			this.model.score( bug.points );
			this.removeBug( bug );
		}
    },

	/**
	 * Start a new game.
	 *
	 * @param event
	 */
	onNewGame : function ( event ) {
		this.clear();
		this.model.restart();
		this.play();
	},

	/**
	 * Set the SVG game to the size of the browser window.
	 */
	commitSize : function () {
		this.$el.find( 'svg' ).height( $( window ).height() )
			.width( $( window ).width() );
	},

	/**
	 * Play the game
	 */
	play : function () {
		this.model.set( 'state', co.hardison.flyswat.Game.STATE.PLAY );
	},

	_playHelper : function () {
		var count, i;

		_.delay( $.proxy( this._playHelper, this ), this.model.get( 'bugAddDelay' ) );

		if ( !this.model.isPlaying() ) {
			// stop here, not playing.
			return;
		}

		count = _.random( 1, this.model.get( 'level' ) );

		for ( i = 0; i < count; i++ ) {
			// add some number of bugs to the board.
			this.addBug();
		}
	},

	/**
	 * Pause the game.
	 */
	pause : function () {
		// pause the game
		this.model.set( 'state', co.hardison.flyswat.Game.STATE.PAUSE );
	},

	/**
	 * Called when game state is changed
	 *
	 * @param model {Game} Complete game model.
	 */
	onStateChange : function ( model ) {
		if ( model.previous( 'state' ) === co.hardison.flyswat.Game.STATE.INTRO ) {
			// switch to play mode.  clear all bugs off the table.
			this.clear();
		}

		if ( model.isGameOver() ) {
			// clear board. game is over.
			this.clear();
		}

		if ( model.isPaused() ) {
			// pause the game
			this.pause();
		}

		if ( model.isPlaying() ) {
			// play the game.
			this.play();
		}
	},

	/**
	 * Render the game in intro mode (bugs crawling aimlessly-it's fun).
	 *
	 * @returns {co.hardison.flyswat.Application}
	 */
	render : function () {
		for ( var i = 0; i < this.count && this.bugs.length < this.count; i++ ) {
			// add a bug to the table
			this.addBug();
		}

		this.commitSize();

		return this;
	},

	/**
	 * Pick the bug class to instantiate.  Base this on the level.
	 *
	 * @return {Bug} Returns a bug class to instantiate.
	 */
	pickBug : function () {
		var options = [co.hardison.flyswat.Ant]

		if ( this.model.get( 'level' ) > 3 || this.model.isIntro() ) {
			// add a faster opponent to the mix.
			options.push( co.hardison.flyswat.Fly );
		}

		if ( this.model.get( 'level' ) > 5 || this.model.isIntro() ) {
			// add a faster opponent to the mix.
			options.push( co.hardison.flyswat.Fly2 );
		}

		return options[ _.random( 0, options.length - 1 ) ];
	},

	/**
	 * Add a bug to the game and listen for its swat event.
	 *
	 * @return {Bug} Bug view added.
	 */
	addBug : function () {
		var bug = new ( this.pickBug() )( {
			snap : this.snap,
			model : this.model
		} ).render();

		this.bugs.push( bug );

		return bug;
	},

	/**
	 * Remove the specified bug from the bug list.
	 *
	 * @param bug {Bug} Bug view to remove.
	 */
	removeBug : function ( bug ) {
		var index = this.bugs.indexOf( bug );

		bug.remove();

		if ( index >= 0 ) {
			// rip out of collection.
			this.bugs.splice( index, 1 );
		}
	},

	/**
	 * Remove all bugs from the board.
	 */
	clear : function () {
		while ( this.bugs.length ) {
			// clear all bugs off the board.
			this.removeBug( this.bugs.pop() );
		}
	}
}, {
	/**
	 * Get an item from storage.
	 *
	 * @param key {String} ID value
	 * @returns {Object} Returns the object stored in the DB.
	 */
	getItem : function ( key ) {
		return JSON.parse( localStorage.getItem( key ) );
	},

	/**
	 * Store an item from storage.
	 *
	 * @param key {String} ID value
	 * @param value {Object} Object to store.
	 */
	setItem : function ( key, value ) {
		localStorage.setItem( key, JSON.stringify( value ) );
	}
} );
