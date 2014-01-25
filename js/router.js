// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'base'
], function($, _, Backbone, Base){

  var base = new Base();
  var AppRouter = Backbone.Router.extend({
    routes: {
      "":function(params){ base.index();},
      "*actions":function(params){ base.fourohfour();},
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    base.router = app_router;
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});