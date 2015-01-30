var TurnosPacientesListItemView = Backbone.View.extend({
  tagName: "li",

  className: 'ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c',

  initialize: function() {
    this.template = $.tpl['turnos-new-li'];
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.destroy, this);

  },

  render: function() {

    $(this.el).html(this.template(this));
    return this;
  },

  destroy: function() {
    this.remove();
  }
});


var TurnosPacientesListView = Backbone.View.extend({
  initialize: function () {

    this.collection.bind("reset", this.render, this);
    this.collection.bind("add", this.append, this);
  },

  render: function () {
    $(this.el).empty();

    _.each(collection.models, this.append, this);
    $(this.el).listview('refresh');
    return this;
  },

  append: function(paciente) {

    $(this.el).append(new TurnosPacientesListItemView({model: paciente, fecha: this.options.fecha, hora: this.options.hora}).render().el);
  }
})

var TurnosNewPageView = Backbone.View.extend({

  initialize: function () {

    this.template = $.tpl['turnos-new-page'];
 	},

  render: function (e) {
    $(this.el).html(this.template());
    
    this.pacientesListView = new TurnosPacientesListView({el: $('ul', this.el), collection: this.collection, fecha: this.options.fecha, hora: this.options.hora});

    this.$('#list-pacientes').trigger('create');    

    return this;
  },

  append: function(paciente) {
  	console.log(paciente);
    this.$('#list-pacientes').append(new TurnosNewSelectPacienteLiView({model: paciente}).render().el);
  }       
});
