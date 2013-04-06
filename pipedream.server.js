global.Backbone = require('backbone');

global.Pipedream = {
};

Backbone.sync = require('./lib/sync/server/sync')
Pipedream.Router = require('./lib/router/server/router')
Pipedream.View = require('./lib/view/server/view')
Pipedream.Model = require('./lib/model/server/model')
Pipedream.Collection = require('./lib/collection/server/collection')

module.exports = Pipedream;

