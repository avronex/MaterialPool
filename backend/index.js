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
Endpoint - Get Material DB
*/

  app.get('/objects', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')

    let objects = []
    db.collection('objects').get().then(snapshot => {
      snapshot.forEach((doc) => {
        objects.push(doc.data())
    });
    response.send(objects)
  });
  })

/* 
Endpoint - Add Material
*/

  app.post('/addObject', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    
  })

/* 
Listen
*/

  app.listen(process.env.PORT || 3000)