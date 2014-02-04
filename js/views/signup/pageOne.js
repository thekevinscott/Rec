define([
	'underscore',
	'backbone',
	'facebook',
	'api',
	'views/signup/page',
	'text!templates/signup/pageOne.html'
	], function(_, Backbone, FB, API, PageView, pageOneTemplate){

	var PageOneView = PageView.extend({
		events: {
			"click .facebook" : "facebook"
		},
		className: 'container page pageOne',
		
		initialize: function() {
			
			this.constructor.__super__.initialize.apply(this, arguments);

		},
		render: function(){

			this.$el.html(_.template( pageOneTemplate ));
			this.$dynamicContent = this.$('.dynamic-content');
			this.$facebookButton = this.$('.facebook');
			return this;
		},

		facebook: function() {
			this.$dynamicContent.html('Loading');
			var timeout = 5000; // 5 seconds

			var timer = setTimeout(function(){
				this.error({ error: 'Timeout error' });
			}.bind(this),timeout);

			FB.login(function(response) {
				clearTimeout(timer);
				if (response.authResponse) {

					var user = new API.User({ access_token: response.authResponse.accessToken });
					var view = this;

					// debugger;
					user.save(null,{
						success: function(model, response, options) {
							view.base.state.set('user',user);
							view.parent.next();
						},
						error: function(model, xhr, options) {
							console.log('err',arguments);
						}
					})
					// user.save().then(function(response){
					// 	// console.log('success a', response.attributes);
					// 	user.set('token',response.attributes.token);
					// 	view.base.state.set('user', user);
					// 	view.parent.next();
					// }).fail(function(err){

					// 	console.log('err',err);
					// });





					// this.base.state.set('user',new StackMob.User());

					// FB.api('/me', function(resp){
					// 	// debugger;
					// 	var keys = ['first_name','last_name','gender','birthday','location','username','timezone'];
					// 	_.each(keys, function(key) {
					// 		attb[key] = resp[key];
					// 	}.bind(this));
					// 	attb.sports = [];

					// 	// this.base.state.set('user', new StackMob.User(attb));
					// 	var user = new StackMob.User({ username : 'bill waterson',  password: 'weirdosfromanotherplanet', first_name: 'test' });
					// 	user.loginWithFacebookAutoCreate(accessToken, true);
					// 	user.save({ first_name: 'tet' });
					// 	debugger;
					// 	// this.base.state.get('user').loginWithFacebookAutoCreate(accessToken, true); //true, stay logged in.
						
					// 	this.parent.next();

					// 	// this.base.state.get('user').save();
					// }.bind(this));

				} else {
					this.error(response);
				}
			}.bind(this), {scope: 'email'});	
			

		},
		error: function() {
			console.log('err',arguments);
			this.$dynamicContent.html("Looks like there was some error with logging in to Facebook; could you try again?");
			this.$dynamicContent.append(this.$facebookButton);
		}
	});
	return PageOneView;
});