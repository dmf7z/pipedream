var _ = require('lodash');
var helper = require('../../helper/helper'); 
var BaseHistory = require('../history.base');

var ServerHistory = BaseHistory.extend({
});

ServerHistory.extend = helper.extend;

module.exports = ServerHistory;
