const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/mongodb");
const createError = require("http-errors");
const port = process.env.Port || 8080;
const app = express();

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    // res.setHeader('Content-Type', 'application/json')
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", require("./routes"));

// 404 handler...
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});

var randomstring = require("randomstring");

randomstring.generate();
