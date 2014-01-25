define([
	'underscore',
	'backbone',
	'text!templates/signup/header.html'
	], function(_, Backbone, template){

		var SignupHeaderView = Backbone.View.extend({
			events: {
				'click .next' : 'next',
				'click .previous' : 'previous'
			},
			initialize: function( options ) {
				this.parent = ( options || {} ).parent;
				this.model = new Backbone.Model({
					page: ( options || {} ).page || 2
				});
				this.listenTo(this.model,'change:page',this.changedPage);
			},
			render: function(){
				this.$el.html(_.template( template ));
				this.$('.previous').hide();
				return this;
			},
			changedPage: function() {
				debugger;
			},
			next: function() {
				
				this.parent.next().then(function(){
				
				});
			},
			previous: function() {
				this.parent.previous().then(function(){
					debugger;
				});
			}
		});
	return SignupHeaderView;
});