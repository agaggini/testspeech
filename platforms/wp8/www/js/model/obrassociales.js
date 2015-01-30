var ObraSocial = Backbone.Model.extend({
  dao: ObrassocialesDAO,

  url: function() {
    return _.isUndefined(this.attributes.id) ? appConfig.baseURL + 'obrassociales' + appConfig.addURL : appConfig.baseURL + 'obrassociales/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
  }  
});

var ObrasSocialesList = Backbone.Collection.extend({
  model: ObraSocial,  
  dao: ObrassocialesDAO,

  initialize: function() {
  },

  url: function() {
    return appConfig.baseURL + 'obrassociales' + appConfig.addURL;
  }
});