Meteor.publish('invoices', function() {
  if(this.userId) {
    return Invoices.find({ userId: this.userId });
  }
});



Meteor.publish('orderlines', function(invoiceId) {
  if(this.userId) {
    return Orderlines.find({ invoiceId: invoiceId, userId: this.userId });
  }
});

Meteor.publish('invoice', function(docId) {
  if(this.userId) {
    return Invoices.find({ _id: docId, userId: this.userId });
  }
});
