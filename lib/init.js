module.exports = (function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Pipedream` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousPipedream = root.Pipedream;

  // Create local references to array methods we'll want to use later.
  /*var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Pipedream classes and modules will
  // be attached to this. Exported for both the browser and the server.
  var Pipedream;
  if (typeof exports !== 'undefined') {
    Pipedream = exports;
  } else {
    Pipedream = root.Pipedream = {};
  }*/

  // Current version of the library. Keep in sync with `package.json`.
  //Pipedream.VERSION = '1.0.0';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('lodash');

  // For Pipedream's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
/*  //// the `$` variable.
  Pipedream.$ = root.jQuery || root.Zepto || root.ender || root.$;

  // Runs Pipedream.js in *noConflict* mode, returning the `Pipedream` variable
  // to its previous owner. Returns a reference to this Pipedream object.
  Pipedream.noConflict = function() {
    root.Pipedream = previousPipedream;
    return this;
  };
*/
  // Allow the `Pipedream` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Pipedream, Pipedream.Events);
  
  // Create the default Pipedream.history.
  Pipedream.history = new Pipedream.History;
  

}).apply(this);