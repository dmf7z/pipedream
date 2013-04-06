var _ = require('lodash');
require('node_modules/pipedream/pipedream.client');

Pipedream.View.prototype.compileTemplate = function(template, variables){  	
  var template = Handlebars.templates[template + '.hbs']; 
  var res = template(variables);
  return res;
}

//Load templates (TODO: this should be done by browserbuild)
require("../templates/compiled/index-template");
require("../templates/compiled/item-template");
require("../templates/compiled/stats-template");

//Set all templates also as partials
Handlebars.partials = Handlebars.templates;

var app = app || {};

var Router = require('../controllers/router');
var router = new Router({app: app});

router.start();