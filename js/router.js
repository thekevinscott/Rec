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
		} else if ( !user.authenticated() ) {
			dfd.reject({ msg: 'Session expired, must login', code: config.constants.STATE.LOGIN, user: user });
		} else if ( !user.get('sports') || !user.get('sports').models ) {
			dfd.reject({ msg: 'User must select sports', code: config.constants.STATE.SPORTS, user: user });
		} else if ( !user.get('locations') || !user.get('locations').models ) {
			dfd.reject({ msg: 'User must select location', code: config.constants.STATE.LOCATIONS, user: user });
		} else if ( !user.get('availability') ) {
			dfd.reject({ msg: 'User must select availability', code: config.constants.STATE.AVAILABILITY, user: user });
		} else {
			dfd.resolve(user);
		}

		return dfd.promise;
	}
	// var getUser = function(username) {
	// 	var dfd = Q.defer();
	// 	// console.log('1');
	// 	var depth = 3;
	// 	return;

	// 	(new StackMob.User({ username: username })).fetchExpanded(depth, {
	// 		success: function(user, result, options) {
	// 			console.log('2');
				
	// 			dfd.resolve(user, result, options);
				
	// 		},
	// 		error: function(err) {

	// 			dfd.reject(err);
	// 		}
	// 	});

	// 	return dfd.promise;
	// }
	
	// var checkUser = function() {
	// 	var dfd = Q.defer();

	// 	getUser().then(function(user){
	// 		dfd.resolve(user);
	// 	}).fail(function(state){
	// 		// if getUser fails, the user is either uncreated
	// 		// which will result in a state of 0,
	// 		// or the user will have some information filled out,
	// 		// in which case that will be mapped to a state
	// 		dfd.reject(state);
	// 	});



		// getLoggedInUser().then(function(username){
		// 	getUser(username).then(function(user){
		// 		base.state.set('user',user);

		// 		dfd.reject(2);

		// 	}).fail(function(err){
		// 		// either the service failed or the user got deleted
		// 		console.log('err',err);
		// 		dfd.reject(1);
		// 	});
		// }).fail(function(err){
		// 	if ( err ) {
		// 		console.log('err',err);
		// 	} else {
		// 		// we're not logged in
		// 		base.state.set('user',null);
		// 		dfd.reject(1);
		// 	}
		// })


		// var currentUser = Parse.User.current();

		// if ( !currentUser || currentUser.authenticated() === false ) {
		// 	dfd.reject(1);
		// } else {
		// 	if ( !currentUser.get('sports') || !currentUser.get('sports').length ) {
		// 		dfd.reject(2);
		// 	} else if ( !currentUser.get('location') || !currentUser.get('location').length ) {
		// 		dfd.reject(4);
		// 	} else if ( !currentUser.get('availability') ) {
		// 		dfd.reject(5);
		// 	}
		// 	dfd.resolve();
		// }
	// 	return dfd.promise;
	// };

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