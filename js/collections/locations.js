
define([
	'underscore',
	'backbone',
	'q',
	'lib/api/extensions',
	'models/location'
], function(_, Backbone, Q, API, LocationModel) {
	// debugger;
	console.log('locations collection');
	var LocationsCollection = API.Collection.extend({
		name: 'location',
		model: LocationModel,
		url: function() {
			return this.root+'/'+this.name;
		},
		initialize: function() {
			
		}	
	});
	return LocationsCollection;
});