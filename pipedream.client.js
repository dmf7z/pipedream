var PipedreamClient = require('./lib/pipedream.base')

PipedreamClient.Router = require('./lib/router/client/router')
PipedreamClient.View = require('./lib/view/client/view')
PipedreamClient.Model = require('./lib/model/client/model')
PipedreamClient.Collection = require('./lib/collection/client/collection')
PipedreamClient.Sync = require('./lib/sync/client/sync')

// Set the default implementation of `PipedreamClient.ajax` to proxy through to `$`.
// Override this if you'd like to use a different library.
PipedreamClient.ajax = function() {
  return PipedreamClient.$.ajax.apply(PipedreamClient.$, arguments);
};

module.exports = PipedreamClient;

