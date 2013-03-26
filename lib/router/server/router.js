var _ = require('lodash')
var helper = require('../../helper/helper'); 
var BaseRouter = require('../router.base');

var ServerRouter = BaseRouter.extend({

  ///BACKBONE NATIVE METHODS

  route: function(route, name, callback){  
    var router = this;
    if (!callback) callback = this[name];
    app.get("/" + route, function(req, res){                 
      router.res = res                  
      callback.apply(router, _(req.query).values())      
    })
  },

  ///END BACKBONE NATIVE METHODS

  render: function(view){    
    this.res.send(view.toHTML());
  },
  listen: function(port){
    app.listen(port);
  }    
}); 

ServerRouter.extend = helper.extend;

module.exports = ServerRouter

