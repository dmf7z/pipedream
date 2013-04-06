var _ = require('lodash');

var ServerModel = Backbone.Model.extend({  

  constructor: function(options){
    Backbone.Model.prototype.constructor.call(this, options);
  }
  
});

ServerModel.extend = Backbone.Model.extend;

module.exports = ServerModel;