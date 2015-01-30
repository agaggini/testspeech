var Workspace = Backbone.Router.extend({
  routes: {
    "": "home",

  },

  home: function() {
    this.changePage(new HomePageView());
  },

  changePage: function (page) {
    $(page.el).attr('data-role', 'page');

    page.render();

    $('body').append($(page.el));

    $.mobile.changePage($(page.el), {
      changeHash: false,
      transition: this.historyCount++ ? $.mobile.defaultPageTransition : 'none',
    });
  },

  showDialog: function(page) {
    $(page.el).attr('data-role', 'dialog');

    page.render();

    $('body').append($(page.el));

    $.mobile.changePage($(page.el), {
      allowSamePageTransition: false,
      reverse: false,
      changeHash: false,
      role: 'dialog',
      transition: 'none',
      //transition: this.historyCount++ ? $.mobile.defaultDialogTransition : 'none',      
    });
  },

  historyCount: 0,
});

window.startApp = function() {
  var self = this;

  window.workspace = new Workspace();
  Backbone.history.start();

  //Levanto los Medicos
  window.workspace.medicos = new MedicoList();
  window.workspace.medicos.fetch();
  
  if (navigator.userAgent.match(/(iPad.*|iPhone.*|iPod.*);.*CPU.*OS 7_\d/i)) {
    $("body").addClass("ios7");
    $("body").append('');
  }    

  if (navigator.userAgent.match(/(iPad.*|iPhone.*|iPod.*);.*CPU.*OS 8_\d/i)) {
    $("body").addClass("ios7");
    $("body").append('');
  }    
};
