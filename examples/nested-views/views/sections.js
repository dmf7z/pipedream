var _ = require('lodash')
var SectionView = require('./section')

var SectionsView = Pipedream.View.extend({
  template: "sections",
  events: {
    "click .btn_section" : "navigateTo"
  }, 
  initialize: function(options){  
    this.page = options.page;
    this.sections = options.sections;
    if(options.selectedSectionId)
      this.selectedSectionView = this.createSectionView(options.selectedSectionId);  
  },
  createSectionView: function(id){
    var section = _.find(this.sections, function(section){ return section.id == id; })
    var sectionView = new SectionView({el: "#section", section: section, $: this.$});
    return sectionView;
  },
  render: function(){ 
    var xhtml = this.compileTemplate(this.template, {
        page: this.page,
        sections: this.sections
      }
    );
    this.$el.html(xhtml); 
    this.renderSelectedSection();
    return this;    
  },
  renderSelectedSection: function(){
    if(this.selectedSectionView){
      this.selectedSectionView.setElement("#section");
      this.selectedSectionView.render();
    }              
    else 
      this.$("#section", this.$el).html("<p>No section selected</p>");
  },
  selectSection: function(selectedSectionId){
    this.selectedSectionView = this.createSectionView(selectedSectionId);  
  },
  navigateTo: function(e){
    //Important: render of subview happens here, event is trigger only for router to update URL
    var path = this.$(e.target).attr('href');
    var sectionId = path.split("/")[2];
    e.preventDefault();      
    this.trigger("navigateTo", path);
    this.selectSection(sectionId);
    this.renderSelectedSection();
  }
});

module.exports = SectionsView