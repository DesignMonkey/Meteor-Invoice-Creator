Meteor.methods({
  addOrderline: function (label, invoiceId) {
    Orderlines.insert({
      userId: this.userId,
      invoiceId: invoiceId,
      label: label,
      active: true,
      description: 'Ny ordrelinie',
      calc1: {
        active: true,
        label: 'Design',
        min: 1,
        max: 2
      },
      calc2: {
        active: true,
        label: 'Programmering',
        min: 1,
        max: 2
      }
    });
  },
  addInvoice: function(invoiceTitle) {
    Invoices.insert({
      userId: this.userId,
      name: invoiceTitle
    });
  }
});

