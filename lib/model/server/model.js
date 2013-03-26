var _ = require('lodash');
var helper = require('../../helper/helper'); 
var BaseModel = require('../model.base');

var ServerModel = BaseModel.extend({
  
});

ServerModel.extend = helper.extend;

module.exports = ServerModel;
