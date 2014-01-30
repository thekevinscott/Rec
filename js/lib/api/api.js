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
	'lib/api/user'
], function(config, _, Backbone, Q, UserModel){

	return function() {
		var root = 'http://localhost:1337';
		
		var getUser = function() {
			return null;
		};
		
		return {
			getUser : getUser,
			User : UserModel,
			Model : Backbone.Model,
			Collection : Backbone.Collection
		}
	}();

});