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
		stackmob: 'lib/stackmob-js-0.9.2-bundled-min',
		facebook: '//connect.facebook.net/en_US/all',

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
		'stackmob': {
			deps: ['jquery', 'facebook'],
			exports: 'StackMob'
		}

	}
});

require(['stackmob','facebook', 'config'], function(StackMob, FB, config) {
	// debugger;

	StackMob.init({
	    publicKey: "26ed40e3-c897-4c21-b252-e8878e812e33",
	    apiVersion: 0
	});

	FB.init(config.facebook);

});
require([
	'fastclick',
	'jquery',
	'router',
	
], function(Fastclick,$,Router){
	
	console.log('Hello, you.');


	// The "app" dependency is passed in as "App"
	// App.initialize();
	$(function() {
		FastClick.attach(document.body);
	});
	Router.initialize();
});