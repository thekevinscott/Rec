define([
	'backbone',
	'api',
], function(Backbone, API){
	// debugger;
	var LocationModel = Backbone.Model.extend({
		slug: function() {
			// console.log('this',this);
			return this.get('title').toLowerCase().replace(' ','-');
		}
	});
	return LocationModel;
});

