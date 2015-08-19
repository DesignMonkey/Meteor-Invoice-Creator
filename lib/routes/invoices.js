Router.route("/", {
  name: "frontpage",
  controller: RoutesController,
  waitOn: function () {
    return Meteor.subscribe("invoices");
  },
  data: function () {
    return Invoices.find();
  }
});


Router.route("/invoice/:_id", {
  name: "invoice",
  controller: RoutesController,
  waitOn: function () {
    return Meteor.subscribe("invoice", this.params._id);
  },
  data: function () {
    return Invoices.findOne(this.params._id);
  }
});
