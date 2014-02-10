define(['config','backbone'],function(config,Backbone){

	return function() {
		// debugger;
		console.log('extensions');
		var root = config.app.root;
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