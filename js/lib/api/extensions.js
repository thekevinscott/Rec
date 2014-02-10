define(['backbone'],function(Backbone){
	console.log('extensions');
	return function() {
		var root = 'http://localhost:1337';
		// BackboneUserModel.prototype.root = root;
		Backbone.Model.prototype.root = root;
		Backbone.Collection.prototype.root = root;
		
		return {
			// User : UserModel,
			Model : Backbone.Model,
			Collection : Backbone.Collection
		}
	}();

});