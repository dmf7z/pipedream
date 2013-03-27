var _ = require('lodash');
var Pipedream = require('../pipedream.base');
var helper = require('../helper/helper'); 

// Pipedream.sync
// -------------

// Override this function to change the manner in which Pipedream persists
// models to the server. You will be passed the type of request, and the
// model in question. By default, makes a RESTful Ajax request
// to the model's `url()`. Some possible customizations could be:
//
// * Use `setTimeout` to batch rapid-fire updates into a single request.
// * Send up the models as XML instead of JSON.
// * Persist models via WebSockets instead of Ajax.
//
// Turn on `Pipedream.emulateHTTP` in order to send `PUT` and `DELETE` requests
// as `POST`, with a `_method` parameter containing the true HTTP method,
// as well as all requests with the body as `application/x-www-form-urlencoded`
// instead of `application/json` with the model in a param named `model`.
// Useful when interfacing with server-side languages like **PHP** that make
// it difficult to read the body of `PUT` requests.
var BaseSync = function(method, model, options) {
  this.sync(method, model, options);
};

BaseSync.extend = helper.extend;

module.exports = BaseSync;










