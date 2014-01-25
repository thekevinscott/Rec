// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'app'
], function($, _, Backbone, App){

    var app = new App();
  	var AppRouter = Backbone.Router.extend({
	  	routes: {
			// "demo/:demo_id":  	function(params){ app.demo(params);},
			"":     			function(params){ app.index();},
			"*actions" : 		function(params){ app.fourohfour();},
	  	}
  	});


	var initialize = function(){
		var app_router = new AppRouter;
        app.router = app_router;

		Backbone.history.start();
  	};
  	return {
    	initialize: initialize
  	};
});