define([
	'underscore',
	'api',
	'q',
	'models/sport'
], function(_, API, Q, SportModel){
	
	var SportsCollection = API.Collection.extend({
		name: 'sports',
		model: SportModel
	});
	return SportsCollection;
});