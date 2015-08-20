Template['frontpage'].helpers({

  invoices: function() {
    return Invoices.find();
  }
});

Template['frontpage'].events({
  // "submit #loginForm": function(e) {
  //   e.preventDefault();
  //   var username = $("#username").val();
  //   var password = $("#password").val();
  //   Meteor.loginWithPassword(username, password, function (error) {
  //     if(error) {
  //       alert(error);
  //     }
  //   });
  // },
  "click #addInvoice": function(e) {
    e.preventDefault();
    var invoiceTitle = $("#invoiceTitle").val();
    Meteor.call("addInvoice", invoiceTitle);
  }
});

Template['frontpage'].onCreated(function() {
  var self = this;
  this.subscribe("invoices")
});


