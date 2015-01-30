var PacienteDetailsView = Backbone.View.extend({

  initialize: function() {
    this.template = $.tpl['paciente-details'];
  },

  render: function() {
    $(this.el).html(this.template({model: this.model})).trigger('create');
    return this;
  }
});

var PacienteDetailsPageView = Backbone.View.extend({
  events: {
    'click #eliminar'           : 'delete',
    'click #guardar'            : 'save',
    'click #cancelar'           : 'cancelar',
    'click #volver'             : 'cancelar',    
  },

  initialize: function () {
    this.template = $.tpl['paciente-details-page'];
  },

  render: function (eventName) {
    $(this.el).html(this.template(this.model));
    this.pacienteDetailsView = new PacienteDetailsView({ el: $('.paciente-details', this.el), model: this.model });
    this.pacienteDetailsView.render();

    this.tipos = new TiposDocumentoList();
    this.tipos.fetch({
      id: this.model.get('documentotipo_id'),
      success: function(collection, response, options) {
        for(var i = 0; i < collection.length; i++) {
          this.$('#documentotipo').append('<option value="'+collection.models[i].get('id')+'" '+(collection.models[i].get('id') == options.id ? 'selected="selected"' : '')+'>'+collection.models[i].get('nombre')+'</option>');
        };
        this.$('#documentotipo').selectmenu('refresh', true);
      }
    });

    this.os = new ObrasSocialesList();
    this.os.fetch({
      id: this.model.get('obrasocial_id'),
      success: function(collection, response, options) {
        for(var i = 0; i < collection.length; i++) {
          this.$('#obrasocial').append('<option value="'+collection.models[i].get('id')+'" '+(collection.models[i].get('id') == options.id ? 'selected="selected"' : '')+'>'+collection.models[i].get('nombre')+'</option>');
        };
        this.$('#obrasocial').selectmenu('refresh', true);
      }
    });

    if(!this.options.nuevo) {
      this.evoluciones = new EvolucionesPacienteList({pacienteId: this.model.get('id')});
      this.evoluciones.fetch({
        success: function(collection) {
          for(var i = 0; i < collection.length; i++) {
            this.$('ul#evoluciones').append('<li class="ui-li-has-alt"><a href="#">'+collection.models[i].get('fecha')+'</a></li>');
          };
        }
      });
    }
    return this;
  },

  cancelar: function (eventName) {
    if(this.options.nuevo) {
      this.model.destroy();
    }
    window.history.back();
    return false;  
  },

  save: function (eventName) {
    this.model.set({
      nombre:$('#nombre').val(),
      domicilio:$('#domicilio').val(),
      telefonos:$('#telefono').val(),
      //medico_id:$('#nombre').val(),
      fecha_nacimiento:$('#fechanacimiento').val(),
      documentotipo_id:$('#documentotipo').val(),
      documentonro:$('#documentonumero').val(), 
      estadocivil:$('#estadocivil').val(),
      mail:$('#mail').val(),
      obrasocial_id:$('#obrasocial').val(),
      nroafiliado:$('#nroafiliado').val()
    });

    this.model.save();    

    window.history.back();
    return false;
  },
});
