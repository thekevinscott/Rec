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
					this.base.state.set('user',new StackMob.User());

					FB.api('/me', function(response){
						// debugger;
						var keys = ['first_name','last_name','gender','birthday','location','username','timezone'];
						_.each(keys, function(key) {
							this.base.state.get('user').set(key, response[key]);
						}.bind(this));
						this.base.state.get('user').set('sports',[]);
						
						this.base.state.get('user').loginWithFacebookAutoCreate(accessToken, true); //true, stay logged in.
						
						var attb = this.base.state.get('user').attributes;
						
						var user = new StackMob.User( { 
							username: attb.username, 
							first_name: attb.first_name,
							last_name: attb.last_name,
							gender: attb.gender,
							birthday: attb.birthday,
							// location: attb.location,
							timezone: attb.timezone,
							link: attb.link
						});
						user.save();

						this.parent.next();

						// this.base.state.get('user').save();
					}.bind(this));

				} else {
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