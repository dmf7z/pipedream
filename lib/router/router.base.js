var _ = require('lodash');
var helper = require('../helper/helper'); 

var BaseRouter = function(options) {
  this.history = Pipedream.history;
  options || (options = {});
  if (options.routes) this.routes = options.routes;    
  if (options.app) this.app = options.app;
  this.internalInitialize.apply(this, [options]); 
  this._bindRoutes();
  this.initialize.apply(this, arguments);  
};

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Set up all inheritable **Pipedream.Router** properties and methods.
_.extend(BaseRouter.prototype, Pipedream.Events, {  

  // Internal intialization. Do not override it
  internalInitialize: function(){},

  // Initialize is an empty function by default. Override it with your own
  // initialization logic.
  initialize: function(){},

  // Manually bind a single named route to a callback. For example:
  //
  //     this.route('search/:query/p:num', 'search', function(query, num) {
  //       ...
  //     });
  //
 
  // Simple proxy to `Pipedream.history` to save a fragment into the history.
  navigate: function(fragment, options) {
    Pipedream.history.navigate(fragment, options);
    return this;
  },
  
  // Convert a route string into a regular expression, suitable for matching
  // against the current location hash.
  _routeToRegExp: function(route) {
    route = route.replace(escapeRegExp, '\\$&')
                 .replace(optionalParam, '(?:$1)?')
                 .replace(namedParam, function(match, optional){
                   return optional ? match : '([^\/]+)';
                 })
                 .replace(splatParam, '(.*?)');
    return new RegExp('^' + route + '$');
  },

  // Given a route, and a URL fragment that it matches, return the array of
  // extracted decoded parameters. Empty or unmatched parameters will be
  // treated as `null` to normalize cross-browser behavior.
  _extractParameters: function(route, fragment) {
    var params = route.exec(fragment).slice(1);
    return _.map(params, function(param) {
      return param ? decodeURIComponent(param) : null;
    });
  },

  isFirstLoad: function() {
    return Pipedream.history.firstLoad;
  },

  createGlobals: function(){
    return null;
  }

});

BaseRouter.extend = helper.extend;

module.exports = BaseRouter;










