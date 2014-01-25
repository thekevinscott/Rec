define([
	'underscore',
	'backbone',
	'q',
	'views/signup/page',
	'text!templates/signup/pageFour.html',
	'text!templates/signup/location.html'
	], function(_, Backbone, Q, PageView, template, locationTemplate){
		
		var PageFourView = PageView.extend({
			className: 'container page pageFour', 
			initialize: function() {
				this.constructor.__super__.initialize.apply(this, arguments);
			},
			render: function(){
				
				this.$el.html(_.template( template ));
				this.$locations = this.$('.locations');

				var user = Parse.User.current();
				if ( !user.get('locations') ) {
					user.set('locations',[]);
				}

				var userLocations = user.get('locations');

				_.each(['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'], function(location){
					location = _.extend({ title: location, selected: 0 });
					$location = $(_.template( locationTemplate, { location: location } ));
					this.$locations.append($location);
					
					$location.click(function(e){

						this.clickLocation($location, e);
					}.bind(this));

				}.bind(this));
				
				return this;
			},
			clickLocation: function(location, e) {
				var input;
				if ( e.target.tagName !== 'INPUT' ) {
					if ( e.target.tagName !== 'LI' ) {
						var li = $(e.target).parent('li');	
					} else {
						var li = $(e.target);
					}
					
					input = $(li.find('input'));

					input.prop('checked', !input.prop('checked') );
				}

				input = location.find('input');
				var val = input.val();
				debugger;


			}
		});
	return PageFourView;
});