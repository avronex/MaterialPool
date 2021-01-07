/* 
Dependencies
*/

const express = require('express')
const admin = require('firebase-admin');

/* 
Config - Express
*/

const app = express()

/* 
Config - Firebase
*/

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/* 
Endpoint
*/

  app.get('/objects', (request, response) => {
    let objects = []
    db.collection('objects').get().then(snapshot => {
      snapshot.forEach((doc) => {
        objects.push(doc.data())
    });
    response.send(objects)
  });
  })

/* 
Listen
*/

app.listen(process.env.PORT || 3000)