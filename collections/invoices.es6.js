Invoices = new Mongo.Collection('Invoices');

// Posts.attachSchema(
//   new SimpleSchema({
//     title: {
//       type: String
//     },
//     content: {
//       type: String
//     },
//     createdAt: {
//       type: Date
//     }
//   })
// );

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
        label: 'before',
        active: true,
        desc: 'Møder',
        calc: {
          label: 'Timer',
          min: 6,
          max: 8
        }
      }

    ]
  };

  //Invoices.remove({});
  if(Invoices.find().count() == 1) {
    var id = Invoices.findOne()._id;
    Invoices.update({ _id: id}, firstObj);
  }
  else {
    Invoices.insert(firstObj);
  }

}

// Collections behaviours
Invoices.timestampable();
Invoices.softRemovable();
Invoices.trackable('Invoices');

