var Turnos = Backbone.Model.extend({
  dao: TurnosDAO,

  url: function() {
    return _.isUndefined(this.attributes.id) ? appConfig.baseURL + 'turnos' + appConfig.addURL : appConfig.baseURL + 'turnos/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
  }
});


var TurnosFechaList = Backbone.Collection.extend({
  model: Turnos,
  dao: TurnosDAO,
  
  initialize: function(options) {
    options || (options = {});
    
    this.year = options.year;
    this.month = options.month;
    this.day = options.day;   
    this.medicoId = options.medicoId;
  },

  url: function() {
    if (_.isUndefined(this.year)) {
      return appConfig.baseURL + 'turnos' + appConfig.addURL;
    }
    else {
      return appConfig.baseURL + 'turnos/' + encodeURIComponent(this.year) + '/' + encodeURIComponent(this.month) + '/' + encodeURIComponent(this.day) + '/' + encodeURIComponent(this.medicoId) + appConfig.addURL;      
    }
  }
});
