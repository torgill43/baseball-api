const router = require("express").Router();
const baseballController = require("../controllers/baseballController");

// Route to retrieve all players
router.get("/", baseballController.getAllPlayers);

// Route to get single player based on ID
router.get("/:id", baseballController.getOnePlayer);

// Route to create a player
router.post("/", baseballController.createPlayer);

// Route to update a player based on ID
router.put("/:id", baseballController.updatePlayer);

// Route to delete a player based on ID
router.delete("/:id", baseballController.deletePlayer);

module.exports = router;
