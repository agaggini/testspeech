var AboutDialogView = Backbone.View.extend({
  initialize: function () {
    this.template = $.tpl['about-dialog'];
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  },
});
