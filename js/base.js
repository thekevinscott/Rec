define([
    'config',
    'underscore',
    'backbone',
    'views/signup/signup',
    'text!templates/application.html'
], function(config, _, Backbone, signupView, applicationTemplate){

    var App = Backbone.View.extend({
        el: 'body',
        config: config,
        initialize: function() {
            this.state = new Backbone.Model();
        },
        render: function(){
            if ( ! this.$compiledTemplate) {
                this.$compiledTemplate = _.template( applicationTemplate );
                this.$el.append( this.$compiledTemplate );
                this.$application = this.$('.application');
            }
            return this;
        },
        route: function(route, params) {
            
            this.render();
            if ( params.user ) {

                this.state.set('user',params.user);
            }
            this[route](params);
        },
        signup: function(state) {
            if ( !this.signupView ) {
                this.signupView = new signupView( { base: this, state: state });
            }
            this.$application.html(this.signupView.el);
        },
        index: function(params) {
            console.log('here',params);
        },
        fourohfour: function() {
            
        }
    });
    return App;
});