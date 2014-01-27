define([
	'underscore',
	'backbone',
	'q',
	'text!templates/signup/pageTwo.html'
	], function(_, Backbone, Q, template){
		
		var PageView = Backbone.View.extend({
			className: 'container page', 
			initialize: function( opts ) {
				this.parent = opts.parent;
				this.base = opts.base;
			},
			render: function(){
				return this;
			},
			validates: function() {
				var dfd = Q.defer();
				dfd.resolve();				
				return dfd.promise;
			}
		});
	return PageView;
});