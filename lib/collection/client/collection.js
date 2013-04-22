var _ = require('lodash');

var ClientCollection = Backbone.Collection.extend({  

  model: Pipedream.ClientModel,
  
  constructor: function(options){
    Backbone.Collection.prototype.constructor.call(this, options);
  }
});

ClientCollection.extend = Backbone.Collection.extend;

module.exports = ClientCollection;