Meteor.methods({
  addOrderline: function (linetype, headline, invoiceId) {
    var orderNum = 1;
    if(Orderlines.find({ invoiceId: invoiceId }).count() > 0) {
      orderNum = Orderlines.findOne({ invoiceId: invoiceId }, { sort: { orderNum: -1 }}).orderNum + 1;
    }

    if(linetype == "headline") {
      Orderlines.insert({
        userId: this.userId,
        invoiceId: invoiceId,
        orderNum: orderNum, // Lav count her
        linetype: linetype,
        head: ((headline == '') ? 'Ny overskrift' : headline)
      });
    }
    else {

      Orderlines.insert({
        userId: this.userId,
        invoiceId: invoiceId,
        orderNum: orderNum, // Lav count her
        linetype: linetype,
        head: ((headline == '') ? 'Ny linie' : headline),
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
    }
  },
  addInvoice: function(invoiceTitle) {
    Invoices.insert({
      userId: this.userId,
      name: invoiceTitle
    });
  },
  removeOrderline: function(invoiceId, lineId) {
    Orderlines.remove({
      userId: this.userId,
      invoiceId: invoiceId,
      _id: lineId
    });
  }
});

