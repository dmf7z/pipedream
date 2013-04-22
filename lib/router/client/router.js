var _ = require('lodash');

var ClientRouter = Backbone.Router.extend({  

  constructor: function(options){
    options || (options = {});
    if (options.app) this.app = options.app;
    Backbone.Router.prototype.constructor.call(this, options);
  },

  //Sets Pipedream._initialLoad to false;
  route: function(route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) callback = this[name];
    var router = this;
    Backbone.history.route(route, function(fragment) {
      var args = router._extractParameters(route, fragment);
      callback && callback.apply(router, args);
      router.trigger.apply(router, ['route:' + name].concat(args));
      router.trigger('route', name, args);
      Backbone.history.trigger('route', router, name, args);
      Pipedream._initialLoad = false;
    });
    return this;
  },

  isInitialLoad: function(){
    return Pipedream._initialLoad;
  },

  //start the history
  start: function(){    
    Backbone.history.start({ pushState: true});
  }
});

ClientRouter.extend = Backbone.Router.extend;

module.exports = ClientRouter;



