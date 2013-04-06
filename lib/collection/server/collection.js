var _ = require('lodash');

var ServerCollection = Backbone.Collection.extend({  

  model: Pipedream.ServerModel,
  
  constructor: function(options){
    Backbone.Collection.prototype.constructor.call(this, options);
  },

  parse: function(resp, options) {
    return JSON.parse(resp);
  }
});

ServerCollection.extend = Backbone.Collection.extend;

module.exports = ServerCollection;