var PacientesListItemView = Backbone.View.extend({
  tagName: "li",

  className: '',

  initialize: function() {
    this.template = $.tpl['paciente-list-item'];
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

var PacientesListView = Backbone.View.extend({
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
    $(this.el).append(new PacientesListItemView({model: paciente}).render().el);
  }
})


var PacientesListPageView = Backbone.View.extend({
  className: 'ui-listview ui-listview-inset ui-corner-all ui-shadow',

  initialize: function () {
    this.template = $.tpl['pacientes-list-page'];
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    this.pacientesListView = new PacientesListView({el: $('ul', this.el), collection: this.collection});

    return this;
  }    
});
