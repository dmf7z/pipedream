var _ = require('lodash');
var helper = require('../../helper/helper'); 
var BaseEvent = require('../event.base');

var ServerEvent = BaseEvent.extend({
  
});

ServerEvent.extend = helper.extend;

module.exports = ServerEvent;
