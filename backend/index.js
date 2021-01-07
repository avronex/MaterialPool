/* 
Dependencies
*/

const express = require('express')
const admin = require('firebase-admin');
let inspect = require('util').inspect;
let Busboy = require('busboy');

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

  var busboy = new Busboy({ headers: request.headers });

  let fields = {}

/*   busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function(data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function() {
      console.log('File [' + fieldname + '] Finished');
    });
  }); */

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    fields[fieldname] = val
  });

  busboy.on('finish', function() {
    db.collection('objects').doc(fields.id).set({
      title: fields.title,
      packed: fields.packed,
      price: fields.price,
    })
    
    response.send('Done parsing form!');
  });

  request.pipe(busboy);
})

/* 
Listen
*/

app.listen(process.env.PORT || 3000)