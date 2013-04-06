var _ = require('lodash');
var helper = require('../../helper/helper'); 
var BaseHistory = require('../history.base');

var ClientHistory = BaseHistory.extend({
});

ClientHistory.extend = helper.extend;

module.exports = ClientHistory;
