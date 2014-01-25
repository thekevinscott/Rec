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
		parse: 'lib/parse-1.2.16'
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
	    }
	}


});