var _ = require('lodash');
var helper = require('../../helper/helper'); 
var ClientModel = require('../../model/client/model');
var BaseCollection = require('../collection.base');

var ClientCollection = BaseCollection.extend({
	// The default model for a collection is just a **Pipedream.Model**.
	// This should be overridden in most cases.
	model: ClientModel  
});

ClientCollection.extend = helper.extend;

module.exports = ClientCollection;
