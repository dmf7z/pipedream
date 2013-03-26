var _ = require('lodash');
var Pipedream = require('../pipedream');
var helper = require('../helper/helper'); 

var BaseView = function(options) {
 this.cid = _.uniqueId('view');
 this._configure(options || {});
 this._ensureElement();
 this.internalInitialize.apply(this, [options]); 
 this.initialize.apply(this, arguments);
 this.delegateEvents();
};

// List of view options to be merged as properties.
var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

// Set up all inheritable **Pipedream.View** properties and methods.
_.extend(BaseView.prototype, Pipedream.Events, {

  // Internal intialization. Do not override it
  internalInitialize: function(){},

  // Initialize is an empty function by default. Override it with your own
  // initialization logic.
  initialize: function(){},
  
  // **render** is the core function that your view should override, in order
  // to populate its element (`this.el`), with the appropriate HTML. The
  // convention is for **render** to always return `this`.
  render: function() {
    return this;
  },
        
  // Performs the initial configuration of a View with a set of options.
  // Keys with special meaning *(e.g. model, collection, id, className)* are
  // attached directly to the view.  See `viewOptions` for an exhaustive
  // list.
  _configure: function(options) {
    if (this.options) options = _.extend({}, _.result(this, 'options'), options);
    _.extend(this, _.pick(options, viewOptions));
    this.options = options;
  }

});

BaseView.extend = helper.extend;

module.exports = BaseView