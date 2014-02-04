define([
	'config',
	'underscore',
	'backbone',
	'q',
], function(config, _, Backbone, Q){

	var Collection = Backbone.Collection.extend({
		root: 'http://localhost:1337',
		url: function() {
			return this.root+'/'+this.name;
		},
		initialize: function() {
			debugger;
		}	
	});

	return Collection;
});