var _ = require('lodash')

var ENTER_KEY = 13;

// The DOM element for a todo item...
var TodoView = Pipedream.View.extend({
  
  // The DOM events specific to an item.
  events: {
    'click .toggle': 'toggleCompleted',
    'dblclick label': 'edit',
    'click .destroy': 'clear',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function (options) {
    this.templateHTML = options.templateHTML;
    this.filter = options.filter;

    this.$input = this.$('.edit');

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  // Re-render the titles of the todo item.
  render: function () {
    this.$el.attr("id", "todo_" + this.model.id);
    this.$el.html(this.compileTemplate("item-template", this.model.toJSON()));
    if(this.model.get('completed'))      
      this.$el.addClass('completed');
    else
      this.$el.removeClass('completed');
    this.toggleVisible();    
    return this;
  },

  toggleVisible: function () {
    if(this.isHidden())
      this.$el.addClass('hidden');
    else
      this.$el.removeClass('hidden');
  },

  isHidden: function () {
    var isCompleted = this.model.get('completed');
    return (// hidden cases only
      (!isCompleted && this.filter.val === 'completed') ||
      (isCompleted && this.filter.val === 'active')
    );
  },

  // Toggle the `"completed"` state of the model.
  toggleCompleted: function () {
    this.model.toggle();
  },

  // Switch this view into `"editing"` mode, displaying the input field.
  edit: function () {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  // Close the `"editing"` mode, saving changes to the todo.
  close: function () {
    var value = this.$input.val().trim();

    if (value) {
      this.model.save({ title: value });
    } else {
      this.clear();
    }

    this.$el.removeClass('editing');
  },

  // If you hit `enter`, we're through editing the item.
  updateOnEnter: function (e) {
    if (e.which === ENTER_KEY) {
      this.close();
    }
  },

  // Remove the item, destroy the model from *localStorage* and delete its view.
  clear: function () {
    this.model.destroy();
  }
});  

module.exports = TodoView