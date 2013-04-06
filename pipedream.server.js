global.Pipedream = function(options) {
};

Pipedream.History = require('./lib/history/server/history')
Pipedream.Events = require('./lib/event/server/event')
Pipedream.sync = require('./lib/sync/server/sync')
Pipedream.Router = require('./lib/router/server/router')
Pipedream.View = require('./lib/view/server/view')
Pipedream.Model = require('./lib/model/server/model')
Pipedream.Collection = require('./lib/collection/server/collection')
require('./lib/init')

module.exports = Pipedream;

