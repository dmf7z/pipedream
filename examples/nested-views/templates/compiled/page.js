(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['page.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function";


  buffer += "<h1>Welcome to ";
  if (stack1 = helpers.pageName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pageName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\n<div>	\n	<div id=\"sections\">";
  if (stack1 = helpers.sections) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sections; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n</div>\n";
  return buffer;
  });
})();