var microdb = require('nodejs-microdb');

console.log("Initializing database");  
var db = new microdb();

module.exports = db