define([
	'config',
	'underscore',
	'backbone',
	'q',
	'collections/sports',
	'collections/locations',
], function(config, _, Backbone, Q, SportsCollection, LocationsCollection){

	var User = Backbone.Model.extend({
		url: function() {
			
			return 'http://localhost:1337/users/create';
		},
		initialize: function( params ) {

			this.set('sports', new SportsCollection(( params || {}).sports ));
			this.set('locations', new LocationsCollection(( params || {}).locations ));

			// debugger;
			if ( params && params.access_token ) {
				this.set('access_token',params.access_token);	
			}
			
			this.listenTo(this,'change',function(){
				if ( localStorage ) {
					localStorage['rec-user'] = JSON.stringify(this.attributes);
					localStorage['rec-user-saved'] = new Date();
				}
			}.bind(this));
		},
		authenticated : function() {
			var expiration = 60*60*24*7; // a week
			// expiration = 1;
			if ( localStorage && localStorage['rec-user-saved'] ) {
				var saved = new Date(localStorage['rec-user-saved']);
				if ( (new Date()).getTime() - saved.getTime() < expiration*1000) {
					return true;
				}
			}
			return false;
		},
		save: function(attrs, opts) {
			var dfd = new Q.defer();
			if ( !attrs ) { attrs = {}; }
			
			// attrs.sports = [];
			// _.each(this.attributes.sports.models,function(sport) {
			// 	debugger;
			// 	attrs.sports.push(sport.get('id'));
			// });
			Backbone.Model.prototype.save.call(this, attrs, {
				success: function(model) {
					// debugger;
					if ( model && model.attributes.error && model.attributes.error.code === 190 ) {
						// Backbone.history.navigate('/signup/1',true);
						alert('you must login in again');
					} else {
						// model.set('sports', new SportsCollection(model.get('sports')));

						// model.set('locations', new LocationsCollection(model.get('locations')));
						dfd.resolve(model);	
					}
				},
				error: function(data) {
					dfd.reject(data);
				}
			});

			return dfd.promise;
		}
	});

	return User;
});