var _ = require('lodash')

module.exports = function(Pipedream){
  var SectionView = require('./section')(Pipedream);
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
      var sectionView = new SectionView({el: "#section", section: section});
      return sectionView;
    },
    toHTML: function(){  
      return this.compileTemplate(this.template, {
          page: this.page,
          sections: this.sections,
          selectedSection: this.selectedSectionToHTML()
        }
      );
    },
    selectedSectionToHTML: function(){
      if(this.selectedSectionView)
        return this.selectedSectionView.toHTML();
      else
        return "<p>No section selected</p>";
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
        $("#section", this.$el).html("<p>No section selected</p>");
    },
    selectSection: function(selectedSectionId){
      this.selectedSectionView = this.createSectionView(selectedSectionId);  
    },
    navigateTo: function(e){
      //Important: render of subview happens here, event is trigger only for router to update URL
      var path = $(e.target).attr('href');
      var sectionId = path.split("/")[2];
      e.preventDefault();      
      this.trigger("navigateTo", path);
      this.selectSection(sectionId);
      this.renderSelectedSection();
    }
  });
  return SectionsView;
}