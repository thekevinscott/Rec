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
	'lib/api/user',
	'lib/api/collection',
], function(config, _, Backbone, Q, UserModel, Collection){

	return function() {
		var root = 'http://localhost:1337';
		
		var getUser = function() {
			if ( localStorage && localStorage['rec-user'] ) {
				var userAttbs = JSON.parse(localStorage['rec-user']);
				return new UserModel(userAttbs);
			}
			return null;
		};
		
		return {
			getUser : getUser,
			User : UserModel,
			Model : Backbone.Model,
			Collection : Collection
		}
	}();

});