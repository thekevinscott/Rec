define([
	'config',
	'underscore',
	'backbone',
	'q',
], function(config, _, Backbone, Q){

	var Model = Backbone.Model.extend({
		root: 'http://localhost:1337',
		url: function() {
			return this.root+'/'+this.name;
		},
		initialize: function() {
			
		}	
	});

	return Model;
});