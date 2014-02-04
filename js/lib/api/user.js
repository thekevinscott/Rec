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
			this.listenTo(this,'change',function(){
				if ( localStorage ) {
					localStorage['rec-user'] = JSON.stringify(this.attributes);
					localStorage['rec-user-saved'] = new Date();
				}
			}.bind(this));
		},
		authenticated : function() {
			var expiration = 60*60*24*7; // a week
			// expiration = 1;
			if ( localStorage && localStorage['rec-user-saved'] ) {
				var saved = new Date(localStorage['rec-user-saved']);
				if ( (new Date()).getTime() - saved.getTime() < expiration*1000) {
					return true;
				}
			}
			return false;
		}
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