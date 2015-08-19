Meteor.publish('invoices', () => Invoices.find());

Meteor.publish('invoice', (docId) => Invoices.find(docId));
