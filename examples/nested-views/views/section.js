var _ = require('lodash')

var SectionView = Pipedream.View.extend({
  template: "section",
  initialize: function(options){  
    this.section = options.section;
  },
  render: function(){ 
    var html = this.compileTemplate(this.template, {
      sectionName: this.section.name
    })
    this.$el.html(html);
    return this;
  }
});

module.exports = SectionView