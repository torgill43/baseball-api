const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/mongodb");
const port = process.env.Port || 8080;
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app
  .use(bodyParser.json())
  // .use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  // })
  .use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on port ${port}`);
  }
});
