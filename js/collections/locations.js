define([
	'underscore',
	'backbone',
	'api',
	'q',

	'models/location'
], function(_, Backbone, API, Q, LocationModel){
	
	var LocationsCollection = Backbone.Collection.extend({
		name: 'locations',
		model: LocationModel,
		root: 'http://localhost:1337',
		url: function() {
			return this.root+'/'+this.name;
		},
		initialize: function() {
			
		}	
	});
	return LocationsCollection;
});