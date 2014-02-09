define([
	'underscore',
	'backbone',
	'q',
	'text!templates/index.html'
	], function(_, Backbone, Q, template){

		var IndexView = Backbone.View.extend({
			className: 'index',
			initialize: function( opts ) {
				this.base = opts.base;
			},
			render: function(page){
				if ( ! this.$compiledTemplate ) {
					this.$compiledTemplate = _.template( template );
					this.$el.html( this.$compiledTemplate );
				
				}
				
				return this;
			},
		});
	return IndexView;
});