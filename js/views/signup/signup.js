define([
	'underscore',
	'backbone',
	'q',
	'config',
	'views/signup/header',
	'views/signup/pageOne',
	'views/signup/pageTwo',
	'views/signup/pageThree',
	'views/signup/pageFour',
	'text!templates/signup/index.html'
	], function(_, Backbone, Q, config, HeaderView, 
		PageOneView, PageTwoView, PageThreeView, PageFourView, template){

		var SignupView = Backbone.View.extend({
			className: 'signup',
			STATE: config.constants.STATE,
			initialize: function( opts ) {

				this.base = opts.base;

				this.pages = {
					1 : PageOneView,
					2 : PageTwoView,
					3 : PageThreeView,
					4 : PageFourView,
					5 : 'pageFive',
					6 : 'pageSix'
				};
				this.route( opts.state );
			},
			route: function(state) {
				var page;

				switch(state.code) {
					case this.STATE.LOGIN :
						page = 1;
					break;
					case this.STATE.SPORTS :
						page = 2;
					break;
					case this.STATE.LOCATIONS :
						page = 4;
					break;
					case this.STATE.AVAILABILITY :
						page = 5;
					break;
					default: // register
						page = 1;
					break;
				}

				this.render(page);
			},
			setPageNumber: function(pageNum) {
				if ( parseInt(pageNum) ) {
					this.currentPage = parseInt(pageNum);
				}
			},
			render: function(page){

				if ( ! this.$compiledTemplate ) {
					this.$compiledTemplate = _.template( template );
					this.$el.html( this.$compiledTemplate );
					this.$pages = this.$('.pages');	
				}

				if ( this.currentPageView ) {
					this.currentPageView.remove();
				}

				if ( page ) {
					this.setPageNumber(page);	
				}

				if ( this.pages[this.currentPage] ) {
					this.renderPage(this.pages[this.currentPage]);
					this.base.router.navigate('signup/'+this.currentPage,{trigger: false});
				} else {
					console.log("err", "That page does not exist");
				}
				
				return this;
			},

			renderPage: function(view) {

				if ( !this.$headerView ) {
					this.$headerView = new HeaderView({ parent: this });
					this.$el.prepend(this.$headerView.render().el);
				}
				
				this.currentPageView = new view({ parent: this, base: this.base });
				this.$pages.append(this.currentPageView.render().el);

			},


			next: function() {
				var dfd = Q.defer();

				
				this.currentPageView.validates().then(function(){					

					this.currentPage++;
					this.render(this.currentPage);
					dfd.resolve();
				}.bind(this)).fail(function(err){
					alert(err);
					dfd.reject();
				});

				// var nextPage = 
				
				return dfd.promise;
			},
			previous: function() {
				this.parent.previous().then(function(){
					debugger;
				});
			}
		});
	return SignupView;
});