co.hardison.flyswat.GameOver = Backbone.View.extend( {
	el : '#game-over',

	$username : undefined,
	$group : undefined,
	$finalScore : undefined,
	$highScoreGroup : undefined,
	$closeButton : undefined,

	events : {
		'click button.btn-success' : 'onSave',
		'click button.btn-default' : 'onClose'
	},

	initialize : function () {
		this.$username = this.$el.find( 'input.username' );
		this.$group = this.$el.find( 'div.input-group' );
		this.$finalScore = this.$el.find( 'span.final-score' );
		this.$highScoreGroup = this.$el.find( '.high-score' );
		this.$closeButton = this.$el.find( 'button.btn-default' );
	},

	/**
	 * Close the modal
	 *
	 * @param event
	 */
	onClose : function ( event ) {
		this.$el.modal( 'hide' );
	},

	/**
	 * Save the high score to storage.
	 *
	 * @param event
	 */
	onSave : function ( event ) {
		var index;

		if ( !this.$username.val().length ) {
			// user did not enter a name.
			this.$group.addClass( 'has-error' );
			return false;
		}

		// save high score to memory
		index = this.model.get( 'highScores' ).indexOf( this.replaceScore() );
		this.model.get( 'highScores' ).splice( index, 1, {
			name : this.$username.val(),
			score : this.model.get( 'score' )
		} );
		this.model.save();

		// reset and hide modal.
		this.$group.removeClass( 'has-error' );
		this.$el.modal( 'hide' );
	},

	/**
	 * @returns {Object} Return the first high score with
	 */
	replaceScore : function () {
		var scores = this.model.get( 'highScores' ).sort( function ( a, b ) {
			// reverse sort.
			return a.score - b.score;
		} );

		return _.find( scores, function ( record ) {
			return record.score < this.model.get( 'score' );
		}, this );
	},

	render : function () {
		var isHighScore = this.replaceScore();

		// empty anything in the name field.
		this.$username.val( '' );

		// update modal with final score.
		this.$finalScore.html( this.model.get( 'score' ) );

		if ( isHighScore ) {
			// we have the high score!
			this.$highScoreGroup.show();
			this.$closeButton.hide();
		} else {
			// :-(
			this.$highScoreGroup.hide();
			this.$closeButton.show();

		}

		this.$el.modal( {
			show : true,
			backdrop : 'static',
			keyboard : false
		} );

		return this;
	}
} )
