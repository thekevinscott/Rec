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
			// debugger;
			this.$dynamicContent.html('Loading');
			// var timeout = 25000; // 25 seconds

			// var timer = setTimeout(function(){
			// 	this.error({ error: 'Timeout error' });
			// }.bind(this),timeout);

			FB.login(function(response) {
				// clearTimeout(timer);
				if (response.authResponse) {

					var user = new API.User({ access_token: response.authResponse.accessToken });
					var view = this;

					// debugger;
					user.save().then(function(model, response, options) {
						// debugger;
						view.base.state.set('user',user);
						view.parent.next();
					}.bind(this)).fail(function(model, xhr, options) {

						alert('There was an error');
						console.log('err',arguments);
					
					});

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