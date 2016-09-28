co.hardison.flyswat.Header = Backbone.View.extend( {
	el : '#navbar',

	$play : undefined,
	$pause : undefined,
	$score : undefined,
	$difficulty : undefined,

	_instructions : undefined,
	_highScores : undefined,

	events : {
		'click a.pause' : 'pause',
		'click a.play' : 'play',
		'click a.instructions' : 'onNavigate'
	},

	initialize : function ( options ) {
		this.$score = this.$el.find( 'span.score' )
			.html( this.model.get( 'score' ) );

		this.$difficulty = this.$el.find( 'span.level' )
			.html( this.model.get( 'level' ) );

		// components
		this.$play = this.$el.find( 'a.play' );
		this.$pause = this.$el.find( 'a.pause' );

		// update values based on game model.
		this.commitProperties();

		// listen
		this.listenTo( this.model, 'change', this.onChange );

		// show introduction
		this.navigate( 'instructions' );
	},

	/**
	 * Trigger an event to start a new game.
	 *
	 * @param event
	 */
	onNewGame : function ( event ) {
		// bubble up
		this.trigger( 'new-game', event );
	},

	/**
	 * Open the user selected modal.
	 *
	 * @param event {MouseEvent}
	 */
	onNavigate : function ( event ) {
		if ( this.model.isPlaying() ) {
			// pause a game that is playing.
			this.model.set( 'state', co.hardison.flyswat.Game.STATE.PAUSE );
		}

		// listen to the new game event
		this.navigate( $( event.currentTarget ).attr( 'data-target' ) );
	},

	/**
	 * @param modal Modal to display
	 * @returns {*} Returns the view rendered or undefined if a view does not match.
	 */
	navigate : function ( modal ) {
		var tmp;

		if ( modal === 'instructions' ) {
			// display the instruction modal
			tmp = this.instructions().render();
			this.listenTo( tmp, 'new-game', this.onNewGame );
			return tmp;
		}

		return undefined;
	},

	/**
	 * Get the instructions view.
	 */
	instructions : function () {
		if ( this._instructions ) {
			// already instantiated.
			return this._instructions;
		}

		// instantiate
		this._instructions = new co.hardison.flyswat.Instructions( {
			model : this.model
		} );

		return this._instructions;
	},

	/**
	 * Get the game over view.
	 */
	gameOver : function () {
		if ( this._gameOver ) {
			// already instantiated.
			return this._gameOver;
		}

		// instantiate
		this._gameOver = new co.hardison.flyswat.GameOver( {
			model : this.model
		} );

		return this._gameOver;
	},

	/**
	 * Game information has been updated
	 *
	 * @param event {event} Change event from game model.
	 */
	onChange : function ( model ) {
		this.commitProperties();

		if ( model.changed.state && this.model.isGameOver() ) {
			// new state is game over. show the game over modal.
			this.gameOver().render();
		}
	},

	/**
	 * Called to update the header with the values from the game model.
	 */
	commitProperties : function () {
		this.$score.html( this.model.get( 'score' ) );
		this.$difficulty.html( this.model.get( 'level' ) );

		if ( this.model.isPlaying() ) {
			this.$play.hide();
			this.$pause.show();
		} else if ( this.model.isPaused() ) {
			this.$play.show();
			this.$pause.hide();
		} else {
			this.$play.hide();
			this.$pause.hide();
		}
	},

	/**
	 * @param event
	 */
	play : function ( event ) {
		this.model.set( 'state', co.hardison.flyswat.Game.STATE.PLAY );
	},

	/**
	 * @param event
	 */
	pause : function ( event ) {
		this.model.set( 'state', co.hardison.flyswat.Game.STATE.PAUSE );
	}
} );
