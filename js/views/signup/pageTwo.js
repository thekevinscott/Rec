define([
	'underscore',
	'backbone',
	'q',
	'collections/sports',
	'views/signup/page',
	'text!templates/signup/pageTwo.html',
	'text!templates/signup/sport/li.html'
	], function(_, Backbone, Q, SportsCollection, PageView, template, sportTemplate){
		
		var PageTwoView = PageView.extend({
			className: 'container page pageTwo', 
			initialize: function() {
				this.constructor.__super__.initialize.apply(this, arguments);
				// console.log('page two');
				this.sports = new SportsCollection();
				this.sports.fetch({
					success: function(results) {
						this.renderSports();
					}.bind(this), error: function(err) {
						console.log('error',err);
					}
				});

			},
			// WTF, WHY ??????
			sportTemplate: sportTemplate,
			render: function(){
				
				this.$el.html(_.template( template ));
				this.$sports = this.$('.sports');
				
				
				return this;
			},
			renderSports: function() {
				var user = this.base.state.get('user');
				// debugger;
				// console.log('user sports', user.get('sports'));
				// var userSports;

				// var userSports = user.get('sports');
				_.each(this.sports.models, function(sport) {
					
					var selected = _.find(user.get('sports').models, function(obj){ 
						
						return ( obj.get('title') === sport.get('title') ); 
					} ) ? true : false;

					var props = {
						sport: _.extend(sport.attributes,{ 
							slug: sport.slug(), 
							selected: selected
						})
					};

					//_.findWhere(publicServicePulitzers, {newsroom: "The New York Times"});

					var $sport = $(_.template( this.sportTemplate, props));

					this.$sports.append( $sport );
					$sport.click(function(e){
						this.clickSport(sport,e);
					}.bind(this));

				}.bind(this));
			},
			validates: function(){
				var dfd = Q.defer();
				
				var inputs = this.$('input:checked');
				if ( ! inputs.length ) {
					dfd.reject('You must select at least one sport, dude. Come on.');
				} else {
					dfd.resolve();	
				}
				

				return dfd.promise;
			},
			error: function(err) {

				alert(err);
			},
			clickSport: function(sport,e) {
				
				e.preventDefault();
				var el = e.target;
				if ( el.tagName !== 'LI' ) {
					el = $(el).parent('li')[0];
				}
				var input = $(el).find('input');
				
				// console.log('to change to',!input.prop('checked'));
				var val = !input.prop('checked');
				input.prop('checked', val );


				

				var callbacks = {
					success: function( user, result, options ){
						// debugger;
						// this.base.state.set('user',user);
						// console.debug(user.toJSON());
						console.log('success',arguments);
						// debugger;
					}.bind(this),
					error: function(resp) {
						e.preventDefault();
						this.error(resp.error);
					}.bind(this)
				};


				var user = this.base.state.get('user');
				


				
				if ( val ) {
					user.get('sports').add([ sport ]);
				} else {
					user.get('sports').remove(sport);
					// user.deleteAndSave('sport', [sport.get('sport_id')], StackMob.SOFT_DELETE, callbacks);
				}
				// debugger;
				user.save();
				
			}
		});
	return PageTwoView;
});