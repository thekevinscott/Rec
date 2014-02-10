define([
	'config',
	'jquery',
	'underscore',
	'backbone',
	'api',
	'q',
	'base'
], function(config,$, _, Backbone, API, Q, Base){
	
	var base = new Base();
	
	// var getLoggedInUser = function() {
	// 	var dfd = Q.defer();
	// 	StackMob.getLoggedInUser({
	// 	  	success: function(username) {
	// 	  		if ( !username ) {
	// 	  			dfd.reject(null);
	// 	  		} else {
	// 	  			dfd.resolve(username);	
	// 	  		}
	// 	  	}, error: function(err) {
	// 	  		dfd.reject(err);
	// 	  	}
	// 	});
	// 	return dfd.promise;
	// }
	var getUser = function(username) {
		var dfd = Q.defer();
		
		var user = API.getUser();
		
		// we have no user
		if ( !user ) {
			dfd.reject({ msg: 'Must register', code: config.constants.STATE.REGISTER, user: user });
		// we have a user but they have been logged out 
		} else {
			user.authenticated().then(function(response){
				user.set('access_token',response.authResponse.accessToken);
				if ( !user.get('sports') || !user.get('sports').models ) {
					dfd.reject({ msg: 'User must select sports', code: config.constants.STATE.SPORTS, user: user });
				} else if ( !user.get('locations') || !user.get('locations').models ) {
					dfd.reject({ msg: 'User must select location', code: config.constants.STATE.LOCATIONS, user: user });
				} else if ( !user.get('availability') ) {
					dfd.reject({ msg: 'User must select availability', code: config.constants.STATE.AVAILABILITY, user: user });
				} else {
					dfd.resolve(user);
				}
			}.bind(this)).fail(function(){
				dfd.reject({ msg: 'Session expired, must login', code: config.constants.STATE.LOGIN, user: user });
			}.bind(this));
		}

		return dfd.promise;
	}

	var AppRouter = Backbone.Router.extend({
		routes: {
			"signup/:page" : function(params) {
				
				getUser().then(function(user){
					// debugger;
					// base.route('index',user);
					base.router.navigate('/',{ trigger : true });
				}).fail(function(state){
					// console.log('base route signup');
					// base.router.navigate('signup/'+state.page);
					base.route('signup',state);
				});
				
			},
			"":function(params){
				getUser().then(function(user){
					base.route('index',user);
				}).fail(function(state){
					base.route('signup',state);
				});
			},
			"*actions":function(params){
				base.route('fourohfour')();
			},
		}
	});

	var initialize = function(){
		var app_router = new AppRouter();
		base.router = app_router;
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});