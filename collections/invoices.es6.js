Invoices = new Mongo.Collection('Invoices');
Orderlines = new Mongo.Collection('Orderlines');

CalcSchema = new SimpleSchema({
  label: {
    type: String,
    defaultValue: 'Timer'
  },
  min: {
    type: Number,
    defaultValue: 0
  },
  max: {
    type: Number,
    defaultValue: 0
  },
  active: {
    type: Boolean,
    defaultValue: false,
    label: '\n'
  }
});

OrderlineSchema = new SimpleSchema({
  userId: {
    type: String
  },
  invoiceId: {
    type: String
  },
  orderNum: {
    type: Number,
    optional: true
  },
  label: {
    type: String
  },
  head: {
    type: String,
    label: '',
    defaultValue: 'Ny linie'
  },
  description: {
    type: String,
    label: '',
    defaultValue: 'Beskrivelse...',
    autoform: {
      rows: 2
    },
    optional: true
  },
  calc1: {
    type: CalcSchema
  },
  calc2: {
    type: CalcSchema
  },
  calc3: {
    type: CalcSchema
  }
})

InvoiceSchema = new SimpleSchema({
  userId: {
    type: String
  },
  name: {
    type: String,
    label: 'Overskrift',
    defaultValue: 'Nyt tilbud'
  },
  rate: {
    type: Number,
    label: 'Timepris',
    defaultValue: 1000
  },
  managementPercent: {
    type: Number,
    label: 'Projektstyrings %',
    defaultValue: 5
  }
});

Invoices.attachSchema(InvoiceSchema);
Orderlines.attachSchema(OrderlineSchema);


// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Invoices.allow({
    insert : () => true,
    update : () => true,
    remove : () => true
  });

  Orderlines.allow({
    insert : () => true,
    update : () => true,
    remove : () => true
  });

}

// Collections behaviours
Invoices.timestampable();
Invoices.softRemovable();
Invoices.trackable('Invoices');
// Orderlines.timestampable();
// Orderlines.softRemovable();
// Orderlines.trackable('Orderlines');

