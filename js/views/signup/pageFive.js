define([
	'underscore',
	'backbone',
	'q',
	'views/signup/page',
	'text!templates/signup/pageFive.html',
	], function(_, Backbone, Q, PageView, template){
		
		var PageFiveView = PageView.extend({
			className: 'container page pageFive', 
			events: {
				'keyup textarea' : 'keyup'
			},
			initialize: function() {
				this.constructor.__super__.initialize.apply(this, arguments);
				
			},
			render: function(){
				
				this.$el.html(_.template( template ));
				this.$textarea = this.$('textarea');
				return this;
			},
			validates: function(){
				var dfd = Q.defer();
				
				if ( ! this.$textarea.val() ) {
					dfd.reject('You gotta fill out the text field, dude. Come on.');
				} else {

					this.save().then(function(data){
						dfd.resolve(data);
					}.bind(this)).fail(function(data){
						alert('dunno what happened here');
					});
				}

				return dfd.promise;
			},
			keyup: function() {
				if ( this.timeout ) { clearTimeout(this.timeout); }
				this.timeout = setTimeout(this.save.bind(this), 300);
			},
			save: function() {
				console.log('save');
				var dfd = new Q.defer();
				var user = this.base.state.get('user');
				user.set('availability', this.$textarea.val());
				user.save().then(function(data){
					dfd.resolve(data);
				}.bind(this)).fail(function(data){
					alert('dunno what happened here');
					console.log('fail save',data);
				})

				return dfd.promise;
			}
		});
	return PageFiveView;
});