var express = require('express')
var _ = require('lodash')
var fs = require('fs')
require('pipedream')
//TODO: This should not be global
Handlebars = require('handlebars')

//Override compileTemplates to use HandleBars
Pipedream.View.prototype.compileTemplate = function(template, variables){
  try {
      //Loads template
      var template = Handlebars.templates[template + '.hbs']; 
      return template(variables);
    } 
    catch (err) {
      return '<hr>Error: ' + err.message + '</hr>';
    }
}

//Should not be global
var app = express();

// Config
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static(__dirname + '/../public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


// Bootstrap templates
var models_path = __dirname + '/../templates/compiled'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});

//Set all templates also as partials
Handlebars.partials = Handlebars.templates;

//Init Router
var Router = require('../controllers/router')
var router = new Router({app: app});

//Use pipedream router as middleware
app.use(router)

// Launch server
app.listen(4243);

console.log("Listening on port 4243")