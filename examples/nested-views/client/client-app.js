var _ = require('lodash');
var Pipedream = require('node_modules/pipedream/pipedream.client');

Pipedream.View.prototype.compileTemplate = function(template, variables){  	
  var template = Handlebars.templates[template + '.hbs']; 
  var res = template(variables);
  return res;
}

//Load templates (TODO: this should be done by browserbuild)
require("../templates/compiled/layout");
require("../templates/compiled/page");
require("../templates/compiled/pages");
require("../templates/compiled/page-buttons");
require("../templates/compiled/section");
require("../templates/compiled/sections");
require("../templates/compiled/section-buttons");

//Set all templates also as partials
Handlebars.partials = Handlebars.templates;


var Router = require('../controllers/router')(Pipedream);
var router = new Router();

router.start();