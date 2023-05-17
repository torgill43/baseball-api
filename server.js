const express = require("express");
const mongodb = require("./db/mongodb");
const port = process.env.Port || 8080;
const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app
//     .use('/', )

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
  }
});

// Need to add a mongodb npm thingy?
