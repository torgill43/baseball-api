const mongodb = require("../db/mongodb");
const ObjectId = require("mongodb").ObjectId;
const createError = require("http-errors");

const getAllPlayers = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOnePlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    const playerId = req.params.id;
    // Validate playerId
    if (!ObjectId.isValid(playerId)) {
      throw createError(400, "Invalid player ID.");
    }
    // ^ thanks chatGPT ^

    const userId = new ObjectId(playerId);
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .find({ _id: userId });

    const hasPlayer = await result.hasNext(); // Check if cursor has any documents
    // ^ thanks chatGPT ^

    if (!hasPlayer) {
      throw createError(404, "Player does not exist.");
    }

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
      // console.log(lists)
    });
  } catch (err) {
    // res.status(500).json({ message: err.message });
    next(err);
  }
};

const createPlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    console.log(`req.body: ${req.body}`);
    const player = {
      name: req.body.name,
      age: req.body.age,
      hometown: req.body.hometown,
      team: req.body.team,
      handedness: req.body.handedness,
      hrs: req.body.hrs,
      average: req.body.average,
    };
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .insertOne(player);
    res.setHeader("Content-Type", "application/json");
    console.log(result);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    const playerId = req.params.id;
    // Validate playerId
    if (!ObjectId.isValid(playerId)) {
      throw createError(400, "Invalid player ID.");
    }
    // ^ thanks chatGPT ^

    const userId = new ObjectId(playerId);
    const player = {
      name: req.body.name,
      age: req.body.age,
      hometown: req.body.hometown,
      team: req.body.team,
      handedness: req.body.handedness,
      hrs: req.body.hrs,
      average: req.body.average,
    };
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .updateOne({ _id: userId }, { $set: player });
    console.log(result);
    if (result.modifiedCount > 0) {
      res.status(204).send({ message: "Update successful." });
    } else {
      throw createError(400, "Player does not exist or no change was made");
    }
  } catch (err) {
    next(err);
  }
};

const deletePlayer = async (req, res, next) => {
  // #swagger.tags= ['Players']
  try {
    const playerId = req.params.id;
    // Validate playerId
    if (!ObjectId.isValid(playerId)) {
      throw createError(400, "Invalid player ID.");
    }
    // ^ thanks chatGPT ^

    const userId = new ObjectId(playerId);
    const result = await mongodb
      .getDb()
      .db("MLB")
      .collection("player-stats")
      .deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      throw createError(404, "Player does not exist");
    }
    // ^ thanks chatGPT ^

    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ message: "delete successful for _id:" + userId });
  } catch (err) {
    // res.status(500).json({ message: err.message });
    next(err);
  }
};

module.exports = {
  getAllPlayers,
  getOnePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
