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
		// save: function() {
		// 	var dfd = Q.defer();
			

		// 	$.ajax({
		// 		data: this.attributes,
		// 		error: function(err) {
					
		// 		}
		// 	});
		// 	$.post(this.url(),this.attributes,function(data){

		// 		console.log(data);
		// 	});
		// 	// debugger;
		// 	// Backbone.Model.prototype.save.call(this, {}, {
		// 	// 	success: function(data) {
		// 	// 		// console.log('success',data);
					
		// 	// 		dfd.resolve(data);
		// 	// 	},
		// 	// 	error: function(err) {
		// 	// 		// console.log('err', err);
		// 	// 		dfd.reject(err);
		// 	// 	}
		// 	// });
			
		// 	return dfd.promise;
		// }
	});

	return User;
});