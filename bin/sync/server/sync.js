var _ = require('lodash');
var helper = require('../../helper/helper'); 
var BaseSync = require('../sync.base');

var ServerSync = BaseSync.extend({
	sync: function(method, model, options){
		
	}
});

ServerSync.extend = helper.extend;

module.exports = ServerSync;
