define([
    'underscore',
    'backbone',
    'text!templates/application.html'
], function(_, Backbone, applicationTemplate){

    var App = Backbone.View.extend({
        el: 'body',
        initialize: function() {

        },
        render: function(){
            if ( ! this.$compiledTemplate) {
                this.$compiledTemplate = _.template( applicationTemplate );
                this.$el.append( this.$compiledTemplate );
            }
            return this;
        },
        index: function() {
            this.render();
        },
    });
    return App;
});