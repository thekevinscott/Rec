define([
	'underscore',
	'backbone',
	'q',
	'lib/api/extensions',
	'models/sport'
], function(_, Backbone, Q, API, SportModel) {
	// debugger;
	console.log('sports collection');
	var SportsCollection = API.Collection.extend({
		name: 'sports',
		model: SportModel,
		url: function() {
			return this.root+'/'+this.name;
		},
		initialize: function() {
			
		}	
	});
	return SportsCollection;
});