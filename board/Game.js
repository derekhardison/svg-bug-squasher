co.hardison.flyswat.Game = Backbone.Model.extend( {
	defaults : function () {
		var defaults = {
				score : 0,
				highScores : co.hardison.flyswat.Application.getItem( 'high-scores' ),

				bugAddDelay : 3000,

				state : 'intro',

				level : 1, /* display user level */
				difficulty : 1, /* modifier for baseline difficulty */
				levelUpDelay : 10000    /* every 10 seconds level up */
			};

		if ( !defaults.highScores ) {
			// initialize high scores for the first time
			defaults.highScores = [
				{ name : 'Sarah', score : 150 },
				{ name : 'Ken', score : 100 },
				{ name : 'Liz', score : 200 },
				{ name : 'Sam', score : 130 },
				{ name : 'Harold', score : 180 },
				{ name : 'Cyndi', score : 360 },
				{ name : 'Dillan', score : 20 },
				{ name : 'Boopert', score : 400 },
				{ name : 'Phil', score : 320 },
				{ name : 'Paul', score : 90 }
			];

			// store in memory.
			co.hardison.flyswat.Application.setItem( 'high-scores', defaults.highScores );
		}

		return defaults;
	},

	/**
	 * Save model to memory.
	 */
	save : function () {
		co.hardison.flyswat.Application.setItem( 'high-scores', this.get( 'highScores' ) );
	},

	initialize : function () {
		// game difficulty is based on time.
		_.delay( $.proxy( this._startHelper, this ), this.get( 'levelUpDelay' ) );
	},

	/**
	 * Restart the game settings.
	 */
	restart : function () {
		this.set( {
			score : 0,
			level : 1,
			difficulty : 1
		} );
	},

	/**
	 * Used to level up the game every so often.
	 *
	 * @private
	 */
	_startHelper : function () {
		_.delay( $.proxy( this._startHelper, this ), this.get( 'levelUpDelay' ) );

		if ( this.isPlaying() ) {
			// level up.
			this.levelUp();
		}
	},

	/**
	 * Level up the game (make it harder).
	 */
	levelUp : function () {
		if ( this.get( 'level' ) >= 15 ) {
			// hardest level (uhhhh).
			return;
		}

		// update game settings.
		this.set( {
			difficulty : this.get( 'difficulty' ) - 0.1,
			level : this.get( 'level' ) + 1
		} );
	},

	/**
	 * @returns {boolean} True if the game is in motion (playing, not intro).
	 */
	isPlaying : function () {
		return this.get( 'state' ) === co.hardison.flyswat.Game.STATE.PLAY;
	},

	/**
	 * @returns {boolean} True if the game is in intro mode.
	 */
	isIntro : function () {
		return this.get( 'state' ) === co.hardison.flyswat.Game.STATE.INTRO;
	},

	/**
	 * @returns {boolean} True if the game is paused.
	 */
	isPaused : function () {
		return this.get( 'state' ) === co.hardison.flyswat.Game.STATE.PAUSE;
	},

	/**
	 * @returns {boolean} True if the game is over.
	 */
	isGameOver : function () {
		return this.get( 'state' ) === co.hardison.flyswat.Game.STATE.GAME_OVER;
	},

	/**
	 * Function to increment score.
	 *
	 * @param points {int} Number of points to increment.
	 */
	score : function ( points ) {
		this.set( 'score', this.get( 'score' ) + ( points * this.get( 'level' ) ) );
	},

	/**
	 * @return {float} Returns some increment to increase the difficulty of the game.
	 */
	difficulty : function () {
		return this.get( 'difficulty' );
	}
}, {
	STATE : {
		INTRO : 'intro',
		PLAY : 'play',
		PAUSE : 'pause',
		GAME_OVER : 'game-over'
	}
} );
