define([
	'backbone',
	'api',
], function(Backbone, API){
	// debugger;
	var SportModel = Backbone.Model.extend({
		slug: function() {
			console.log('this',this);
			return this.get('title').toLowerCase().replace(' ','-');
		}
	});
	return SportModel;
});

