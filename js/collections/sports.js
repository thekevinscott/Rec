define([
	'underscore',
	'stackmob',
	'q',
	'models/sport'
], function(_, StackMob, Q, SportModel){
	
	var SportsCollection = StackMob.Collection.extend({
		model: SportModel
	});
	return SportsCollection;
});