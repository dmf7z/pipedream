var _ = require('lodash')
var TodoView = require('./todos')

var ENTER_KEY = 13;

var AppView = Pipedream.View.extend({

  // Instead of generating a new element, bind to the existing skeleton of
  // the App already present in the HTML.
  el: '#todoapp',

  // Our template for the line of statistics at the bottom of the app.
  layout: "index-template",

  // Delegated events for creating new items, and clearing completed ones.
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete',
    'click #filters li a': 'navigateTo'
  },

  views: [],

  filter: {},

  // At initialization we bind to the relevant events on the `Todos`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting todos that might be saved in *localStorage*.
  initialize: function (options) {    

    this.Todos = options.Todos;
    
    this.setFilter(options.TodoFilter);

    this.allCheckbox = this.$('#toggle-all');
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(this.Todos, 'add', this.addOne);
    this.listenTo(this.Todos, 'reset', this.addAll);
    this.listenTo(this.Todos, 'change:completed', this.filterOne);
    this.listenTo(this.Todos, 'filter', this.filterAll);
    this.listenTo(this.Todos, 'sync', this.render);

  },  

  setFilter: function(filter){
    this.filter.val = filter;
  },

  appendInitialData: function(){
    this.$("#initialData").append(
      "var initialOptions = {todos: " + JSON.stringify(this.Todos.toJSON()) + "}"
    );  
  },

  // Re-rendering the App just means refreshing the statistics -- the rest
  // of the app doesn't change.
  render: function () {

    console.log("rendering")
    
    if(!this.isClient)
      this.appendInitialData();

    var completed = this.Todos.completed().length;
    var remaining = this.Todos.remaining().length;
        
    if (this.Todos.length) {   

      this.$main.removeClass('hidden');
      this.$footer.removeClass('hidden');

      // Cache the template function for a single item.
      if(!this.statsTemplate)
        this.statsTemplate = _.template(this.$('#stats-template').html());

      this.$footer.html(this.compileTemplate("stats-template", {
        completed: completed,
        remaining: remaining,
        itemlabel: (remaining===1?'item':'items')
      }));

      this.$('#filters li a')
        .removeClass('selected')
        .filter('[href="/' + (this.filter.val  || '') + '"]')
        .addClass('selected');


    } else {
      this.$main.addClass('hidden');
      this.$footer.addClass('hidden');
    }

    if(remaining)
      this.allCheckbox.removeAttr('checked');
    else
      this.allCheckbox.attr('checked', 'checked');      

    this.trigger("render");
    return this;
  },

  // Add a single todo item to the list by creating a view for it, and
  // appending its element to the `<ul>`.
  addOne: function (todo) {
    var id = "todo_" + todo.get('id');
    if(!this.$("#" + id).length)
      this.$('#todo-list').append('<li id="' + id + '"></li>');  
    var view = new TodoView({el: "#" + id, model: todo, filter: this.filter, $: this.$ });           
    if(!this.isInitialLoad())
      view.render()
  },

  // Add all items in the **Todos** collection at once.
  addAll: function () {
    if(!this.isInitialLoad())
      this.$('#todo-list').html('');
    this.Todos.each(this.addOne, this);
  },

  filterOne: function (todo) {
    todo.trigger('visible');
  },

  filterAll: function () {
    this.Todos.each(this.filterOne, this);
  },

  // Generate the attributes for a new Todo item.
  newAttributes: function () {    
    return {
      title: this.$input.val().trim(),
      order: this.Todos.nextOrder(),
      completed: false
    };
  },

  // If you hit return in the main input field, create new **Todo** model,
  // persisting it to *localStorage*.
  createOnEnter: function (e) {    
    if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }

    this.Todos.create(this.newAttributes());
    this.$input.val('');
  },

  // Clear all completed todo items, destroying their models.
  clearCompleted: function () {
    _.invoke(this.Todos.completed(), 'destroy');
    return false;
  },

  toggleAllComplete: function () {
    var allCheckbox = this.$('#toggle-all')[0];
    var completed = allCheckbox.checked;

    this.Todos.each(function (todo) {
      todo.save({
        'completed': completed
      });
    });
  },

  navigateTo: function(e){        
    var path = this.$(e.target).attr('href');    
    e.preventDefault();
    this.trigger("navigateTo", path);
  }
});

module.exports = AppView