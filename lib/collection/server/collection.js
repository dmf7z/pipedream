var _ = require('lodash');
var helper = require('../../helper/helper'); 
var ServerModel = require('../../model/server/model');
var BaseCollection = require('../collection.base');

var ServerCollection = BaseCollection.extend({
  // The default model for a collection is just a **Pipedream.Model**.
  // This should be overridden in most cases.
  model: ServerModel,
  // **parse** converts a response into a list of models to be added to the
  // collection. The default implementation is just to pass it through.
  parse: function(resp, options) {
    return JSON.parse(resp);
  },
});

ServerCollection.extend = helper.extend;

module.exports = ServerCollection;
