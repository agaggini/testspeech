var TiposDocumento = Backbone.Model.extend({
  dao: TiposdocumentoDAO,

  url: function() {
    return _.isUndefined(this.attributes.id) ? appConfig.baseURL + 'tiposdocumento' + appConfig.addURL : appConfig.baseURL + 'tiposdocumento/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
  }  
});

var TiposDocumentoList = Backbone.Collection.extend({
  model: TiposDocumento,  
  dao: TiposdocumentoDAO,

  initialize: function() {

  },

  url: function() {
    return appConfig.baseURL + 'tiposdocumento' + appConfig.addURL;
  }
});