var PipedreamServer = require('./lib/pipedream.base')

PipedreamServer.Router = require('./lib/router/server/router')
PipedreamServer.View = require('./lib/view/server/view')
PipedreamServer.Model = require('./lib/model/server/model')
PipedreamServer.Collection = require('./lib/collection/server/collection')
PipedreamServer.Sync = require('./lib/sync/server/sync')

module.exports = PipedreamServer;
