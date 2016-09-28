co.hardison.flyswat.Instructions = Backbone.View.extend( {
	el : '#instructions',
	$list : undefined,

	events : {
		'click button.btn-success' : 'onNewGame',
		'click button.btn-default' : 'onClose'
	},

	initialize: function() {
		this.$list = this.$el.find( 'ul.list-group' );
	},

	/**
	 * Gets the sorted list of high scores.
	 *
	 * @returns {array} List of sorted score objects.
	 */
	scores : function () {
		var list = this.model.get( 'highScores' ).sort( function ( a, b ) {
			return b.score - a.score;
		} );

		return list;
	},

	render : function () {
		var html = '',
			sorted = this.scores();

		// display the modal
		this.$el.modal( {
			show : true,
			keyboard : false,
			backdrop : 'static'
		} );

		// populate the high score list.
		_.each( sorted, function ( score ) {
			html += '<li class="list-group-item">' + score.name + ' <span class="badge">' + score.score +
				'</span></li>';
		}, this );

		this.$list.html( html );

		return this;
	},

	onNewGame : function ( event ) {
		// start the game.  this will start the linear (left to right) version of the game.
		this.$el.modal( 'hide' );
		this.trigger( 'new-game', { view : this } );
	},

	onClose : function ( event ) {
		this.$el.modal( 'hide' );
	}
} );
