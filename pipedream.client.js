Backbone = require('backbone');

Pipedream = {
	_initialLoad: true
};

//Pipedream.History = require('./lib/history/client/history')
//Pipedream.Events = require('./lib/event/client/event')
//Pipedream.sync = require('./lib/sync/client/sync')
Pipedream.Router = require('./lib/router/client/router')
Pipedream.View = require('./lib/view/client/view')
Pipedream.Model = require('./lib/model/client/model')
Pipedream.Collection = require('./lib/collection/client/collection')

module.exports = Pipedream;

