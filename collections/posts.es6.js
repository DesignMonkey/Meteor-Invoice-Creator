Posts = new Mongo.Collection('Posts');

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
  Posts.allow({
    insert : () => true,
    update : () => true,
    remove : () => true
  });


  Posts.remove({});
  Posts.insert({
    label: 'before',
    active: true,
    desc: 'Møder',
    calc: {
      label: 'Timer',
      min: 6,
      max: 8
    }
  })

}

// Collections behaviours
Posts.timestampable();
Posts.softRemovable();
Posts.trackable('Posts');

