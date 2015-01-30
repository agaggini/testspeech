// Enable cross site scripting
jQuery.support.cors = true;

// Disable ajax cache
jQuery.ajaxSetup({ cache: false });

// Add support of MongoDB Extended JSON
//_.extend(Backbone.Model.prototype, Backbone.MongoModel.mixin);

// Add REST service URL
var appConfig = {
  baseURL: 'http://localhost:3000/',
  //baseURL: 'http://blooming-tundra-5113.herokuapp.com/',  

  addURL: '.js',
  fecha: new Date(),
  medicoId: 0,
  medicoNombre: '',

  isOnLine: true
}
