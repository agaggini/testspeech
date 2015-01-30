var TurnosListItemView = Backbone.View.extend({
  events: {
    'click #turnoMenu' : 'turnoMenu',
  },

  tagName: "li",
  className: 'ui-li-has-alt',

  initialize: function() {
    this.template = $.tpl['turno-list-item'];
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.destroy, this);
  },

  render: function() {
    $(this.el).html(this.template(this));
    return this;
  },

  destroy: function() {
    this.remove();
  },

  turnoMenu: function(e) {
    e.preventDefault();
    id = $(e.currentTarget).attr('data');

    $('#popupMenuTurno ul li').each(function(indice, elemento) {
      $(elemento).children().attr('data', id);
    });    
    $('#popupMenuTurno').popup('open');
    return false;
  }
});

var TurnosListView = Backbone.View.extend({

  initialize: function () {

    this.collection.bind("reset", this.render, this);
    this.collection.bind("add", this.append, this);
  },

  render: function () {
    $(this.el).empty();

    var iniDate  = 28800;
    var curDate  = 28800;
    var finDate  = 79200;
    var interval = 1200;
    var index = 0;
    
    while (curDate <= finDate) {
      var sec_num = parseInt(curDate, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time = hours+':'+minutes;      

      if (index >= this.collection.length)
      {
        this.append(new Turnos({id: curDate, 
                                idDataBase: 0, 
                                fecha: '', 
                                hora: time, 
                                paciente_id: 0, 
                                nombre: '', 
                                presente: false, 
                                visto: false}));
      }
      else
      {
        if (this.collection.at(index).get('hora') == curDate)
        {
          this.append(new Turnos({id: curDate, 
                                  idDataBase: this.collection.at(index).get('id'), 
                                  fecha: this.collection.at(index).get('fecha'), 
                                  hora: time, 
                                  paciente_id: this.collection.at(index).get('paciente_id'), 
                                  nombre: this.collection.at(index).get('nombre'), 
                                  presente: this.collection.at(index).get('presente'), 
                                  visto: this.collection.at(index).get('visto')}));
          index++;
        }
        else
        {
          this.append(new Turnos({id: curDate, 
                                  idDataBase: 0, 
                                  fecha: '', 
                                  hora: time, 
                                  paciente_id: 0, 
                                  nombre: '', 
                                  presente: false, 
                                  visto: false}));          
        }
      }
      curDate = curDate + interval;
    }    

    $(this.el).listview('refresh');
    return this;
  },

  append: function(turno) {
    $(this.el).append(new TurnosListItemView({model: turno}).render().el);
  },
})

var TurnosPageView = Backbone.View.extend({
  events: {
    'datebox'               : 'clicked',
    'click #confirmarTurno' : 'confirmarTurno',
    'click #vistoTurno'     : 'vistoTurno',
    'click #eliminarTurno'  : 'eliminarTurno',
    'click #medicosMenu'    : 'popupMedicos'
  },

  initialize: function () {
    if(appConfig.medicoId == 0) {
      medico = window.workspace.medicos.get(1);
      appConfig.medicoId = medico.get('id');
      appConfig.medicoNombre = medico.get('nombre');
    }

    this.template = $.tpl['turnos-page'];
  },

  render: function (eventName) {
    $(this.el).html(this.template());

    this.$('#calendar').html('<span name="mydate" id="mydate" type="date" data-role="datebox" data-options=\'{"mode":"calbox", "useSetButton":false, "useInline": true, "useImmediate":true, "overrideDateFormat": "%d-%m-%Y", "overrideDaysOfWeekShort": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"], "overrideMonthsOfYear": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] }\'></span>');
    return this;
  },

  clicked: function(e, eventDetail) {
    // Of the three event triggers, "method" varies, so I checked for "set"
    if (eventDetail.method == "set") {
      this.recuperar(eventDetail.date)
      return false;
    }
  },

  confirmarTurno: function(e) {
    e.preventDefault();
    id = $(e.currentTarget).attr('data');
    
    this.model = new Turnos({id: id});
    this.model.fetch({
      success: function(model){
        model.set({
          presente: true          
        });
        model.save();
      }
    });

    $('#popupMenuTurno').popup('close');
    return false;
  },

  vistoTurno: function(e) {
    e.preventDefault();    
    id = $(e.currentTarget).attr('data');
    
    this.model = new Turnos({id: id});
    this.model.fetch({
      success: function(model){
        model.set({
          visto: true          
        });
        model.save();
      }
    });    

    $('#popupMenuTurno').popup('close');
    return false;
  },

  eliminarTurno: function(e) {
    e.preventDefault();
    id = $(e.currentTarget).attr('data');
    
    this.model = new Turnos({id: id});
    this.model.fetch({
      success: function(model){
        model.destroy();
      }
    });    

    this.recuperar(appConfig.fecha);
    $('#popupMenuTurno').popup('close');
    return false;
  },

  recuperar: function(fecha) {
    var jsDateObj = fecha;
    this.$('#fechaTitulo').text(jsDateObj.getDate()+"-"+(jsDateObj.getMonth()+1)+"-"+jsDateObj.getFullYear());      

    //Guardo la fecha      
    appConfig.fecha = fecha;

    //Levanto los turnos de la fecha seleccionada
    this.collection = new TurnosFechaList({year: jsDateObj.getFullYear(),
                                      month: jsDateObj.getMonth() + 1,
                                      day: jsDateObj.getDate(),
                                      medicoId: appConfig.medicoId});
    this.collection.fetch({
      success: this.mostrarDatos()
    });
    return false;
  },

  popupMedicos: function(e) {
    e.preventDefault();
    this.medicos = new MedicosList();
    this.medicos.fetch({
      success: function(collection) {
        for(var i = 0; i < collection.length; i++) {
          this.$('#listaMedicos').append('<li><a href="#turnos/'+collection.models[i].get('id')+'">'+collection.models[i].get('nombre')+'</a></li>');
        };
        $('#listaMedicos').listview('refresh');
        $("#popupMenuMedicos").popup('open');
      }
    });
    return false;
  },

  mostrarDatos: function() {
    this.$('#list-turnos').empty();
    console.log(this.collection);
    this.turnosListView = new TurnosListView({el: $('ul#list-turnos', this.el), collection: this.collection});
    return false;    
  }
});


