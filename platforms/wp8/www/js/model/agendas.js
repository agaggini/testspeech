var Agendas = Backbone.Model.extend({
  url: function() {
    return _.isUndefined(this.attributes.id) ? appConfig.baseURL + 'agendas' + appConfig.addURL : appConfig.baseURL + 'agendas/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
  }
});

var AgendasList = Backbone.Collection.extend({
  model: Agendas,

  initialize: function(options) {
    options || (options = {});    
    this.medicoId = options.medicoId;

    this.storage = new Offline.Storage('agendas', this);
  },

  url: function() {
    return appConfig.baseURL + 'agendas/' + encodeURIComponent(this.medicoId) + appConfig.addURL;
  }
});