define([
	'underscore',
	'backbone',
	'q',
	'views/signup/page',
	'collections/locations',
	'text!templates/signup/pageFour.html',
	'text!templates/signup/location.html'
	], function(_, Backbone, Q, PageView, LocationsCollection, template, locationTemplate){
		
		var PageFourView = PageView.extend({
			className: 'container page pageFour', 
			initialize: function() {
				this.constructor.__super__.initialize.apply(this, arguments);
				
				this.locations = new LocationsCollection();
				this.locations.fetch({
					success: function(results) {

						this.renderLocations();
					}.bind(this), error: function(err) {
						console.log('error',err);
					}
				});
			},
			render: function(){
				
				this.$el.html(_.template( template ));
				this.$locations = this.$('.locations');

				
				return this;
			},
			renderLocations: function() {

				var user = this.base.state.get('user');
				

				// var userLocations = user.get('locations');
				debugger;
				_.each(this.locations.models, function(location){
					var selected = _.find(user.get('locations').models, function(obj){ 
						
						return ( obj.get('title') === location.get('title') ); 
					} ) ? true : false;

					$location = $(_.template( locationTemplate, _.extend(location.attributes,{ 
						slug: location.slug(), 
						selected: selected
					})));
					this.$locations.append($location);
					
					$location.click(function(e){

						this.clickLocation(e, location);
					}.bind(this));

				}.bind(this));
			},
			clickLocation: function(e, location) {
				var input;
				if ( e.target.tagName !== 'INPUT' ) {
					if ( e.target.tagName !== 'LI' ) {
						var li = $(e.target).parent('li');	
					} else {
						var li = $(e.target);
					}
					
					input = $(li.find('input'));

					input.prop('checked', !input.prop('checked') );
				} else {
					var li = this;
				}

				input = li.find('input');
				var val = ( input.val() === 'on' ) ? 1 : 0 ;

				
				var user = this.base.state.get('user');
				debugger;
				if ( val ) {
					user.get('locations').add([ location ]);
				} else {
					user.get('locations').remove(location);
				}
				// debugger;
				user.save();


			}
		});
	return PageFourView;
});