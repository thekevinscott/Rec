/*!
 *
 * This is Kevin Scott's custom API, suckas
 *
 */
define([
	'config',
	'underscore',
	'backbone',
	'q',
	'lib/api/extensions',
	'lib/api/user',

], function(config, _, Backbone, Q, apiExtensions, UserModel){
	console.log('api');
	// debugger;
	return function() {
		
		var getUser = function() {
			// return null; // hack for now;
			if ( localStorage && localStorage['rec-user'] ) {
				
				var userAttbs = JSON.parse(localStorage['rec-user']);
				if ( userAttbs && userAttbs.id ) {
					
					var user = new UserModel(userAttbs, { root : root });	
					return user;
				}
				
			}
			return null;
		};

		
		return {
			getUser : getUser,
			User : UserModel,
			Model : apiExtensions.Model,
			Collection : apiExtensions.Collection
		}
	}();

});