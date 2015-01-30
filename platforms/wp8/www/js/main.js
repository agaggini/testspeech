var Workspace = Backbone.Router.extend({
  routes: {
    "": "home",
    "turnos/:id": "turnos",
    "turnos/new/:fecha/:hora": "turnosNew",
    "turnos/edit/:id": "turnosEdit",
    "turnos/save/:fecha/:hora/:id": "turnosSave",

    "pacientes/list": "pacientesList",
    "paciente/details/:id": "pacienteDetails",
    "paciente/agregar": "pacienteAgregar",
    "paciente/ficha": "pacienteFicha",
    
    "settings": "settings",
    "sincronizar": "sincronizar",    
    "about": "about"
  },

  home: function() {
    this.changePage(new HomePageView());
  },

  turnos: function(id) {
    if(appConfig.medicoId != id) {
      medico = window.workspace.medicos.get(1);
      appConfig.medicoId = medico.get('id');
      appConfig.medicoNombre = medico.get('nombre');
    }

    if(!(appConfig.fecha instanceof Date)) 
      appConfig.fecha = new Date();

    //Levanto los turnos de la fecha seleccionada
    this.collection = new TurnosFechaList({year: appConfig.fecha.getFullYear(), month: appConfig.fecha.getMonth()+1, day: appConfig.fecha.getDate(), medicoId: id});
    this.collection.fetch();
          
    this.changePage(new TurnosPageView({collection: this.collection}));
  },

  turnosNew: function(fecha, hora) {
    this.collection = new PacientesList();
    this.collection.fetch();

    this.changePage(new TurnosNewPageView({collection: this.collection, fecha: fecha, hora: hora}));
  },

  turnosEdit: function(id) {

  },

  turnosSave: function(fecha, hora, id) {
    turno = new Turnos();

    turno.set({
      id: undefined,
      fecha: fecha,
      hora: hora,
      paciente_id: id,
      nombre: '',
      presente: false,
      visto: false,
      created: new Date().toString(),
      medico_id: appConfig.medicoId
    });
    turno.save();

    window.history.go(-2);
    return false;
  },

  pacientesList: function() {
    this.pacientesCollection = new PacientesList();
    this.pacientesCollection.fetch();
    this.changePage(new PacientesListPageView({collection: this.pacientesCollection}));
  },

  pacienteDetails: function(id) {
    this.changePage(new PacienteDetailsPageView({model: this.pacientesCollection.get(id), nuevo: false}));
  },

  pacienteAgregar: function() {    

    this.changePage(new PacienteDetailsPageView({model: this.pacientesCollection.create(), nuevo: true}));    
  },

  settings: function() {
    this.changePage(new SettingsPageView());
  },

  sincronizar: function() {
    this.pacientesCollection.storage.sync.incremental();
  },

  about: function() {
    this.showDialog(new AboutDialogView());
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

Backbone.sync = function (method, model, options) {

  var dao = new model.dao(window.workspace.db);

  switch (method) {
    case "read":
      if (model.id)
        dao.find(model, function (data) {
          options.success(data);
        });
      else
        dao.findAll(function (data) {
          options.success(data);
        });
      break;
    case "create":
      dao.create(model, function (data) {
        options.success(data);
      });
      break;
    case "update":
      dao.update(model, function (data) {
        options.success(data);
      });
      break;
    case "delete":
      dao.destroy(model, function (data) {
        options.success(data);
      });
      break;
  }
};

window.startApp = function() {
  var self = this;

  window.workspace = new Workspace();
  Backbone.history.start();

  //Testeo Conexion
  /*  
  var networkState = navigator.NetworkConnection.type;
  if(networkState == Connection.NONE && networkState == Connection.UNKNOWN) {    
    appConfig.isOnLine = false;
  }
  console.log('Connection '+Connection.NONE);
  */

  //Base de Datos
  window.workspace.db = window.openDatabase("consultorio", "2.0", "ConsultorioDB", 200000); 
  medicos = new MedicosDAO(window.workspace.db);
  medicos.populate();
  tiposdoc = new TiposdocumentoDAO(window.workspace.db);
  tiposdoc.populate();
  obrassoc = new ObrassocialesDAO(window.workspace.db);
  obrassoc.populate();
  pacientes = new PacientesDAO(window.workspace.db);      
  pacientes.populate();
  evoluciones = new EvolucionesDAO(window.workspace.db);      
  evoluciones.populate();

  //Levanto los Medicos
  window.workspace.medicos = new MedicosList(window.workspace.db);
  window.workspace.medicos.fetch();

  if (navigator.userAgent.match(/(iPad.*|iPhone.*|iPod.*);.*CPU.*OS 7_\d/i)) {
    $("body").addClass("ios7");
    $("body").append('');
  }    
};
