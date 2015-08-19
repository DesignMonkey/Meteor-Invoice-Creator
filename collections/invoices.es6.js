Invoices = new Mongo.Collection('Invoices');

CalcSchema = new SimpleSchema({
  label: {
    type: String,
    label: 'Overskrift'
  },
  min: {
    type: Number,
    label: 'Min timer'
  },
  max: {
    type: Number,
    label: 'Max timer'
  }
});

OrderlineSchema = new SimpleSchema({
  label: {
    type: String,
    label: 'Placering',
    allowedValues: ['Opstart', 'Sidetyper', 'Komponenter', 'Diverse', 'Projektstyring']
  },
  active: {
    type: Boolean,
    label: 'Aktiv'
  },
  description: {
    type: String,
    label: 'Beskrivelse'
  },
  calc: {
    type: [CalcSchema],
    label: 'Beregning'
  }
})

InvoiceSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Overskrift'
  },
  rate: {
    type: Number,
    label: 'Timepris'
  },
  managementPercent: {
    type: Number,
    label: 'Projektstyrings %'
  },
  orderlines: {
    type: [OrderlineSchema],
    label: 'Projektstyrings %'
  },
  createdAt: {
    type: Date
  }
});

Invoices.attachSchema(InvoiceSchema);


// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Invoices.allow({
    insert : () => true,
    update : () => true,
    remove : () => true
  });

  // Fixtures
  var firstObj = {
    name: 'Test invoice 2',
    rate: 950,
    managementPercent: 5,
    orderlines: [
      {
        label: 'Opstart',
        active: true,
        description: 'Møder',
        calc: [{
          label: 'Timer',
          min: 6,
          max: 8
        }]
      }

    ]
  };

  //Invoices.remove({});
  if(Invoices.find().count() == 1) {
    var id = Invoices.findOne()._id;
    Invoices.update({ _id: id}, { $set: firstObj });
  }
  else {
    Invoices.insert(firstObj);
  }

}

// Collections behaviours
Invoices.timestampable();
Invoices.softRemovable();
Invoices.trackable('Invoices');

