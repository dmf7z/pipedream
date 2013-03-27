var express = require('express')
var _ = require('lodash')
var fs = require('fs')

//Should not be global
app = express();

// Config
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static(__dirname + '/../public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


//This should not be global
Handlebars = require('handlebars')
// Bootstrap templates
var models_path = __dirname + '/../templates/compiled'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});


//Set all templates also as partials
Handlebars.partials = Handlebars.templates;

//This gives flexibility to override ServerRouter or Router
var Pipedream = require('pipedream')
var Router = require(__dirname + '/../controllers/router')(Pipedream)

var router = new Router();

// Launch server
router.listen(4243);

console.log("Listening on port 4243")