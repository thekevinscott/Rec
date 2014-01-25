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
		parse: 'lib/parse-1.2.16.min',
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
        "parse": {
		    "deps": ['jquery', 'underscore', 'facebook'],
            "exports": 'Parse'
        }

	}
});

require(['parse','config'], function(Parse,config) {
    Parse.initialize(config.parse.id,config.parse.key);
    Parse.FacebookUtils.init(config.facebook);
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