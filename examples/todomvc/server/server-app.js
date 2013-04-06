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
    var res = template(variables);
    if(variables.layout){
      //Loads layout
      var layoutTemplate = Handlebars.templates[variables.layout + '.hbs']; 
      var finalRes = layoutTemplate({title: 'Pipedream', container: res});    
    }
    else
      finalRes = res;
    return finalRes;
    
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

//Configure database
var db = require('./db/db');

// Bootstrap templates
var models_path = __dirname + '/../templates/compiled'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});

//Set all templates also as partials
Handlebars.partials = Handlebars.templates;

//Load some demo data to the db
db.add({
  "title": "do the laundry",
  "order": 1,
  "completed": false
}, 1);
db.add({
  "title": "mine some litecoins",
  "order": 2,
  "completed": false
}, 2);
db.add({
  "title": "have a beer",
  "order": 3,
  "completed": true
}, 3);

//Initialize todos
var TodoList = require('./../collections/todos')
app.Todos = new TodoList();

//Bootstrap internal routes first
require('./config/routes')(app)
app.use(app.router)

//Init Pipedream Router
var Router = require(__dirname + './../controllers/router')
var router = new Router({app: app});

//Use pipedream router as middleware
app.use(router)

app.listen(4243);

console.log("Listening on port 4243")