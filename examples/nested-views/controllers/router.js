var _ = require('lodash');
var pages = require('../model/dummy')


module.exports = function(Pipedream){
  var Router =  Pipedream.Router.extend({    
    routes: {
      'pa' : 'funtionA',
      'pb' : 'funtionB',
      'pc' : 'funtionC',
      'pd' : 'funtionD',
      'pa/sa1' : 'funtionA1',
      'pa/sa2' : 'funtionA2',
      'pa/sa3' : 'funtionA3',
      'pa/sa4' : 'funtionA4',
      'pb/sb1' : 'funtionB1',
      'pb/sb2' : 'funtionB2',
      'pb/sb3' : 'funtionB3',
      'pb/sb4' : 'funtionB4',
      'pc/sc1' : 'funtionC1',
      'pc/sc2' : 'funtionC2',
      'pc/sc3' : 'funtionC3',
      'pc/sc4' : 'funtionC4',
      'pd/sd1' : 'funtionD1',
      'pd/sd2' : 'funtionD2',
      'pd/sd3' : 'funtionD3',
      'pd/sd4' : 'funtionD4',
      '*actions' : 'functionA'
    },
    renderPagesView: function(selectedPageId, selectedSectionId){
      var PagesView = require('../views/pages')(Pipedream);
      this.pagesView =  new PagesView({pages: pages, selectedPageId: selectedPageId, selectedSectionId: selectedSectionId});      
      this.pagesView.on('navigateTo', function(path){
        this.navigate(path, { trigger: false });
      }, this);   
      this.render(this.pagesView);
    },
    funtionA: function() {    
      this.renderPagesView('pa');
    },
    funtionB: function() {      
      this.renderPagesView('pb');          
    },
    funtionC: function() {   
      this.renderPagesView('pc');          
    },
    funtionD: function() {
      this.renderPagesView('pd');         
    },
    funtionA1: function() {    
      this.renderPagesView('pa', 'sa1');             
    },
    funtionA2: function() {    
      this.renderPagesView('pa', 'sa2');             
    },
    funtionA3: function() {    
      this.renderPagesView('pa', 'sa3');             
    },
    funtionA4: function() {    
      this.renderPagesView('pa', 'sa4');             
    },
    funtionB1: function() {    
      this.renderPagesView('pb', 'sb1');             
    },
    funtionB2: function() {    
      this.renderPagesView('pb', 'sb2');            
    },
    funtionB3: function() {    
      this.renderPagesView('pb', 'sb3');            
    },
    funtionB4: function() {    
      this.renderPagesView('pb', 'sb4');             
    },
    funtionC1: function() {    
      this.renderPagesView('pc', 'sc1');             
    },
    funtionC2: function() {    
      this.renderPagesView('pc', 'sc2');             
    },
    funtionC3: function() {    
      this.renderPagesView('pc', 'sc3');             
    },
    funtionC4: function() {    
      this.renderPagesView('pc', 'sc4');             
    },
    funtionD1: function() {    
      this.renderPagesView('pd', 'sd1');             
    },
    funtionD2: function() {    
      this.renderPagesView('pd', 'sd2');             
    },
    funtionD3: function() {    
      this.renderPagesView('pd', 'sd3');             
    },
    funtionD4: function() {    
      this.renderPagesView('pd', 'sd4');             
    }
  });  

  return Router;
}