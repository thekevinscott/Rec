define([
	'api',
], function(API){
	// debugger;
	var SportModel = API.Model.extend({
		schemaName: "Sport",
		slug: function() {
			return this.get('title').toLowerCase().replace(' ','-');
		}
	});
	return SportModel;
});

