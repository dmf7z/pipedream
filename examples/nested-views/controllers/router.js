var _ = require('lodash');
var pages = require('../models/dummy')

var Router =  Pipedream.Router.extend({    
  routes: {
    'pa' : 'funtionA',
    'pa/:test/:caca' : 'funtionAX',
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
    '*actions' : 'functionDefault'
  },
  renderPagesView: function(selectedPageId, selectedSectionId){
    var PagesView = require('../views/pages');
    this.pagesView =  new PagesView({pages: pages, selectedPageId: selectedPageId, selectedSectionId: selectedSectionId});      
    if(this.isClient)
      this.pagesView.on('navigateTo', function(path){
        this.navigate(path, { trigger: false });
      }, this);  
    else
      this.pagesView.render();
    return this.pagesView;
  },
  functionDefault: function() {   
    return this.renderPagesView('pa');
  },
  funtionA: function() {   
    return this.renderPagesView('pa');
  },
  funtionB: function() {   
    return this.renderPagesView('pb');          
  },
  funtionC: function() {   
    return this.renderPagesView('pc');          
  },
  funtionD: function() {
    return this.renderPagesView('pd');         
  },
  funtionA1: function() {    
    return this.renderPagesView('pa', 'sa1');             
  },
  funtionA2: function() {    
    return this.renderPagesView('pa', 'sa2');             
  },
  funtionA3: function() {    
    return this.renderPagesView('pa', 'sa3');             
  },
  funtionA4: function() {    
    return this.renderPagesView('pa', 'sa4');             
  },
  funtionB1: function() {    
    return this.renderPagesView('pb', 'sb1');             
  },
  funtionB2: function() {    
    return this.renderPagesView('pb', 'sb2');            
  },
  funtionB3: function() {    
    return this.renderPagesView('pb', 'sb3');            
  },
  funtionB4: function() {    
    return this.renderPagesView('pb', 'sb4');             
  },
  funtionC1: function() {    
    return this.renderPagesView('pc', 'sc1');             
  },
  funtionC2: function() {    
    return this.renderPagesView('pc', 'sc2');             
  },
  funtionC3: function() {    
    return this.renderPagesView('pc', 'sc3');             
  },
  funtionC4: function() {    
    return this.renderPagesView('pc', 'sc4');             
  },
  funtionD1: function() {    
    return this.renderPagesView('pd', 'sd1');             
  },
  funtionD2: function() {    
    return this.renderPagesView('pd', 'sd2');             
  },
  funtionD3: function() {    
    return this.renderPagesView('pd', 'sd3');             
  },
  funtionD4: function() {    
    return this.renderPagesView('pd', 'sd4');             
  }
}); 

module.exports = Router;