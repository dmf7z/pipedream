var _ = require('lodash')

module.exports = function(PipeDream){
  var SectionsView = require('./sections')(PipeDream);
  var PageView = PipeDream.View.extend({
    template: "page",
    initialize: function(options){         
      this.page = options.page;
      this.sectionsView =  new SectionsView({el: "#sections", page: this.page, sections: this.page.sections, selectedSectionId: options.selectedSectionId});      
      this.sectionsView.on('navigateTo', function(path){
        this.trigger("navigateTo", path);
      }, this); 
    },
    toHTML: function(){    
      return this.compileTemplate(this.template, {
          pageName: this.page.name,
          sections: this.sectionsView.toHTML()
        }
      );
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
  return PageView;
}