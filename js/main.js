require.config({
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		jquery: 'lib/jquery/jquery.min',
		easing: 'lib/jquery-easing/jquery.easing.min',
		underscore: 'lib/underscore/underscore-min',
		backbone: 'lib/backbone/backbone',
		text : 'lib/requirejs-text/text',
		fastclick: 'lib/fastclick/lib/fastclick',
		q: 'lib/q/q',
		// stackmob: 'lib/stackmob-js-0.9.2-bundled-min',
		// facebook: '//connect.facebook.net/en_US/all',
		facebook: 'lib/facebook/all',
		api: 'lib/api/api',
		// apiExtensions : 'lib/api/extensions'
	},
	shim: {
		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"
		},
		"easing": {
			"deps": [ "jquery" ],
			"exports": "easing"
		},
		"underscore": {
			"exports": "_"
		},
		"facebook" : {
			"exports": "FB"
		},
		// "apiExtensions" : {
		// 	"exports": "apiExtensions"
		// }
		/*
		'stackmob': {
			deps: ['jquery', 'facebook'],
			exports: 'StackMob'
		}*/

	}
});

require(['facebook', 'api', 'config'], function(FB, API, config) {
	FB.init(config.facebook);
});

require([
	'fastclick',
	'jquery',
	'router'
	
], function(Fastclick,$,Router){
	
	console.log('Hello, you.');


	// The "app" dependency is passed in as "App"
	// App.initialize();
	$(function() {
		FastClick.attach(document.body);
	});
	Router.initialize();
});