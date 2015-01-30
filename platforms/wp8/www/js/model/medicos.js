var Medicos = Backbone.Model.extend({
  dao: MedicosDAO,

  url: function() {
    return _.isUndefined(this.attributes.id) ? appConfig.baseURL + 'medicos' + appConfig.addURL : appConfig.baseURL + 'medicos/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
  }
});

var MedicosList = Backbone.Collection.extend({
  model: Medicos,  
  dao: MedicosDAO,

  initialize: function() {
  },

  url: function() {
    return appConfig.baseURL + 'medicos' + appConfig.addURL;
  }
});