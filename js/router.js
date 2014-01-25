define([
	'config',
	'jquery',
	'underscore',
	'backbone',
	'stackmob',
	'q',
	'base'
], function(config,$, _, Backbone, StackMob, Q, Base){
	var base = new Base();
	
	var getLoggedInUser = function() {
		var dfd = Q.defer();
		StackMob.getLoggedInUser({
		  	success: function(username) {
		  		if ( !username ) {
		  			dfd.reject(null);
		  		} else {
		  			dfd.resolve(username);	
		  		}
		  	}, error: function(err) {
		  		dfd.reject(err);
		  	}
		});
		return dfd.promise;
	}
	var getUser = function(username) {
		var dfd = Q.defer();
		console.log('1');
		var depth = 3;
		(new StackMob.User({ username: username })).fetchExpanded(depth, {
			success: function(user, result, options) {
				console.log('2');
				
				dfd.resolve(user, result, options);
				
			},
			error: function(err) {
				dfd.reject(err);
			}
		});

		return dfd.promise;
	}
	
	var checkUser = function() {
		var dfd = Q.defer();

		getLoggedInUser().then(function(username){
			getUser(username).then(function(user){
				base.state.set('user',user);

				dfd.reject(2);

			}).fail(function(err){
				console.log('err',err);
			});
		}).fail(function(err){
			if ( err ) {
				console.log('err',err);
			} else {
				// we're not logged in
				base.state.set('user',null);
				dfd.reject(1);
			}
		})


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
		return dfd.promise;
	};

	var AppRouter = Backbone.Router.extend({
		routes: {
			"signup/:page" : function(params) {
				checkUser().then(base.index).fail(function(page){

					base.router.navigate('signup/'+page);
					base.signup(page);
				});
				
			},
			"":function(params){
				checkUser().then(base.index).fail(function(page){
					base.router.navigate('signup/'+page,{ trigger : true });
				});
			},
			"*actions":function(params){
				base.fourohfour();
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