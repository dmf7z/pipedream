Backbone = require('backbone');

Pipedream = {
	isClient: true,
	_initialLoad: true
};

Pipedream.Router = require('./lib/router/client/router')
Pipedream.View = require('./lib/view/client/view')
Pipedream.Model = require('./lib/model/client/model')
Pipedream.Collection = require('./lib/collection/client/collection')

module.exports = Pipedream;

