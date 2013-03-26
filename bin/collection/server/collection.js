var _ = require('lodash');
var helper = require('../../helper/helper'); 
var ServerModel = require('../../model/server/model');
var BaseCollection = require('../collection.base');

var ServerCollection = BaseCollection.extend({
  // The default model for a collection is just a **Pipedream.Model**.
  // This should be overridden in most cases.
  model: ServerModel  
});

ServerCollection.extend = helper.extend;

module.exports = ServerCollection;
