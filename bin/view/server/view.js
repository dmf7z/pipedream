var _ = require('lodash');
var helper = require('../../helper/helper'); 
var Handlebars = require('handlebars');
var BaseView = require('../view.base');

//TODO: make path flexible, to be set in Pipedream.View.path 
var path = __dirname + '/../../../app/templates/'

var ServerView = BaseView.extend({

  ///BACKBONE NATIVE METHODS

  //TODO: some methods may not be necessary to define at all

  setElement: function(){},
  remove: function(){},
  _ensureElement: function(){},
  delegateEvents: function(){},
  undelegateEvents: function(){},

  ///END OF BACKBONE NATIVE METHODS

  internalInitialize: function(options){
    
  },    
  compileTemplate: function(template, variables){
  	try {
      //Loads template
      var template = Handlebars.templates[template + '.hbs']; 
      var res = template(variables);
      if(variables.layout){
        //Loads layout
        var layoutTemplate = Handlebars.templates[variables.layout + '.hbs']; 
        var finalRes = layoutTemplate({title: 'PipeDream', container: res});    
      }
      else
        finalRes = res;
      return finalRes;
  	  
     	} 
      catch (err) {
        return '<hr>Error: ' + err.message + '</hr>';
      }
  }  
}); 

ServerView.extend = helper.extend;

module.exports = ServerView
