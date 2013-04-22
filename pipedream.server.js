global.Backbone = require('backbone');

global.Pipedream = {
	  isClient: false,
	  api: {
	  	host: 'localhost',
  		port: 8080
	  }
};

Backbone.sync = require('./lib/sync/server/sync')

Pipedream.Router = require('./lib/router/server/router')
Pipedream.View = require('./lib/view/server/view')
Pipedream.Model = require('./lib/model/server/model')
Pipedream.Collection = require('./lib/collection/server/collection')

module.exports = Pipedream;

