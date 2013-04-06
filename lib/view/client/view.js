var _ = require('lodash');

var ClientView = Backbone.View.extend({  

  isClient: true,

  constructor: function(options){
    this.options = options;
    Backbone.View.prototype.constructor.call(this, options);
  },

  isInitialLoad: function(){
    return Pipedream._initialLoad;
  },
});

ClientView.extend = Backbone.View.extend;

module.exports = ClientView;