var _ = require('lodash');

var ClientModel = Backbone.Model.extend({  

  isClient: true,

  constructor: function(options){
    Backbone.Model.prototype.constructor.call(this, options);
  }
  
});

ClientModel.extend = Backbone.Model.extend;

module.exports = ClientModel;