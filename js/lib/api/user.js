define([
	'config',
	'underscore',
	'backbone',
	'q',
], function(config, _, Backbone, Q){

	var User = Backbone.Model.extend({
		url: function() {
			
			return 'http://localhost:1337/users/create';
		},
		initialize: function( params ) {
			
			this.set('access_token',params.access_token);
			
		},
		save: function() {
			var dfd = Q.defer();
			dfd.reject();
			debugger;
			return dfd.promise;
		}
	});

	return User;
});