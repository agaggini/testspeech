// Add REST service URL
var appConfig = {
  baseURL: 'http://localhost:3000/',
  //baseURL: 'http://medicus.herokuapp.com/',

  addURL: '.js',
  fecha: new Date(),
  medicoId: 0,
  medicoNombre: '',

  isOnLine: true
};

// Enable cross site scripting
jQuery.support.cors = true;
jQuery.mobile.allowCrossDomainPages = true;

// Disable ajax cache
jQuery.ajaxSetup({ cache: false });
