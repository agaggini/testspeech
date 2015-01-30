var HomePageView = Backbone.View.extend({
  initialize: function () {
    this.template = $.tpl['home-page'];
  },

  render: function (eventName) {    
    $(this.el).html(this.template());

    return this;
  },
});
