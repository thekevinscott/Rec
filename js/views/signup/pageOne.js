define([
	'underscore',
	'backbone',
	'facebook',
	'views/signup/page',
	'text!templates/signup/pageOne.html'
	], function(_, Backbone, FB, PageView, pageOneTemplate){

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


			FB.login(function(response) {
				if (response.authResponse) {
					
					var accessToken = response.authResponse.accessToken;
					var user = new StackMob.User();

					FB.api('/me', function(response){

						var keys = ['first_name','last_name','gender','birthday','location','link','username','timezone'];
						_.each(keys, function(key) {
							user.set(key, response[key]);
						});
						user.loginWithFacebookAutoCreate(accessToken, true); //true, stay logged in.
						
						this.parent.next();

						// user.save();
					}.bind(this));

				} else {
					debugger;
					this.error(user,error);
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