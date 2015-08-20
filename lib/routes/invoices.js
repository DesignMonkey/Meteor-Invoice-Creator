Router.route("/", {
  name: "frontpage",
  controller: RoutesController,
  data: function () {
    return Invoices.find();
  }
});


Router.route("/invoice/:_id", {
  name: "invoice",
  controller: RoutesController,
  waitOn: function () {
    return [Meteor.subscribe("invoice", this.params._id), Meteor.subscribe("orderlines", this.params._id)];
  },
  data: function () {
    return Invoices.findOne(this.params._id);
  },
  onBeforeAction: function() {
    if (! Meteor.userId()) {
      this.render('frontpage');
    } else {
      this.next();
    }
  }
});
