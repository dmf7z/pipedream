var _ = require('lodash');
var TodoList = require('./../collections/todos')
var AppView = require('./../views/app')

var Router =  Pipedream.Router.extend({    
  routes: { 
    '*filter': 'setFilter',
  },    
  setFilter: function (param) { 

    // Set the current filter to be used
    var filter = param || '';
    if(!Pipedream.isClient){
      var Todos = new TodoList();     
      var appView = new AppView({Todos: Todos, TodoFilter: filter});       
      appView.listenTo(Todos, 'sync', function(){
        appView.appendInitialData();
        appView.render();
      });
      Todos.fetch();  
      return appView;
    }
    else if(this.isInitialLoad()){
      this.Todos = new TodoList(initialOptions.todos);     
      this.appView = new AppView({Todos: this.Todos, TodoFilter: filter});          
      this.appView.on('navigateTo', function(path){
        this.navigate(path, { trigger: true });
      }, this);
      this.appView.listenTo(this.Todos, 'all', this.appView.render);
      this.appView.addAll();
    }
    else {
      this.appView.setFilter(param || '');
      // Trigger a collection filter event, causing hiding/unhiding
      // of Todo view items    
      this.Todos.trigger('filter');  
    }
    
    return appView;
  }
});  

module.exports = Router