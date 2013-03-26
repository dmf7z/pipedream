var Pipedream = require('./pipedream')

Pipedream.Router = require('./router/client/router')
Pipedream.View = require('./view/client/view')
Pipedream.Model = require('./model/client/model')
Pipedream.Collection = require('./collection/client/collection')
Pipedream.Sync = require('./sync/client/sync')

// Set the default implementation of `Pipedream.ajax` to proxy through to `$`.
// Override this if you'd like to use a different library.
Pipedream.ajax = function() {
  return Pipedream.$.ajax.apply(Pipedream.$, arguments);
};

module.exports = Pipedream;

