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
parse: 'lib/parse-1.2.16.min'
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

require([
'jquery',
'easing',
'underscore', // lib/underscore/underscore
'backbone',    // lib/backbone/backbone
'fastclick',
'parse',
'router'
], function($,easing,_,Backbone,FastClick,parse,Router){
// The "app" dependency is passed in as "App"
// App.initialize();
$(function() {
FastClick.attach(document.body);
});
	Router.initialize();
});