var _ = require('lodash');
var helper = require('../../helper/helper'); 

// Map from CRUD to HTTP for our default `Pipedream.sync` implementation.
var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'patch':  'PATCH',
  'delete': 'DELETE',
  'read':   'GET'
};


// Set the default implementation of `Pipedream.ajax` to proxy through to `$`.
// Override this if you'd like to use a different library.
Pipedream.ajax = function() {
  return Pipedream.$.ajax.apply(Pipedream.$, arguments);
};

// Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
// will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
// set a `X-Http-Method-Override` header.
Pipedream.emulateHTTP = false;

// Turn on `emulateJSON` to support legacy servers that can't deal with direct
// `application/json` requests ... will encode the body as
// `application/x-www-form-urlencoded` instead and will send the model in a
// form param named `model`.
Pipedream.emulateJSON = false;

module.exports = function(method, model, options){
	var type = methodMap[method];

  // Default options, unless specified.
  _.defaults(options || (options = {}), {
    emulateHTTP: Pipedream.emulateHTTP,
    emulateJSON: Pipedream.emulateJSON
  });

  // Default JSON-request options.
  var params = {type: type, dataType: 'json'};

  // Ensure that we have a URL.
  if (!options.url) {
    params.url = _.result(model, 'url') || helper.urlError();
  }

  // Ensure that we have the appropriate request data.
  if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
    params.contentType = 'application/json';
    params.data = JSON.stringify(options.attrs || model.toJSON(options));
  }

  // For older servers, emulate JSON by encoding the request into an HTML-form.
  if (options.emulateJSON) {
    params.contentType = 'application/x-www-form-urlencoded';
    params.data = params.data ? {model: params.data} : {};
  }

  // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
  // And an `X-HTTP-Method-Override` header.
  if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
    params.type = 'POST';
    if (options.emulateJSON) params.data._method = type;
    var beforeSend = options.beforeSend;
    options.beforeSend = function(xhr) {
      xhr.setRequestHeader('X-HTTP-Method-Override', type);
      if (beforeSend) return beforeSend.apply(this, arguments);
    };
  }

  // Don't process data on a non-GET request.
  if (params.type !== 'GET' && !options.emulateJSON) {
    params.processData = false;
  }

  // If we're sending a `PATCH` request, and we're in an old Internet Explorer
  // that still has ActiveX enabled by default, override jQuery to use that
  // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
  if (params.type === 'PATCH' && window.ActiveXObject &&
        !(window.external && window.external.msActiveXFilteringEnabled)) {
    params.xhr = function() {
      return new ActiveXObject("Microsoft.XMLHTTP");
    };
  }

  // Make the request, allowing the user to override any Ajax options.
  var xhr = options.xhr = Pipedream.ajax(_.extend(params, options));
  model.trigger('request', model, xhr, options);
  return xhr;
}
