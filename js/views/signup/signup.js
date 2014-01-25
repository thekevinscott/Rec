define([
	'underscore',
	'backbone',
	'q',
	'views/signup/header',
	'views/signup/pageOne',
	'views/signup/pageTwo',
	'views/signup/pageThree',
	'views/signup/pageFour',
	'text!templates/signup/pageOne.html'
	], function(_, Backbone, Q, HeaderView, PageOneView, PageTwoView, PageThreeView, PageFourView){

		var SignupView = Backbone.View.extend({
			className: 'pages signup',
			initialize: function( opts ) {
				this.base = opts.base; 

				this.pages = [
					PageOneView,
					PageTwoView,
					PageThreeView,
					PageFourView,
					'pageFive',
					'pageSix'
				];
			},
			render: function(page){
				
				if ( this.currentPageView ) {
					this.currentPageView.remove();
				}

				this.currentPage = parseInt(page)-1;
				if ( this.pages[this.currentPage] ) {
					this.renderPage(this.pages[this.currentPage]);
					Backbone.history.navigate('signup/'+page,{trigger: false});
				}
				return this;
			},
			renderPage: function(view) {
				if ( !this.$headerView ) {
					this.$headerView = new HeaderView({ parent: this });
					this.$el.prepend(this.$headerView.render().el);
				}
				this.currentPageView = new view({ parent: this, base: this.base });
				this.$el.append(this.currentPageView.render().el);
			},
			next: function() {
				var dfd = Q.defer();

				
				this.currentPageView.validates().then(function(){
					
					this.currentPage += 2; // sweet jesus
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