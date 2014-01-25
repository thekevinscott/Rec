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
        signup: function(params) {
            this.render();

            
            if ( !this.signupView ) {
                this.signupView = new signupView({ base: this });
            }
            
            this.$application.html(this.signupView.render(params).el);
        },
        index: function() {
            this.render();
        },
        fourohfour: function() {
            this.render();
        }
    });
    return App;
});