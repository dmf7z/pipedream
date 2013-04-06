var _ = require('lodash');
var helper = require('../../helper/helper'); 
var http  = require('http');

//TODO: is this methodMap common with client sync.js? Then move it to a common place

// Map from CRUD to HTTP for our default `Pipedream.sync` implementation.
var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'patch':  'PATCH',
  'delete': 'DELETE',
  'read':   'GET'
};

module.exports = function(method, model, options){
	var params = {  
		host: 'localhost',
  		port: 4243, //TODO: port should be configurable
  		method: methodMap[method], 
  		success: options.success,
  		error: options.failure,
  		path: options.url
	};

	// Ensure that we have a URL.
	if (!params.path) {
	  params.path = _.result(model, 'url') || helper.urlError();
	}

	// Ensure that we have the appropriate request data.
	if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	  params.headers['Content-Type'] = 'application/json';
	  params.data = JSON.stringify(options.attrs || model.toJSON(options));
	  params.headers['Content-Length'] =  params.data.length;	  
	}

	var req = http.request(params, function(res) {
	  var data = "";
	  res.on('data', function (chunk) {	  	
	    data += chunk;
	  }).on('end', function() {
	     params.success && params.success(data)
	  });
	}).on('error', function(e) {
	  params.error && params.error(e.message);
	});

	// post the data
	if(params.data)
		req.write(params.data);

	req.end();
	//TODO: return a promise
}