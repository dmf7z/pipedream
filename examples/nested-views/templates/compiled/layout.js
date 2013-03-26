(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['layout.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<!doctype html>\n\n<head>\n  <title>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</title>\n\n  <link rel='stylesheet' href='/css/style.css'>\n  <link rel=\"stylesheet\" href=\"/css/index.css\"/>\n\n  <script type=\"text/javascript\" src='/js/handlebars.js'></script>  \n  <script type=\"text/javascript\" src='/js/client.js'></script>  \n</head>\n\n<body>\n  <div id=\"container\">";
  if (stack1 = helpers.container) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.container; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>  \n  <script>\n	var app = require('client/client-app');\n  </script>\n</body>\n\n</html>";
  return buffer;
  });
})();