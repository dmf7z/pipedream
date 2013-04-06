var _ = require('lodash')

module.exports = function(Pipedream){
  var SectionView = Pipedream.View.extend({
    template: "section",
    initialize: function(options){  
      this.section = options.section;
    },
    toHTML: function(){    
      return this.compileTemplate(this.template, {
          sectionName: this.section.name
        }
      );
    },
    render: function(){      
      this.$el.html(this.toHTML());
      return this;
    }
  });
  return SectionView;
}