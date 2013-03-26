var _ = require('lodash');

var PipeDream = require('../../pipedream/pipedream.client');
var Router = require('../controllers/router')(PipeDream);
var router = new Router();

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

router.start();