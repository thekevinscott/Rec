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

					var selected = _.find(user.get('sport'), function(obj){ return ( obj.title === sport.get('title') ); } ) ? true : false;
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
				}
				dfd.resolve();

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


				var user = this.base.state.get('user');

				var callbacks = {
					success: function( user, result, options ){
						
						// console.debug(user.toJSON());
						console.log('success',arguments);
						// debugger;
					},
					error: function(resp) {
						e.preventDefault();
						this.error(resp.error);
					}.bind(this)
				};

				if ( val ) {

					// sport = this.sports.models[0];

					user.appendAndSave('sport', [sport.get('sport_id')], callbacks);

				} else {
					user.deleteAndSave('sport', [sport.get('sport_id')], StackMob.SOFT_DELETE, callbacks);
				}
				
				
				// // user.addRelationship('chores', [chore1, chore2, chore3], { ..success... });

				// var user = Parse.User.current();
				// if ( !user.get('sports') ) {
				// 	user.set('sports',[]);
				// }

				// if ( val ) {
				// 	user.get('sports').push({ title: sport.get('title'), competitive: 0 });
				// } else {
				// 	// var sports = _.filter(user.get('sports'), function(title) { return (sport.get('title') !== title) } );
				// 	user.set('sports', []);
					
				// }
				// user.save();

			}
		});
	return PageTwoView;
});