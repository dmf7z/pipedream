var _ = require('lodash')


module.exports = function(PipeDream){
  var PageView = require('./page')(PipeDream);
  var PagesView = PipeDream.View.extend({
    el: "#container",
    template: "pages",
    events: {
      "click .btn_page" : "navigateTo"
    }, 
    initialize: function(options){        
      this.pages = options.pages;
      this.selectedPageView = this.createPageView(options.selectedPageId, options.selectedSectionId);
    },
    createPageView: function(id, selectedSectionId){
      var page = _.find(this.pages, function(page){ return page.id == id; })
      var pageView = new PageView({el: "#page", page: page, selectedSectionId: selectedSectionId});
      pageView.on('navigateTo', function(path){
          this.trigger("navigateTo", path);
      }, this); 
      return pageView;
    },
    toHTML: function(){        
      return this.compileTemplate(this.template, {
          layout: "layout",
          pages: this.pages,
          selectedPage: this.selectedPageView.toHTML()
        }
      );
    },
    render: function(){  
      var xhtml = this.compileTemplate(this.template, {
          layout: "layout",
          pages: this.pages
        }
      );      
      this.$el.html(xhtml);      
      this.renderSelectedPage();
      return this;
    },
    renderSelectedPage: function(){      
      this.selectedPageView.setElement("#page"); 
      this.selectedPageView.render();  
    },
    selectPage: function(selectedPageId){
      this.selectedPageView = this.createPageView(selectedPageId);
    },
    selectSection: function(selectedSectionId){
      this.selectedPageView.selectSection(selectedSectionId);
    },
    navigateTo: function(e){
      //Important: render of subview happens here, event is trigger only for router to update URL
      this.selectSection(null);
      var path = $(e.target).attr('href');
      var pageId = path.split("/")[1];
      e.preventDefault();      
      this.trigger("navigateTo", pageId);
      this.selectPage(pageId);
      this.renderSelectedPage();
    }
  });
  return PagesView;
}