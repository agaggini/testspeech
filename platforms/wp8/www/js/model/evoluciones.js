var Evoluciones = Backbone.Model.extend({
  dao: EvolucionesDAO,

  url: function() {
    return _.isUndefined(this.attributes.id) ? appConfig.baseURL + 'evoluciones' + appConfig.addURL : appConfig.baseURL + 'evoluciones/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
  }
});

var EvolucionesPacienteList = Backbone.Collection.extend({
  model: Evoluciones,
  dao: EvolucionesDAO,

  initialize: function(options) {
    options || (options = {});    
    this.pacienteId = options.pacienteId;
  },

  url: function() {
    return appConfig.baseURL + 'evoluciones/' + encodeURIComponent(this.pacienteId) + appConfig.addURL;
  }
});