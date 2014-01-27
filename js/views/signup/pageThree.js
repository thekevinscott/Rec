define([
	'underscore',
	'backbone',
	'q',
	'views/signup/page',
	'models/sport',
	'text!templates/signup/pageThree.html',
	'text!templates/signup/sport/tr.html'
	], function(_, Backbone, Q, PageView, SportModel, template, sportTemplate){
		
		var PageThreeView = PageView.extend({
			className: 'container page pageThree', 
			initialize: function() {
				this.constructor.__super__.initialize.apply(this, arguments);
				
			},
			// WTF, WHY ??????
			sportTemplate: sportTemplate,
			render: function(){
				
				this.$el.html(_.template( template ));
				this.$sports = this.$('.sports');
				var user = this.base.state.get('user');
				// debugger;
				var sports = user.get('sport');
				// debugger;
				_.each(sports, function(sport){
					sport = new SportModel(sport);
					var $sport = $(_.template( this.sportTemplate, { 
						sport: { 
							title: sport.get('title'), 
							slug: sport.slug(), 
							competitive: parseInt(sport.competitive)
						}
					}));

					this.$sports.append( $sport );
					$sport.find('input').click(function(e){
						this.clickSport(sport, e);
					}.bind(this));
				}.bind(this));
				
				return this;
			},
			clickSport: function(sport,e) {
				// e.preventDefault();
				// debugger;
				
				sport.competitive = $('input[name="'+e.target.name+'"]:checked').val();

				var user = Parse.User.current();
				var userSports = user.get('sports');
				for (var i=0;i<userSports.length;i++) {
					var userSport = userSports[i];
					if ( userSport.title === sport.title ) {
						user.get('sports')[i] = sport;
					}
				}
				user.save();

			}
		});
	return PageThreeView;
});