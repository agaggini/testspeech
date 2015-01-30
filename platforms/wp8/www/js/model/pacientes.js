var Pacientes = Backbone.Model.extend({
  dao: PacientesDAO,

  url: function() {
    return _.isUndefined(this.attributes.id) ? appConfig.baseURL + 'pacientes' + appConfig.addURL : appConfig.baseURL + 'pacientes/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
  }
});

var PacientesList = Backbone.Collection.extend({
  model: Pacientes,  
  dao: PacientesDAO,

  initialize: function() {
  },

  url: function() {
    return appConfig.baseURL + 'pacientes' + appConfig.addURL;
  },

  filtrarNombre: function(cadena) {
    if(cadena == '') return this;

    cadena = cadena.toUpperCase();

    filtered = this.filter(function(paciente) {
      return (paciente.get("nombre").toUpperCase().indexOf(cadena) !== -1);
      });
    return new PacientesList(filtered);    
  }
});