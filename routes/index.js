const router = require("express").Router();

// Route for Swagger UI
router.use("/", require("./swagger"));

// Contacts Route
router.use("/baseball", require("./baseballRoute"));

router.get("/", (req, res) => {
  res.send("Sydney Kate Orgill");
});

module.exports = router;
