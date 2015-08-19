Template['frontpage'].helpers({

  invoices: function() {
    return Invoices.find();
  }
});

Template['frontpage'].events({

});

Template['frontpage'].onCreated(function() {
  var self = this;
});


