var _ = require('lodash');
var Pipedream = require('../../pipedream.base');
var helper = require('../../helper/helper'); 
var BaseView = require('../view.base');


// Cached regex to split keys for `delegate`.
var delegateEventSplitter = /^(\S+)\s*(.*)$/;		

var ClientView = BaseView.extend({
  
  ///BACKBONE NATIVE METHODS

  // The default `tagName` of a View's element is `"div"`.
  tagName: 'div',  
  // jQuery delegate for element lookup, scoped to DOM elements within the
  // current view. This should be prefered to global lookups where possible.
  $: function(selector) {
    return this.$el.find(selector);
  },
  // Change the view's element (`this.el` property), including event
  // re-delegation.
  setElement: function(element, delegate) {
    if (this.$el) this.undelegateEvents();
    this.$el = element instanceof Pipedream.$ ? element : Pipedream.$(element);
    this.el = this.$el[0];
    if (delegate !== false) this.delegateEvents();
    return this;
  },
  // Remove this view by taking the element out of the DOM, and removing any
  // applicable Pipedream.Events listeners.
  remove: function() {
    this.$el.remove();
    this.stopListening();
    return this;
  }, 
  // Ensure that the View has a DOM element to render into.
  // If `this.el` is a string, pass it through `$()`, take the first
  // matching element, and re-assign it to `el`. Otherwise, create
  // an element from the `id`, `className` and `tagName` properties.
  _ensureElement: function() {
    if (!this.el) {
      var attrs = _.extend({}, _.result(this, 'attributes'));
      if (this.id) attrs.id = _.result(this, 'id');
      if (this.className) attrs['class'] = _.result(this, 'className');
      var $el = Pipedream.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
      this.setElement($el, false);
    } else {
      this.setElement(_.result(this, 'el'), false);
    }
  },
  // Set callbacks, where `this.events` is a hash of
  //
  // *{"event selector": "callback"}*
  //
  //     {
  //       'mousedown .title':  'edit',
  //       'click .button':     'save'
  //       'click .open':       function(e) { ... }
  //     }
  //
  // pairs. Callbacks will be bound to the view, with `this` set properly.
  // Uses event delegation for efficiency.
  // Omitting the selector binds the event to `this.el`.
  // This only works for delegate-able events: not `focus`, `blur`, and
  // not `change`, `submit`, and `reset` in Internet Explorer.
  delegateEvents: function(events) {
    if (!(events || (events = _.result(this, 'events')))) return this;
    this.undelegateEvents();
    for (var key in events) {
      var method = events[key];
      if (!_.isFunction(method)) method = this[events[key]];
      if (!method) continue;
  
      var match = key.match(delegateEventSplitter);
      var eventName = match[1], selector = match[2];
      method = _.bind(method, this);
      eventName += '.delegateEvents' + this.cid;
      if (selector === '') {
        this.$el.on(eventName, method);
      } else {
        this.$el.on(eventName, selector, method);
      }
    }
    return this;
  },  
  // Clears all callbacks previously bound to the view with `delegateEvents`.
  // You usually don't need to use this, but may wish to if you have multiple
  // Pipedream views attached to the same DOM element.
  undelegateEvents: function() {
    this.$el.off('.delegateEvents' + this.cid);
    return this;
  },

  ///END OF BACKBONE NATIVE METHODS

  internalInitialize: function(options){
  	
  },   
  compileTemplate: function(template, variables){  	
  	var template = Handlebars.templates[template + '.hbs']; 
    var res = template(variables);
    return res;
  }
});

ClientView.extend = helper.extend;

module.exports = ClientView;



