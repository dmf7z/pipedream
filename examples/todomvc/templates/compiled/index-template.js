(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index-template.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<!doctype html>\n<html lang=\"en\">\n	<head>\n		<meta charset=\"utf-8\">\n		<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n		<title>Backbone.js • TodoMVC</title>\n		<link rel=\"stylesheet\" href=\"/css/base.css\">\n		<script type=\"text/javascript\" src='/js/handlebars.js'></script>  \n  		<script type=\"text/javascript\" src='/js/client.js'></script>  \n	</head>\n	<body>\n		<section id=\"todoapp\">\n			<header id=\"header\">\n				<h1>todos</h1>\n				<input id=\"new-todo\" placeholder=\"What needs to be done?\" autofocus>\n			</header>\n			<section id=\"main\">\n				<input id=\"toggle-all\" type=\"checkbox\">\n				<label for=\"toggle-all\">Mark all as complete</label>\n				<ul id=\"todo-list\"></ul>\n			</section>\n			<footer id=\"footer\"></footer>			\n		<script id=\"initialData\">						\n	  	</script>\n	  	<script>\n	  		var app = require('client/client-app');\n	  	</script>\n		</section>\n		<footer id=\"info\">\n			<p>Double-click to edit a todo</p>\n			<p>Written by <a href=\"https://github.com/addyosmani\">Addy Osmani</a></p>\n			<p>Part of <a href=\"http://todomvc.com\">TodoMVC</a></p>\n		</footer>		\n	</body>\n</html>";
  });
})();