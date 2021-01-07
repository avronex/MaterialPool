/* 
Dependencies
*/

const express = require('express')

/* 
Config - Express
*/

const app = express()

/* 
Endpoint
*/

  app.get('/', (request, response) => {
    response.send('Hallo!')
  })

/* 
Listen
*/

app.listen(3000)