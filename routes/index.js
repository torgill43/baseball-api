const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("Sydney Kate Orgill");
});

module.exports = routes;
