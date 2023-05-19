const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<your-project-id>.firebaseio.com'
});

// Use the Firebase Admin SDK here