var _ = require('lodash');
var SectionsView = require('./sections');

var PageView = Pipedream.View.extend({
  template: "page",
  initialize: function(options){         
    this.page = options.page;
    this.sectionsView =  new SectionsView({el: "#sections", page: this.page, sections: this.page.sections, selectedSectionId: options.selectedSectionId, $: this.$});      
    this.sectionsView.on('navigateTo', function(path){
      this.trigger("navigateTo", path);
    }, this); 
  },
  render: function(){  
    var xhtml = this.compileTemplate(this.template, {
        pageName: this.page.name
      }
    ); 
    this.$el.html(xhtml);  
    this.sectionsView.setElement("#sections");  
    this.sectionsView.render();
    return this;
  },
  selectSection: function(selectedSectionId){
    this.sectionsView.selectSection(selectedSectionId);
  }
});

module.exports = PageView