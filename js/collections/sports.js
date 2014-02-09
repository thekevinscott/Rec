define([
	'underscore',
	'backbone',
	'api',
	'q',

	'models/sport'
], function(_, Backbone, API, Q, SportModel){
	
	var SportsCollection = Backbone.Collection.extend({
		name: 'sports',
		model: SportModel,
		root: 'http://localhost:1337',
		url: function() {
			return this.root+'/'+this.name;
		},
		initialize: function() {
			
		}	
	});
	return SportsCollection;
});