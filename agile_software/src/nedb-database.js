const Datastore = require('nedb');
const db = new Datastore({ filename: 'VK.db', autoload: true });

// Insert a new document

db.insert(newDoc, (err, doc) => {
  if (err) {
    console.error('Error inserting document:', err);
  } else {
    console.log('Document inserted:', doc);
  }
});

// Find documents that match a query
db.find({ text: /sample/ }, (err, docs) => {
  if (err) {
    console.error('Error finding documents:', err);
  } else {
    console.log('Found documents:', docs);
  }
});

// Update a document
db.update({ _id: docToUpdate._id }, docToUpdate, {}, (err, numReplaced) => {
  if (err) {
    console.error('Error updating document:', err);
  } else {
    console.log('Number of documents replaced:', numReplaced);
  }
});

// Remove a document
db.remove(docToRemove, {}, (err, numRemoved) => {
  if (err) {
    console.error('Error removing document:', err);
  } else {
    console.log('Number of documents removed:', numRemoved);
  }
});

