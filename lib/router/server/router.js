var _ = require('lodash')

var ServerRouter = Backbone.Router.extend({

  constructor: function(options){
    if (options.app) this.app = options.app;
    if(this.serverRoutes)
      this.routes = _.extend(this.serverRoutes, this.routes);  
    Backbone.Router.prototype.constructor.call(this, options);
  },

  //Bind all defined routes to `Pipedream.history`. 
  //Diferent from the client, we do not have to reverse the order
  _bindRoutes: function() {
    if (!this.routes) return;
    this.routes = _.result(this, 'routes');
    var route, routes = _.keys(this.routes);
    for (var index in routes) {
      route = routes[index];
      this.route(route, this.routes[route]);
    }
  },

  isInitialLoad: function(){
    return false;
  },


  route: function(route, name, callback){  
    var router = this;
    if (!callback) callback = this[name];

    //Removes anything after * to make backbone server get route    
    var index = route.indexOf('*');
    if(index > -1)
      route = route.substring(0, index + 1);

    //Function that executes the callbacl
    var fn = function(req, res, next){          
      router.res = res 
      req.params.req = req;
      req.params.res = res;
      var result = callback.apply(router, _.values(req.params));
      if(result){        
        if(result instanceof Pipedream.View){                    
          var view = result;  
          if(view.rendered)   
            res.send(view.getHTML())
          else
            view.on('render', function(html){
              res.send(view.getHTML());
              res.end();
            }, this);
        }
        else{
          res.send(result)
          res.end();
        }
      }        
      else{
        res.send(500, 'Not able to render page');
        res.end();
      }
    }

    //Adds "/" if route does not starts with it
    if(route.length == 0 || route.substring(0, 1) != "/")
      route = "/" + route

    this.app.get(route, fn)
      
  }

}); 

ServerRouter.extend = Backbone.Router.extend;

module.exports = ServerRouter
