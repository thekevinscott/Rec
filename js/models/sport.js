define([
	'stackmob',
], function(StackMob){
	// debugger;
	var SportModel = StackMob.Model.extend({
		schemaName: "Sport",
		slug: function() {
			return this.get('title').toLowerCase().replace(' ','-');
		}
	});
	return SportModel;
});

