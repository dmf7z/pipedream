var _ = require('lodash');
var helper = require('../../helper/helper'); 
var BaseEvent = require('../event.base');

var ClientEvent = BaseEvent.extend({
  
});

ClientEvent.extend = helper.extend;

module.exports = ClientEvent;