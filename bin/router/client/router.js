var _ = require('lodash');
var helper = require('../../helper/helper'); 
var BaseRouter = require('../router.base');

var ClientRouter = BaseRouter.extend({

  ///BACKBONE NATIVE METHODS

  route: function(route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) callback = this[name];
    var router = this;
    this.history.route(route, function(fragment) {
      var args = router._extractParameters(route, fragment);
      callback && callback.apply(router, args);
      router.trigger.apply(router, ['route:' + name].concat(args));
      router.trigger('route', name, args);
      router.history.trigger('route', router, name, args);
    });
    return this;
  },

  ///END BACKBONE NATIVE METHODS

  render: function(view){ 
  	//In first load view already rendered by server, so it only needs to load the events, it does on initialize 	 	
  	if(!this.isFirstLoad())
  	  view.render();   	 
  },
  start: function(){  	
    this.history.start({ pushState: true});
  }
});

ClientRouter.extend = helper.extend;

module.exports = ClientRouter;



