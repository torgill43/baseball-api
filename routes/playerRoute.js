const router = require("express").Router();
const playerController = require("../controllers/playerController");
const validate = require("../validate/playerValidator.js");

// Route to retrieve all players
router.get("/", playerController.getAllPlayers);

// Route to get single player based on ID
router.get("/:id", playerController.getOnePlayer);

// Route to create a player
router.post(
  "/",
  validate.createPlayerValidationRules(),
  validate.validateCreate,
  playerController.createPlayer
);

// Route to update a player based on ID
router.put(
  "/:id",
  validate.updatePlayerValidationRules(),
  validate.validateUpdate,
  playerController.updatePlayer
);

// Route to delete a player based on ID
router.delete("/:id", playerController.deletePlayer);

module.exports = router;
